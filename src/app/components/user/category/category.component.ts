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
@Component({
  selector: 'app-category',
  imports: [
    ReactiveFormsModule,
    DynamicCardListComponent
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
    private readonly service: CategoryService
  ) {}
  protected createModalConfig!: DynamicModalConfig;
  protected editModalConfig!: DynamicModalConfig;
  protected filterSteps: Step[] = [];
  ngOnInit(): void {
    this.editModalConfig = {
      steps: [
        {step: 1, element_type: 'input', params: {name: 'name', label: 'Kateqoriya adı', validators: [Validators.required], validationMessages: {required: 'Kateqoriya adı boş ola bilməz'}}, wait: false},
        {step: 2, element_type: 'select', params: {name: 'categoryType', label: 'Kateqoriya tipi', options: this.getTypes(), validators: [Validators.required], validationMessages: {required: 'Kateqoriya tipi boş ola bilməz'}}, wait: false},
        {step: 3, element_type: 'select', params: {name: 'categoryId', label: 'Üst kateqoriya', options: [], value: ''}, wait: true, waitParams: {dependsOn: 'categoryType', run: async (value: string, defaultValue?: string): Promise<void> => {await this.run(value, defaultValue);}}},
        {step: 4, element_type: 'textarea', params: {name: 'description', label: 'Qeyd'}, wait: false},
        {step: 5, element_type: 'input', params: {type: 'hidden', name: 'id', label: ''}, wait: false}
      ],
      title: 'Kateqoriya güncəllə',
      controller: 'categories'
    };
    this.createModalConfig = {
      steps: [
        {step: 1, element_type: 'input', params: {name: 'name', label: 'Kateqoriya adı', validators: [Validators.required], validationMessages: {required: 'Kateqoriya adı boş ola bilməz'}}, wait: false},
        {step: 2, element_type: 'select', params: {name: 'categoryType', label: 'Kateqoriya tipi', options: this.getTypes(), validators: [Validators.required], validationMessages: {required: 'Kateqoriya tipi boş ola bilməz'}}, wait: false},
        {step: 3, element_type: 'select', params: {name: 'categoryId', label: 'Üst kateqoriya', options: [], value: ''}, wait: true, waitParams: {dependsOn: 'categoryType', run: async (value: string, defaultValue?: string): Promise<void> => {await this.run(value, defaultValue);}}},
        {step: 4, element_type: 'textarea', params: {name: 'description', label: 'Qeyd'}, wait: false}
      ],
      dto: this.createCategory,
      controller: 'categories',
      modalId: 'create-modal',
      type: 'POST',
      title: 'Kateqoriya əlavə et'
    };
    this.filterSteps = [
      {step: 1, element_type: 'input', params: {name: 'name', label: 'Ad'}, wait: false},
      {step: 2, element_type: 'select', params: {name: 'categoryType', label: 'Kateqoriya tipi', options: this.getTypes()}, wait: false}
    ];
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
          defaultOption.textContent = 'Seçin';
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

    return [{ value: '', text: 'Seçin' }, ...types];
  }
}
