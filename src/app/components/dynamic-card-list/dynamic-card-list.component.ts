import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {NgxSpinnerComponent, NgxSpinnerService} from 'ngx-spinner';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {DynamicModalComponent, DynamicModalConfig} from '../dynamic-modal/dynamic-modal.component';
import {HttpClientService} from '../../services/http-client.service';
import {firstValueFrom} from 'rxjs';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {CardFooterInformationComponent} from '../card-footer-information/card-footer-information.component';
import {DeleteDirective} from '../../directives/delete.directive';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DynamicFilterComponent} from '../dynamic-filter/dynamic-filter.component';
import {Step} from '../form-builder/form-builder.component';
import {environment} from '../../../environments/environment';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-dynamic-card-list',
  imports: [
    NgxSpinnerComponent,
    InfiniteScrollDirective,
    NgForOf,
    CardFooterInformationComponent,
    DeleteDirective,
    NgClass,
    NgIf,
    DynamicFilterComponent
  ],
  templateUrl: './dynamic-card-list.component.html',
  styleUrl: './dynamic-card-list.component.scss'
})
export class DynamicCardListComponent implements OnInit, OnChanges{
  protected data: any = [];
  private page: number = 0;
  private pageSize: number = 50;
  private noMoreData: boolean = false;
  protected isLoading: boolean = false;
  private scrollPosition: number = 0;
  protected isMobile: boolean = false;
  protected isSearchVisible: boolean = false;
  @Input() editDto: any;
  @Input() createDto: any;
  @Input() filterDto: any;
  @Input() createModalConfig!: DynamicModalConfig;
  @Input() editModalConfig!: DynamicModalConfig;
  @Input() filterSteps: Step[] = [];
  @Input() columns!: DynamicCardListColumns;
  @Input() apiSettings!: ApiSettings;
  @Input() ignoreFilter: boolean = false;
  @Input() customButtons: DynamicCardListCustomButtons[] = [];
  @ViewChild('modalContainer', { read: ViewContainerRef, static: true }) modalContainer!: ViewContainerRef;
  private currentModalRef: ComponentRef<DynamicModalComponent> | null = null;
  protected successEmitter: EventEmitter<void> = new EventEmitter<void>();
  protected form!: FormGroup;
  private initialCreateSteps: Step[] = [];
  private initialEditSteps: Step[] = [];
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly spinner: NgxSpinnerService,
    private readonly fb: FormBuilder,
    private readonly stateService: StateService
  ) {
    this.successEmitter.subscribe(async (): Promise<void> => {
      await this.handleSuccess();
    });
    this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createModalConfig = {
      modalId: 'create-modal',
      title: 'Create',
      dto: this.createDto,
      autoSubmit: true,
      apiSettings: this.apiSettings,
      type: 'POST',
      successCallBack: this.successEmitter,
      ...this.createModalConfig
    };

    this.editModalConfig = {
      title: 'Edit',
      dto: this.editDto,
      autoSubmit: true,
      apiSettings: this.apiSettings,
      type: 'PUT',
      successCallBack: this.successEmitter,
      ...this.editModalConfig
    };

    if (changes['createModalConfig'] && changes['createModalConfig'].currentValue && this.initialCreateSteps.length === 0) {
      this.initialCreateSteps = this.sanitizeSteps(changes['createModalConfig'].currentValue.steps); // Derin kopya
    }

    if (changes['editModalConfig'] && changes['editModalConfig'].currentValue && this.initialEditSteps.length === 0) {
      this.initialEditSteps = this.sanitizeSteps(changes['editModalConfig'].currentValue.steps); // Derin kopya
    }
  }

  async ngOnInit(): Promise<void> {
    this.makeStateData();
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile.bind(this));
    await this.getData();
  }

  private makeStateData(): void {
    this.stateService.updateFilterSteps(this.filterSteps);
    this.stateService.updateCreateDto(this.createDto);
    this.stateService.updateEditDto(this.editDto);
    this.stateService.updateFilterDto(this.filterDto);
  }

  private sanitizeSteps(steps: Step[]): Step[] {
    this.stateService.updateSteps(steps);
    return steps.map(step => {
      return {
        ...step,
        params: {
          ...step.params,
          validators: Array.isArray(step.params.validators)
            ? step.params.validators.filter(validator => validator !== null && validator !== undefined)
            : [],
          value: step.params.value || '',
        },
        wait: step.wait ?? false,
        waitParams: step.waitParams
          ? {...step.waitParams, run: step.waitParams.run}
          : undefined,
        col_size: step.col_size || 12,
      } as Step;
    });
  }

  openCreateModal(): void {
    this.closeExistingModal();

    //this.createModalConfig.steps = this.sanitizeSteps(this.initialCreateSteps);
    this.stateService.steps$.subscribe(value => {
      this.createModalConfig.steps = this.sanitizeSteps(value);
    });
    this.currentModalRef = this.modalContainer.createComponent(DynamicModalComponent);
    this.currentModalRef.instance.config = this.createModalConfig;

    const modalElement: any = this.currentModalRef.location.nativeElement.querySelector('.modal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      modalElement.setAttribute('aria-hidden', 'false');
      modalElement.setAttribute('aria-modal', 'true');

      const backdrop: HTMLDivElement = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
      document.body.classList.add('modal-open');
    }
    this.currentModalRef.instance.close.subscribe((): void => this.closeExistingModal());
  }

  openEditModal(index: number, data: any): void {
    this.closeExistingModal();
    this.stateService.updateFormData(data);
    //this.editModalConfig.steps = this.sanitizeSteps(this.initialEditSteps);
    this.stateService.steps$.subscribe(value => {
      this.editModalConfig.steps = this.sanitizeSteps(value);
    });
    this.currentModalRef = this.modalContainer.createComponent(DynamicModalComponent);
    this.currentModalRef.instance.config = {
      ...this.editModalConfig,
      modalId: `edit-modal-${index}`
    };
    this.currentModalRef.instance.formData = data;

    const modalElement: HTMLDivElement = this.currentModalRef.location.nativeElement.querySelector('.modal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      modalElement.setAttribute('aria-hidden', 'false');
      modalElement.setAttribute('aria-modal', 'true');
      const backdrop: HTMLDivElement = document.createElement('div');
      backdrop.className = 'modal-backdrop show';
      document.body.appendChild(backdrop);
      document.body.classList.add('modal-open');
    }
    this.currentModalRef.instance.close.subscribe((): void => this.closeExistingModal());
  }

  closeExistingModal(): void {
    if (this.currentModalRef) {
      const modalElement: any = this.currentModalRef.location.nativeElement.querySelector('.modal');
      if (modalElement) {
        modalElement.classList.remove('show');
        modalElement.style.display = 'none';
        const backdrop: Element | null = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
        document.body.classList.remove('modal-open');
      }
      this.currentModalRef.destroy();
      this.currentModalRef = null;
    }
  }

  protected async onScroll(): Promise<void> {
    this.page++;
    await this.getData();
  }

  protected async applyFilter(filteredProducts: any): Promise<void> {
    this.data = filteredProducts;
    this.page = 0;
    this.noMoreData = filteredProducts.length < this.pageSize;
  }

  private async getData(): Promise<void> {
    if (this.isLoading || this.noMoreData) {
      return;
    }
    this.isLoading = true;
    if (this.page === 0)
      await this.spinner.show();
    try {
      const newData: [] = await firstValueFrom(this.httpClientService.get<any>(
        {
          controller: this.apiSettings.controller,
          action: this.apiSettings.action,
          queryString: this.apiSettings.queryString ? `${this.apiSettings.queryString}&page=${this.page}&size=${this.pageSize}` : `page=${this.page}&size=${this.pageSize}`
        }
      ));
      if (newData && newData.length > 0) {
        this.data = [...this.data, ...newData];
        setTimeout((): void => {
          const scrollableContainer: HTMLElement = document.documentElement || document.body;
          scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
        }, 0);
      } else {
        this.noMoreData = true;
        console.warn("No more data");
      }
      this.isLoading = false;
      if(this.page == 0)
        await this.spinner.hide();
      window.scrollTo(0, this.scrollPosition);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  protected async handleSuccess(): Promise<void> {
    this.data = [];
    this.page = 0;
    this.noMoreData = false;
    await this.getData();
  }

  protected checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }
  protected toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
  }

  protected readonly environment = environment;
}
export interface DynamicCardListColumns {
  cardTitle: {title: string, style?: string, image?: string, implode?: string, class?: string, transform?: (value: any, implode?: string) => any}[];
  cardTitleStyle?: string;
  cardTitleClass?: string;
  cardBody: {label: string, field: string, class?: string, style?: string, transform?: (value: any) => any, image?: string}[];
}

export interface DynamicCardListCustomButtons {
  label?: string;
  icon?: string;
  class?: string;
  clickHandler?: (data: any) => void;
}

export interface ApiSettings {
  controller: string;
  action?: string;
  queryString?: string;
}
