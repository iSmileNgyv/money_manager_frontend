import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  Type,
  ComponentRef,
  Renderer2
} from '@angular/core';
import { InputComponent } from '../elements/input/input.component';
import { SelectComponent } from '../elements/select/select.component';
import { NgIf } from '@angular/common';
import {TextareaComponent} from '../elements/textarea/textarea.component';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

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
  domElement?: HTMLElement;
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
  imports: [NgIf, ReactiveFormsModule]
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
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) dynamicContainer!: ViewContainerRef;
  @ViewChild('modalElement') modalElement!: ElementRef;
  form: FormGroup;
  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
  }

  public async ngAfterViewInit(): Promise<void> {
    this.createForm();
    await this.renderSteps();
  }

  private createForm(): void {
    this.steps.forEach(step => {
      this.form.addControl(step.params.name, this.fb.control(step.params.value || ''));
    });
  }

  private async renderSteps(): Promise<void> {
    this.steps.sort((a: Step, b: Step): number => a.step - b.step);

    for (const step of this.steps) {
      if (step.wait && step.waitParams?.dependsOn) {
        const dependentStep: Step|undefined = this.steps.find(s => s.params.name === step.waitParams?.dependsOn);
        if (dependentStep && dependentStep.params.value) {
          (step as Step).wait = false;
          if (step.waitParams.run) {
            step.waitParams.run(dependentStep.params.value);
          }
        }
      }

      if (!step.domElement) {
        await this.renderComponent(step);
      }
      this.renderer.setStyle(
        step.domElement,
        'display',
        step.wait ? 'none' : 'block'
      );
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
        console.warn(`Unsupported component type: ${elementType}`);
        return;
    }

    const colSize: number = step.col_size || this.defaults.col_size;

    const colElement: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(colElement, `col-md-${colSize}`);

    const componentRef: ComponentRef<any> = this.dynamicContainer.createComponent(componentToRender);
    Object.assign(componentRef.instance, step.params);
    this.renderer.setAttribute(componentRef.location.nativeElement, 'formControlName', step.params.name);
    if (componentRef.instance.valueChange && componentRef.instance.valueChange.subscribe) {
      componentRef.instance.valueChange.subscribe((value: string): void => {
        step.params.value = value;
        this.form.get(step.params.name)?.setValue(value);
        this.handleComponentValueChange(step, value);
      });
    }

    this.renderer.appendChild(colElement, componentRef.location.nativeElement);
    this.renderer.appendChild(this.dynamicContainer.element.nativeElement, colElement);

    step.domElement = colElement;
  }

  public onSubmit(): void {
    console.log(this.form.value);
  }

  private hideDependentSteps(step: Step): void {
    const dependentSteps: Step[] = this.steps.filter(s => s.waitParams?.dependsOn === step.params.name);
    dependentSteps.forEach(dependentStep => {
      dependentStep.params.value = "";
      dependentStep.wait = true;
      this.form.get(dependentStep.params.name)?.setValue('');
      if (dependentStep.domElement) {
        this.renderer.setStyle(dependentStep.domElement, 'display', 'none');
      }
      this.hideDependentSteps(dependentStep);
    });
  }

  private async handleComponentValueChange(step: Step, value: string): Promise<void> {
    if (!step.params.value || step.params.value === "") {
      this.hideDependentSteps(step);
    } else {
      const dependentSteps: Step[] = this.steps.filter(s => s.waitParams?.dependsOn === step.params.name);
      for (const dependentStep of dependentSteps) {
        dependentStep.wait = false;
        if (dependentStep.waitParams?.run) {
          dependentStep.waitParams.run(value);
        }
        if (!dependentStep.domElement) {
          await this.renderComponent(dependentStep);
        }
        this.renderer.setStyle(dependentStep.domElement, 'display', 'block');
        if (!dependentStep.params.value || dependentStep.params.value === "") {
          this.hideDependentSteps(dependentStep);
        }
        await this.handleComponentValueChange(dependentStep, dependentStep.params.value || "");
      }
    }
  }
}
