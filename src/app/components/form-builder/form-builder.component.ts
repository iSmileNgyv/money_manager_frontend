import {
  Component,
  Input,
  Output,
  EventEmitter,
  Type,
  ComponentRef,
  Renderer2,
  ViewChild,
  ViewContainerRef, AfterViewInit, OnInit
} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {InputComponent} from '../elements/input/input.component';
import {SelectComponent} from '../elements/select/select.component';
import {TextareaComponent} from '../elements/textarea/textarea.component';
import {CheckboxComponent} from '../elements/checkbox/checkbox.component';
import {ErrorService} from '../../services/error.service';
import {SelectedImageComponent} from '../elements/selected-image/selected-image.component';
import {LanguageService} from '../../services/language.service';
import {TranslatePipe} from '@ngx-translate/core';

type CommonParams = {
  required?: boolean;
  disabled?: boolean;
  name: string;
  id?: string;
  iconPosition?: string;
  class?: string;
  validators?: any[];
  validationMessages?: { [key: string]: string };
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
  multiple?: boolean;
  placeholder?: string;
};

type TextareaParams = BaseParams & {
  value?: string;
  placeholder?: string;
  readonly?: boolean;
}
type CheckboxParams = BaseParams & {
  checked?: boolean;
  value?: string;
  toggle?: boolean;
}

type SelectImageParams = BaseParams & {
  value?: string;
  fullPath?: string;
}

type StepBase<TParams> = {
  step: number;
  params: TParams;
  col_size?: number;
  domElement?: HTMLElement;
} & (
  | { wait: true; waitParams: { dependsOn: string; [key: string]: any, options?: {value: string; text: string}[], value?: string, run?: (value: string, defaultValue?: string) => Promise<void>  } }
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
export type StepCheckbox = StepBase<CheckboxParams> & {
  element_type: 'checkbox';
};

export type StepSelectImage = StepBase<SelectImageParams> & {
  element_type: 'select-image';
}
export type Step = StepInput | StepSelect | StepTextarea | StepCheckbox | StepSelectImage;


type AtLeastOne<T, Keys extends keyof T> = Partial<T> &
  { [K in Keys]-?: Required<Pick<T, K>> }[Keys];

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    TranslatePipe
  ],
  standalone: true,
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements AfterViewInit, OnInit {
  @Input('form') form!: FormGroup;
  @Input() steps: Step[] = [];
  @Input('formData') formData?: any;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) dynamicContainer!: ViewContainerRef;
  @Output() resetForm: EventEmitter<void> = new EventEmitter<void>();

  async reset(): Promise<void> {
    this.form.reset();
    this.steps.forEach(step => {
      if (step.params) {
        step.params.value = '';
      }
    });
    await this.renderSteps();
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly renderer: Renderer2,
    private readonly errorService: ErrorService,
    private readonly languageService: LanguageService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.languageService.loadCustomTranslations(this.languageService.getCurrentLanguage(), 'form-builder');
  }

  async ngAfterViewInit(): Promise<void> {
    this.createForm();
    await this.renderSteps();
  }

  private createForm(): void {
    this.steps.forEach(step => {
      const control: FormControl<string | null> = this.fb.control(
        step.params.value || '',
        step.params.validators || []
      );
      this.form.addControl(step.params.name, control);
    });
  }

  private async renderSteps(): Promise<void> {
    console.log(this.steps);
    this.steps.sort((a: Step, b: Step): number => a.step - b.step);
    if (this.dynamicContainer) {
      this.dynamicContainer.clear();
    }
    for (const step of this.steps) {
      if (this.formData && this.formData[step.params.name] !== undefined) {
        const formValue: any = this.formData[step.params.name];
        if (step.element_type === 'select-image' && typeof formValue === 'object') {
          step.params.value = formValue.path != null ? formValue.path : "";
          step.params.fullPath = formValue.fullPath;
        } else {
          step.params.value = formValue;
        }
        this.form.get(step.params.name)?.setValue(step.params.value);
      }
      if (step.wait && step.waitParams?.dependsOn) {
        const dependentStep: Step | undefined = this.steps.find(s => s.params.name === step.waitParams?.dependsOn);
        if (dependentStep && dependentStep.params.value) {
          (step as Step).wait = false;
          if (step.waitParams.run) {
            await step.waitParams.run(dependentStep.params.value, step.params.value);
          }
        }
      }
      step.domElement = undefined;
      await this.renderComponent(step);
    }
  }

  private async renderComponent(step: Step): Promise<void> {
    const elementType: string = step.element_type || 'input'
    let componentToRender: Type<any>;

    switch (elementType) {
      case 'input':
        componentToRender = InputComponent;
        break;
      case 'select':
        componentToRender = SelectComponent;
        if ('options' in step.params && Array.isArray(step.params.options) && step.params.options.length > 0 && !step.params.value) {
          step.params.value = step.params.options[0].value;
          this.form.get(step.params.name)?.setValue(step.params.value);
        }
        break;
      case 'textarea':
        componentToRender = TextareaComponent;
        break;
      case 'checkbox':
        componentToRender = CheckboxComponent;
        break;
      case 'select-image':
        componentToRender = SelectedImageComponent;
        break;
      default:
        console.warn(`Unsupported component type: ${elementType}`);
        return;
    }

    const colSize: number = step.col_size || 12;

    const colElement: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(colElement, `col-md-${colSize}`);

    const componentRef: ComponentRef<any> = this.dynamicContainer.createComponent(componentToRender);
    if (step.element_type === 'select-image') {
      Object.assign(componentRef.instance, {
        ...step.params,
        fullPath: (step.params as SelectImageParams).fullPath
      });
    } else {
      Object.assign(componentRef.instance, step.params);
    }

    Object.assign(componentRef.instance, step.params);
    if (elementType === 'select-image') {
      componentRef.instance.imageSelected.subscribe((selectedImage: { path: string; fullPath: string }): void => {
        this.onImageSelected(selectedImage, step);
      });
    }
    this.renderer.setAttribute(componentRef.location.nativeElement, 'formControlName', step.params.name);
    if (componentRef.instance.valueChange && componentRef.instance.valueChange.subscribe) {
      componentRef.instance.valueChange.subscribe((value: string): void => {
        step.params.value = value;
        this.form.get(step.params.name)?.setValue(value);
        this.handleComponentValueChange(step, value);
      });
    }

    if (step.wait && step.waitParams?.dependsOn) {
      const dependentStep: Step | undefined = this.steps.find(s => s.params.name === step.waitParams.dependsOn);
      if (dependentStep && !dependentStep.params.value) {
        this.renderer.setStyle(colElement, 'display', 'none');
      }
    }

    this.renderer.appendChild(colElement, componentRef.location.nativeElement);
    this.renderer.appendChild(this.dynamicContainer.element.nativeElement, colElement);

    step.domElement = colElement;
  }

  private onImageSelected(selectedImage: {path: string, fullPath: string}, step: Step): void {
    if (step) {

      this.form.get(step.params.name)?.setValue(selectedImage.path);
      step.params.value = selectedImage.path;
      (step.params as SelectImageParams).fullPath = selectedImage.fullPath;
    }
  }


  private getValidationMessage(step: Step | undefined, errorKey: string): string | null {
    if (step && step.params.validationMessages) {
      return step.params.validationMessages[errorKey] || null;
    }
    switch (errorKey) {
      case 'required':
        return `${step?.params.label || 'Bu alan'} zorunludur.`;
      case 'minlength':
        const minlength: any = (step?.params as any)['minlength'];
        return `${step?.params.label || 'Bu alan'} en az ${minlength} karakter olmalıdır.`;
      case 'maxlength':
        const maxlength: any = (step?.params as any)['maxlength'];
        return `${step?.params.label || 'Bu alan'} en fazla ${maxlength} karakter olabilir.`;
      default:
        return 'Geçersiz değer.';
    }
  }

  processValidationErrors(): void {
    Object.keys(this.form.controls).forEach(controlName => {
      const control: AbstractControl<any, any> | null = this.form.get(controlName);
      if (control?.errors) {
        Object.keys(control.errors).forEach(errorKey => {
          const step: Step | undefined = this.steps.find(s => s.params.name === controlName);
          const errorMessage: string | null = this.getValidationMessage(step, errorKey);
          if (errorMessage) {
            this.errorService.addError(errorMessage);
          }
        });
      }
    });
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

  async handleComponentValueChange(step: Step, value: string): Promise<void> {
    if (!step.params.value || step.params.value === "") {
      this.hideDependentSteps(step);
    } else {
      const dependentSteps: Step[] = this.steps.filter(s => s.waitParams?.dependsOn === step.params.name);
      for (const dependentStep of dependentSteps) {
        dependentStep.wait = false;
        if (dependentStep.waitParams?.run) {
          await dependentStep.waitParams.run(value, step.params.value);
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
