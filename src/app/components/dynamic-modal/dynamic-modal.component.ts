import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  EventEmitter, OnInit, Output, OnChanges
} from '@angular/core';
import { NgIf } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ErrorService} from '../../services/error.service';
import {HttpClientService} from '../../services/http-client.service';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {FormBuilderComponent, Step} from '../form-builder/form-builder.component';
import {LanguageService} from '../../services/language.service';
import {TranslatePipe} from '@ngx-translate/core';
@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, CdkDrag, CdkDragHandle, FormBuilderComponent, TranslatePipe]
})
export class DynamicModalComponent implements OnInit, OnChanges {
  defaults: { element_type: string; size: 'lg'; col_size: number, autoSubmit: boolean, type: 'POST' } = {
    element_type: 'input',
    size: 'lg',
    col_size: 12,
    autoSubmit: true,
    type: 'POST'
  };
  @Input() config!: DynamicModalConfig;
  @Input() modalId?: string;
  @Input() formData?: any;
  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) dynamicContainer!: ViewContainerRef;
  @ViewChild('modalElement') modalElement!: ElementRef;
  @ViewChild(FormBuilderComponent) formBuilderComponent!: FormBuilderComponent;
  form: FormGroup;
  isCollapsed: boolean = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly errorService: ErrorService,
    private readonly httpClientService: HttpClientService,
    private readonly languageService: LanguageService
  ) {
    this.form = this.fb.group({});
  }
  async ngOnInit(): Promise<void> {
    await this.languageService.loadCustomTranslations(this.languageService.getCurrentLanguage(), 'dynamic-modal');
    this.formReady.emit(this.form);
    this.config.steps.forEach(step => {
      const key: string = step.params.name;
      if (this.form.controls[key]) {
        step.params.value = this.form.controls[key]?.value;
      }
    });
  }

  ngOnChanges(): void {
    this.config = {
      autoSubmit: this.config?.autoSubmit ?? this.defaults.autoSubmit,
      type: this.config?.type ?? this.defaults.type,
      size: this.config?.size ?? this.defaults.size,
      modalId: this.config.modalId ?? this.modalId,
      ...this.config
    };
  }

  public toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  closeModal(): void {
    this.close.emit();
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.errorService.clearErrors();
    if (this.form.invalid) {
      console.error(this.form.value);
      this.formBuilderComponent.processValidationErrors();
      return;
    }
    this.formBuilderComponent.makeDto();
    if(this.config.autoSubmit) {
      if(this.config.controller == null || this.config.controller == "") {
        throw new Error("Controller is required for auto submit");
      }
    const method = this.config.type!.toUpperCase() === "POST"
      ? this.httpClientService.post
      : this.config.type!.toUpperCase() === "PUT"
        ? this.httpClientService.put
        : null;

    if (!method) {
      throw new Error('Unsupported HTTP method:' + this.config.type);
    }
    method.call(this.httpClientService, { headers: new HttpHeaders({'Content-Type': 'application/json'}), controller: this.config.controller }, this.config.dto)
      .subscribe({
        next: response => {
          console.log('Success:', response);
          this.config.successCallBack !== undefined ? this.config.successCallBack.emit(response) : undefined;
        },
        error: (err: HttpErrorResponse): void => console.error('Error:', err.message)
      });
    } else {
      if(this.config.formSubmit === undefined) {
        throw new Error("Form submit event is required for manual submit");
      }
      this.config.formSubmit.emit(this.config.dto);
    }
    this.closeModal();
    this.formBuilderComponent.reset().then();
  }
}
export interface DynamicModalConfig {
  steps: Step[];
  modalId?: string;
  title?: string;
  size?: 'sm' | 'lg' | 'xl' | 'md';
  dto?: any;
  autoSubmit?: boolean;
  controller?: string;
  type?: 'POST' | 'PUT' | 'DELETE';
  formSubmit?: EventEmitter<any>;
  successCallBack?: EventEmitter<any>;
}
