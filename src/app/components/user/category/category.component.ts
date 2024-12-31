import {Component, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {EditCategory} from '../../../dtos/category/edit-category';
import {CreateCategory} from '../../../dtos/category/create-category';
import {FilterCategory} from '../../../dtos/category/filter-category';
import {NgxSpinnerComponent, NgxSpinnerService} from 'ngx-spinner';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FilterDirective} from '../../../directives/filter.directive';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {DeleteDirective} from '../../../directives/delete.directive';
import {ModalComponent} from '../../modal/modal.component';
import {CardFooterInformationComponent} from '../../card-footer-information/card-footer-information.component';
import {CategoryService} from '../../../services/entities/category.service';
import {ListCategory} from '../../../dtos/category/list-category';
import {RouterLink} from '@angular/router';
import {CategoryType, GlobalFunctionsService} from '../../../services/global-functions.service';
import {DynamicModalComponent, Step} from '../../dynamic-modal/dynamic-modal.component';
declare var $: any;
@Component({
  selector: 'app-category',
  imports: [
    NgClass,
    ReactiveFormsModule,
    FilterDirective,
    NgxSpinnerComponent,
    InfiniteScrollDirective,
    NgForOf,
    DeleteDirective,
    ModalComponent,
    CardFooterInformationComponent,
    RouterLink,
    NgIf,
    DynamicModalComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{
  categories: any = [];
  allCategories: any = [];
  form: FormGroup;
  editCategory: EditCategory = new EditCategory();
  createCategory: CreateCategory = new CreateCategory();
  filterCategory: FilterCategory = new FilterCategory();
  steps: Step[] = [];
  private page: number = 0;
  private pageSize: number = 10;
  private isLoading: boolean = false;
  private noMoreCategories: boolean = false;
  public isMobile: boolean = false;
  public isSearchVisible: boolean = false;
  private scrollPosition: number = 0;

  constructor(
    private readonly categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private readonly globalFunctions: GlobalFunctionsService
  ) {
    this.form = new FormGroup({});
    this.steps = [
      {
        step: 1,
        element_type: 'input',
        params: {
          name: 'categoryName',
          label: 'Kategori Adı',
          placeholder: 'Kategori adını girin',
          type: 'text',
        },
        col_size: 6,
        wait: false
      },
      {
        step: 2,
        element_type: 'select',
        params: {
          name: 'categoryType',
          label: 'Kategori tipi',
          id: 'categoryType',
          value: 'Harcama',
          options: [
            {value: '', text: 'Seçiniz'},
            { value: 'Harcama', text: 'Harcama' },
            { value: 'Kazanma', text: 'Kazanma' },
          ],
        },
        col_size: 6,
        wait: false
      },
      {
        step: 3,
        element_type: 'select',
        params: {
          name: 'subCategory',
          label: 'Alt Kategori',
          id: 'subCategory',
          options: []
        },
        col_size: 6,
        wait: true,
        waitParams: {
          dependsOn: 'categoryType',
          run: (value: string): void => {
            setTimeout((): void => {
              const element = document.getElementById('subCategory') as HTMLSelectElement;
              if (element) {
                element.innerHTML = '';
                const defaultOption: HTMLOptionElement = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Seçiniz';
                element.appendChild(defaultOption);

                const options: {value: string, text: string}[] = value === 'Harcama'
                  ? [
                    { value: 'sub1', text: 'Alt Kategori 1' },
                    { value: 'sub2', text: 'Alt Kategori 2' },
                  ]
                  : value === 'Kazanma'
                    ? [
                      { value: 'sub3', text: 'Alt Kategori 3' },
                      { value: 'sub4', text: 'Alt Kategori 4' },
                    ]
                    : [];
                options.forEach(opt => {
                  const optionElement: HTMLOptionElement = document.createElement('option');
                  optionElement.value = opt.value;
                  optionElement.textContent = opt.text;
                  element.appendChild(optionElement);
                });
              } else {
                console.warn("Element not found!");
              }
            });
          }
        }
      },
      {
        step: 4,
        element_type: 'input',
        params: {
          name: 'description',
          label: 'Açıklama',
          placeholder: 'Açıklama girin',
          type: 'text',
          id: 'description'
        },
        col_size: 6,
        wait: true,
        waitParams: {
          dependsOn: 'subCategory',
          run: (value: string): void => {
            setTimeout((): void => {
              const element = document.getElementById('description') as HTMLInputElement;
              if (element) {
                element.value = value;
              }
            });
          }
        }
      },
      {
        step: 5,
        element_type: 'textarea',
        params: {
          name: 'note',
          label: 'Not',
          placeholder: 'Not girin',
          id: 'note'
        },
        col_size: 12,
        wait: false
      }
    ];
  }
  public checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }
  public toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
  }
  public async handleSuccess(): Promise<void> {
    this.categories = [];
    this.page = 0;
    this.noMoreCategories = false;
    await this.getCategories(this.page);
  }
  public async getCategories(page: number) : Promise<void> {
    if (this.isLoading || this.noMoreCategories) {
      return;
    }
    if (this.page === 0)
      await this.spinner.show();
    const newCategories: ListCategory[]|undefined = await this.categoryService.read(page, this.pageSize, (): void => {
      console.log("Success");
    }, (errorMessage: string): void => {
      console.error(errorMessage);
    });
    if (newCategories && newCategories.length > 0) {
      this.categories = [...this.categories, ...newCategories];
      setTimeout(() => {
        const scrollableContainer = document.documentElement || document.body;
        scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
      }, 0);
    } else {
      this.noMoreCategories = true;
      console.warn("No more category");
    }
    this.isLoading = false;
    if(this.page == 0)
      await this.spinner.hide();
    window.scrollTo(0, this.scrollPosition);
  }
  public async applyFilter(filteredProducts: any): Promise<void> {
    this.categories = filteredProducts;
    this.page = 0;
    this.noMoreCategories = filteredProducts.length < this.pageSize;
  }

  public async onScroll(): Promise<void> {
    await this.getCategories(++this.page);
  }
  public getType(categoryType: CategoryType): string {
    return this.globalFunctions.categoryType(categoryType);
  }

  public getTypes(): {value: CategoryType, text: string}[] {
    return this.globalFunctions.categoryTypes();
  }

  public async ngOnInit(): Promise<void> {
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile.bind(this));
    await this.getCategories(this.page);
  }
}
