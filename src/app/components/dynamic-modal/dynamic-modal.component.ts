import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  Type,
  ComponentRef,
  Renderer2, ViewRef
} from '@angular/core';
import { InputComponent } from '../elements/input/input.component';
import { SelectComponent } from '../elements/select/select.component';
import { NgIf } from '@angular/common';
import {TextareaComponent} from '../elements/textarea/textarea.component';

type CommonParams = {
  required?: boolean;
  disabled?: boolean;
  name: string;
  id?: string;
  iconPosition?: string;
  class?: string;
};

type LabelOrIconParams = {
  label?: string;
  icon?: string;
};

type BaseParams = CommonParams & AtLeastOne<LabelOrIconParams, 'label' | 'icon'>;

type InputParams = BaseParams & {
  placeholder?: string;
  type?: string;
  value?: string;
  readonly?: boolean;
};

type SelectParams = BaseParams & {
  options: { value: string; text: string }[];
  value?: string;
};

type TextareaParams = BaseParams & {
  value?: string;
  placeholder?: string;
  readonly?: boolean;
}
type StepBase<TParams> = {
  step: number;
  params: TParams;
  col_size?: number;
} & (
  | { wait: true; waitParams: { dependsOn: string; [key: string]: any, options?: {value: string; text: string}[], value?: string, run?: (value: string) => void  } }
  | { wait: false; waitParams?: never }
  );

export type StepInput = StepBase<InputParams> & {
  element_type: 'input';
};

export type StepSelect = StepBase<SelectParams> & {
  element_type: 'select';
};

export type StepTextarea = StepBase<TextareaParams> & {
  element_type: 'textarea';
};

export type Step = StepInput | StepSelect | StepTextarea;


type AtLeastOne<T, Keys extends keyof T> = Partial<T> &
  { [K in Keys]-?: Required<Pick<T, K>> }[Keys];

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
  imports: [NgIf]
})
export class DynamicModalComponent implements AfterViewInit {
  private defaults: { element_type: string; size: string; col_size: number } = {
    element_type: 'input',
    size: 'lg',
    col_size: 12
  };
  @Input('steps') steps: Step[] = [];
  @Input('modalId') modalId!: string;
  @Input('title') title!: string;
  @Input('size') size: string = this.defaults.size;
  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  dynamicContainer!: ViewContainerRef;
  @ViewChild('modalElement') modalElement!: ElementRef;

  constructor(private renderer: Renderer2) {}

  public async ngAfterViewInit(): Promise<void> {
    await this.renderSteps();
  }

  private async renderSteps(): Promise<void> {
    for (const step of this.steps) {
      if(!step.wait)
        await this.renderComponent(step);
      else {
        const dependsOn: string = step.waitParams?.dependsOn;
        if(dependsOn) {
          const dependency: Step|undefined = this.steps.find(s => s.params.name === dependsOn);
          if(dependency && dependency.params.value) {
            await this.renderComponent(step);
            (step as Step).wait = false;
            if(step.waitParams.run) {
              step.waitParams.run(dependency.params.value);
            }
          }
        }
      }
    }
  }

  public closeModal(): void {
    const modalElement: HTMLElement|null = document.getElementById(this.modalId);
    if (modalElement) {
      (window as any).$(`#${this.modalId}`).modal('hide');
    }
  }

  private async renderComponent(step: Step): Promise<void> {
    const elementType: string = step.element_type || this.defaults.element_type;
    let componentToRender: Type<any>;
    switch (elementType) {
      case 'input':
        componentToRender = InputComponent;
        break;
      case 'select':
        componentToRender = SelectComponent;
        break;
      case 'textarea':
        componentToRender = TextareaComponent;
        break;
      default:
        console.warn(`Component type ${elementType} is not supported.`);
        return;
    }
    const colSize: number = step.col_size || this.defaults.col_size;
    const colElement: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(colElement, `col-md-${colSize}`);
    const componentRef: ComponentRef<any> = this.dynamicContainer.createComponent(componentToRender);
    const baseParams = step.params as BaseParams;
    Object.assign(componentRef.instance, baseParams);
    if (componentRef.instance.valueChange && componentRef.instance.valueChange.subscribe) {
      componentRef.instance.valueChange.subscribe((value: string): void => {
        this.handleComponentValueChange(step, value);
      });
    }
    switch(step.element_type){
      case 'input':
        const inputParams = step.params as InputParams;
        Object.assign(componentRef.instance, inputParams);
        break;
      case 'select':
        const selectParams = step.params as SelectParams;
        Object.assign(componentRef.instance, selectParams);
        break;
      case 'textarea':
        const textareaParams = step.params as TextareaParams;
        Object.assign(componentRef.instance, textareaParams);
        break;
    }
    /*if (step.element_type === 'input') {
      const params = step.params as InputParams;
      Object.assign(componentRef.instance, params);
    } else if (step.element_type === 'select') {
      const params = step.params as SelectParams;
      Object.assign(componentRef.instance, params);
    }*/
    this.renderer.appendChild(colElement, componentRef.location.nativeElement);
    this.renderer.appendChild(this.dynamicContainer.element.nativeElement, colElement);
  }

  private async removeComponent(step: Step): Promise<void> {
    const dependentSteps: Step[] = this.steps.filter(s => s.waitParams?.dependsOn === step.params.name);
    dependentSteps.reverse().forEach(dependentStep => {
      dependentStep.wait = true;
      const componentIndex: number = this.steps.indexOf(dependentStep);

      if (componentIndex >= 0 && this.dynamicContainer.length > componentIndex) {
        const componentRef: ViewRef | null = this.dynamicContainer.get(componentIndex);

        if (componentRef) {
          this.dynamicContainer.remove(componentIndex);
          const colElements: NodeListOf<HTMLElement> = this.dynamicContainer.element.nativeElement.querySelectorAll(`.col-md-${dependentStep.col_size || this.defaults.col_size}`);
          if (colElements && colElements[componentIndex]) {
            const colElement: HTMLElement = colElements[componentIndex];
            this.renderer.removeChild(this.dynamicContainer.element.nativeElement, colElement);
          }
        } else {
          console.warn(`ComponentRef not found for step: ${dependentStep.params.name}`);
        }
      }
    });
  }
  private async handleComponentValueChange(step: Step, value: string): Promise<void> {
    if (value === "") {
      await this.removeComponent(step);
    } else {
      const dependentSteps: Step[] = this.steps.filter(s => s.waitParams?.dependsOn === step.params.name);
      for (const dependentStep of dependentSteps) {
        if (dependentStep?.waitParams?.run) {
          dependentStep.waitParams.run(value);
        }
        if (dependentStep.wait) {
          await this.renderComponent(dependentStep);
          (dependentStep as Step).wait = false;
        }
      }
    }
  }
}
