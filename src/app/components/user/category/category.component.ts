import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {EditCategory} from '../../../dtos/category/edit-category';
import {CreateCategory} from '../../../dtos/category/create-category';
import {FilterCategory} from '../../../dtos/category/filter-category';
import {GlobalFunctionsService} from '../../../services/global-functions.service';
import {DynamicModalConfig} from '../../dynamic-modal/dynamic-modal.component';
import {Step} from '../../form-builder/form-builder.component';
import {DynamicCardListComponent} from '../../dynamic-card-list/dynamic-card-list.component';
import {CategoryService} from '../../../services/entities/category.service';
import {ListCategory} from '../../../dtos/category/list-category';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-category',
  imports: [
    ReactiveFormsModule,
    DynamicCardListComponent,
    TranslatePipe
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{
  protected createCategory: CreateCategory = new CreateCategory();
  protected editCategory: EditCategory = new EditCategory();
  protected filterCategory: FilterCategory = new FilterCategory();
  constructor(
    private readonly globalFunctions: GlobalFunctionsService,
    private readonly service: CategoryService,
    protected readonly translate: TranslateService
  ) {}
  protected columns: any = [];
  protected createModalConfig!: DynamicModalConfig;
  protected editModalConfig!: DynamicModalConfig;
  protected filterSteps: Step[] = [];
  ngOnInit(): void {
    this.editModalConfig = {
      steps: [
        {step: 1, element_type: 'input', params: {name: 'name', label: this.translate.instant('COMMON.NAME'), validators: [Validators.required], validationMessages: {required: this.translate.instant('CATEGORY.NAME_REQUIRED')}}, wait: false},
        {step: 2, element_type: 'select', params: {name: 'categoryType', label: this.translate.instant('COMMON.TYPE'), options: this.getTypes(), validators: [Validators.required], validationMessages: {required: this.translate.instant('CATEGORY.TYPE_REQUIRED')}}, wait: false},
        {step: 3, element_type: 'select', params: {name: 'categoryId', label: this.translate.instant('CATEGORY.PARENT_CATEGORY'), options: [], value: ''}, wait: true, waitParams: {dependsOn: 'categoryType', run: async (value: string, defaultValue?: string): Promise<void> => {await this.run(value, defaultValue);}}},
        {step: 4, element_type: 'textarea', params: {name: 'description', label: this.translate.instant('COMMON.DESCRIPTION')}, wait: false},
        {step: 5, element_type: 'input', params: {type: 'hidden', name: 'id', label: ''}, wait: false},
        {step: 6, element_type: 'select-image', params: {label: '', name: 'image'}, wait: false}
      ],
      title: this.translate.instant('CATEGORY.UPDATE_CATEGORY'),
      controller: 'categories'
    };
    this.createModalConfig = {
      steps: [
        {step: 1, element_type: 'input', params: {name: 'name', label: this.translate.instant('COMMON.NAME'), validators: [Validators.required], validationMessages: {required: this.translate.instant('CATEGORY.NAME_REQUIRED')}}, wait: false},
        {step: 2, element_type: 'select', params: {name: 'categoryType', label: this.translate.instant('COMMON.TYPE'), options: this.getTypes(), validators: [Validators.required], validationMessages: {required: this.translate.instant('CATEGORY.TYPE_REQUIRED')}}, wait: false},
        {step: 3, element_type: 'select', params: {name: 'categoryId', label: this.translate.instant('CATEGORY.PARENT_CATEGORY'), options: [], value: ''}, wait: true, waitParams: {dependsOn: 'categoryType', run: async (value: string, defaultValue?: string): Promise<void> => {await this.run(value, defaultValue);}}},
        {step: 4, element_type: 'textarea', params: {name: 'description', label: this.translate.instant('COMMON.DESCRIPTION')}, wait: false},
        {step: 5, element_type: 'select-image', params: {label: '', name: 'image', validators: [Validators.required], validationMessages: {required: 'Şəkil seçmədiniz'}}, wait: false}
      ],
      dto: this.createCategory,
      controller: 'categories',
      modalId: 'create-modal',
      type: 'POST',
      title: this.translate.instant('CATEGORY.ADD_CATEGORY')
    };
    this.filterSteps = [
      {step: 1, element_type: 'input', params: {name: 'name', label: this.translate.instant('COMMON.NAME')}, wait: false},
      {step: 2, element_type: 'select', params: {name: 'categoryType', label: this.translate.instant('COMMON.TYPE'), options: this.getTypes()}, wait: false}
    ];
    this.columns = {
      cardTitle: 'name',
      cardBody: [
        {label: this.translate.instant('COMMON.NAME'), field: 'name'},
        {label: this.translate.instant('COMMON.TYPE'), field: 'categoryType', transform: this.transformValue.bind(this)},
        {label: 'Parent category', field: 'parentCategoryName'}
      ]
    };
  }

  transformValue(value: any): any {
    return this.globalFunctions.categoryType(value);
  }

  private async run(value: string, defaultValue?: string): Promise<void> {
    setTimeout(async (): Promise<void> => {
      let data: ListCategory[] | undefined = await this.service.filterByType(value);
      if(data !== undefined) {
        const element : HTMLElement | null = document.getElementById('categoryId') as HTMLSelectElement;
        if(element) {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
          const defaultOption: HTMLOptionElement = document.createElement('option');
          defaultOption.value = '';
          defaultOption.textContent = this.translate.instant('COMMON.SELECT');
          element.appendChild(defaultOption);

          data.forEach(item => {
            const option: HTMLOptionElement = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            if(item.id === defaultValue) {
              option.selected = true;
            }
            element.appendChild(option);
          });
        }
      }
    });
  }

  private getTypes(): { value: string, text: string }[] {
    const types: {value: string, text: string}[] = this.globalFunctions.categoryTypes().map(type => ({
      value: type.value.toString(),
      text: type.text
    }));

    return [{ value: '', text: this.translate.instant('COMMON.SELECT') }, ...types];
  }
}
