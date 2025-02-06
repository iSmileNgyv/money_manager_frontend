import {Component, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {DynamicModalConfig} from '../../dynamic-modal/dynamic-modal.component';
import {Step} from '../../form-builder/form-builder.component';
import {
  ApiSettings,
  DynamicCardListColumns,
  DynamicCardListComponent
} from '../../dynamic-card-list/dynamic-card-list.component';
import {CreateProduct} from '../../../dtos/product/create-product';
import {EditProduct} from '../../../dtos/product/edit-product';
import {FilterProduct} from '../../../dtos/product/filter-product';
import {Validators} from '@angular/forms';
import {CategoryService} from '../../../services/entities/category.service';
import {ListCategory} from '../../../dtos/category/list-category';
import {CategoryType} from '../../../services/global-functions.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [
    TranslatePipe,
    DynamicCardListComponent,
    NgIf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  protected createProduct: CreateProduct = new CreateProduct();
  protected editProduct: EditProduct = new EditProduct();
  protected filterProduct: FilterProduct = new FilterProduct();
  protected columns!: DynamicCardListColumns;
  protected createModalConfig!: DynamicModalConfig;
  protected editModalConfig!: DynamicModalConfig;
  protected filterSteps: Step[] = [];
  protected isLoaded: boolean = false;
  protected apiSettings!: ApiSettings;
  constructor(
    protected readonly translate: TranslateService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.initialize().then((): void => {
      this.isLoaded = true;
    });
  }

  private async initialize(): Promise<void> {
    this.createModalConfig = {
      steps: [
        {
          step: 1,
          element_type: 'input',
          params: {
            name: 'name',
            label: this.translate.instant('COMMON.NAME'),
            validators: [
              Validators.required
            ],
            validationMessages: {
              required: this.translate.instant('PRODUCT.NAME_REQUIRED')
            }
          },
          wait: false
        },
        {
          step: 2,
          element_type: 'select',
          params: {
            name: 'categoryId',
            options: await this.getCategories(),
            label: this.translate.instant('PRODUCT.CATEGORY')
          },
          wait: false
        },
        {
          step: 3,
          element_type: 'input',
          params: {
            name: 'price',
            label: this.translate.instant('PRODUCT.PRICE')
          },
          wait: false
        },
        {
          step: 4,
          element_type: 'textarea',
          params: {
            name: 'description',
            label: this.translate.instant('COMMON.DESCRIPTION')
          },
          wait: false
        },
        {
          step: 5,
          element_type: 'select-image',
          params: {
            name: 'image',
            label: '',
            validators: [Validators.required],
            validationMessages: {
              required: 'Şəkil seçmədiniz'
            }
          },
          wait: false
        }
      ],
      title: this.translate.instant('PRODUCT.ADD_PRODUCT')
    };
    this.editModalConfig = {
      steps: [
        {
          step: 1,
          element_type: 'input',
          params: {
            name: 'name',
            label: this.translate.instant('COMMON.NAME'),
            validators: [
              Validators.required
            ],
            validationMessages: {
              required: this.translate.instant('PRODUCT.NAME_REQUIRED')
            }
          },
          wait: false
        },
        {
          step: 2,
          element_type: 'select',
          params: {
            name: 'categoryId',
            options: await this.getCategories(),
            label: this.translate.instant('PRODUCT.CATEGORY')
          },
          wait: false
        },
        {
          step: 3,
          element_type: 'input',
          params: {
            name: 'price',
            label: this.translate.instant('PRODUCT.PRICE')
          },
          wait: false
        },
        {
          step: 4,
          element_type: 'textarea',
          params: {
            name: 'description',
            label: this.translate.instant('COMMON.DESCRIPTION')
          },
          wait: false
        },
        {
          step: 5,
          element_type: 'select-image',
          params: {
            name: 'image',
            label: '',
            validators: [Validators.required],
            validationMessages: {
              required: 'Şəkil seçmədiniz'
            }
          },
          wait: false
        },
        {
          step: 6,
          element_type: 'input',
          params: {
            type: 'hidden',
            name: 'id',
            label: ''
          },
          wait: false
        }
      ],
      title: this.translate.instant('PRODUCT.UPDATE_PRODUCT')
    };
    this.filterSteps = [
      {
        step: 1,
        element_type: 'input',
        params: {
          name: 'name',
          label: this.translate.instant('COMMON.NAME')},
        wait: false
      },
      {
        step: 2,
        element_type: 'select',
        params: {
          name: 'categoryId',
          options: await this.getCategories(),
          label: this.translate.instant('PRODUCT.CATEGORY')
        },
        wait: false
      }
    ];
    this.columns = {
      cardTitle: [
        {title: 'name', image: 'image'}
      ],
      cardBody: [
        {label: this.translate.instant('COMMON.NAME'), field: 'name'},
        {label: this.translate.instant('PRODUCT.PRICE'), field: 'price'},
        {label: this.translate.instant('PRODUCT.CATEGORY'), field: 'categoryName'}
      ]
    };
    this.apiSettings = {
      controller: 'product'
    };
  }

  async getCategories(): Promise<{value: string, text: string}[]> {
    const data: ListCategory[] | undefined = await this.categoryService.filterByType(CategoryType.PRODUCT.toString());
    const result: {value: string, text: string}[] = data?.map(c => ({
      value: c.id,
      text: c.name
    })) || [];
    return [{ value: '', text: this.translate.instant('COMMON.SELECT') }, ...result];
  }

}
