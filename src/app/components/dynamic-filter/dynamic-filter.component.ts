import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilderComponent, Step} from '../form-builder/form-builder.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpClientService} from '../../services/http-client.service';
import {ErrorService} from '../../services/error.service';
import {LanguageService} from '../../services/language.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-dynamic-filter',
  imports: [
    FormBuilderComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './dynamic-filter.component.html',
  standalone: true,
  styleUrl: './dynamic-filter.component.scss'
})
export class DynamicFilterComponent implements OnInit {
  protected form!: FormGroup;
  @Input() steps: Step[] = [];
  @Input() controller!: string;
  @Input() dto!: any;
  @Input() autoSubmit: boolean = true;

  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() successCallBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearFilter: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(FormBuilderComponent) formBuilderComponent!: FormBuilderComponent;

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly errorService: ErrorService,
    private readonly fb: FormBuilder,
    private readonly languageService: LanguageService
  ) {
    this.form = this.fb.group({});
  }

  async ngOnInit(): Promise<void> {
    await this.languageService.loadCustomTranslations(this.languageService.getCurrentLanguage(), 'dynamic-filter');
  }

  makeDto(): void {
    Object.keys(this.dto).forEach(key => {
      const step: Step | undefined = this.steps.find(s => s.params.name === key);
      const formValue: any = this.form.value[key];
      if (step) {
        if (formValue === 'true' || formValue === 'false') {
          this.dto[key] = formValue === 'true';
        } else {
          this.dto[key] = formValue || null;
        }
      }
    });
  }

  async onClearFilter(): Promise<void> {
    this.clearFilter.emit();
    await this.formBuilderComponent.reset();
  }

  private toQueryString(obj: any): string {
    return Object.keys(obj)
      .map(key => {
        const value: any = obj[key] == null ? '' : obj[key];
        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
      })
      .join('&');
  }

  public onSubmit(): void {
    this.errorService.clearErrors();
    if (this.form.invalid) {
      console.error(this.form.value);
      this.formBuilderComponent.processValidationErrors();
      return;
    }
    this.makeDto();
    if(this.autoSubmit) {
      if(this.controller == null || this.controller == "") {
        throw new Error("Controller is required for auto submit");
      }

      this.httpClientService.get({ controller: this.controller, action: 'filter', queryString: this.toQueryString(this.dto) })
        .subscribe({
          next: response => {
            console.log('Success:', response);
            this.successCallBack !== undefined ? this.successCallBack.emit(response) : undefined;
          },
          error: (err: HttpErrorResponse): void => console.error('Error:', err.message)
        });
    } else {
      if(this.formSubmit === undefined) {
        throw new Error("Form submit event is required for manual submit");
      }
      this.formSubmit.emit(this.dto);
    }
  }

}
