import {Component, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CreateCashback} from '../../../dtos/cashback/create-cashback';
import {EditCashback} from '../../../dtos/cashback/edit-cashback';
import {FilterCashback} from '../../../dtos/cashback/filter-cashback';
import {DynamicModalConfig} from '../../dynamic-modal/dynamic-modal.component';
import {Step} from '../../form-builder/form-builder.component';
import {ListCategory} from '../../../dtos/category/list-category';
import {CategoryService} from '../../../services/entities/category.service';
import {ListPaymentMethod} from '../../../dtos/payment-method/list-payment-method';
import {PaymentMethodService} from '../../../services/entities/payment-method.service';
import {StockService} from '../../../services/entities/stock.service';
import {ListStock} from '../../../dtos/stock/list-stock';
import {DynamicCardListColumns, DynamicCardListComponent} from '../../dynamic-card-list/dynamic-card-list.component';

@Component({
  selector: 'app-cashback',
  imports: [
    TranslatePipe,
    DynamicCardListComponent
  ],
  templateUrl: './cashback.component.html',
  styleUrl: './cashback.component.scss'
})
export class CashbackComponent implements OnInit{
  protected createCashback: CreateCashback = new CreateCashback();
  protected editCashback: EditCashback = new EditCashback();
  protected filterCashback: FilterCashback = new FilterCashback();
  protected columns!: DynamicCardListColumns;
  protected createModalConfig!: DynamicModalConfig;
  protected editModalConfig!: DynamicModalConfig;
  protected filterSteps: Step[] = [];

  constructor(
    protected readonly translate: TranslateService,
    private readonly categoryService: CategoryService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly stockService: StockService
  ) {}

  async ngOnInit(): Promise<void> {
    this.createModalConfig = {
      steps: [
        {
          step: 1,
          element_type: 'select',
          params: {
            name: 'categoryId',
            options: await this.getCategories(),
            label: this.translate.instant('CASHBACK.CATEGORY')
          },
          wait: false
        },
        {
          step: 2,
          element_type: 'select',
          params: {
            name: 'paymentMethodId',
            options: await this.getPaymentMethods(),
            label: this.translate.instant('CASHBACK.PAYMENT_METHOD')
          },
          wait: false
        },
        {
          step: 3,
          element_type: 'select',
          params: {
            name: 'stockId',
            options: await this.getStocks(),
            label: this.translate.instant('CASHBACK.OBJECT')
          },
          wait: false
        },
        {
          step: 4,
          element_type: 'input',
          params: {
            name: 'percentage',
            type: 'number',
            label: this.translate.instant('CASHBACK.PERCENTAGE'),
          },
          wait: false
        }
      ],
      title: this.translate.instant('CASHBACK.ADD_CASHBACK')
    };
    this.editModalConfig = {
      steps: [
        {
          step: 1,
          element_type: 'select',
          params: {
            name: 'categoryId',
            options: await this.getCategories(),
            label: this.translate.instant('CASHBACK.CATEGORY')
          },
          wait: false
        },
        {
          step: 2,
          element_type: 'select',
          params: {
            name: 'paymentMethodId',
            options: await this.getPaymentMethods(),
            label: this.translate.instant('CASHBACK.PAYMENT_METHOD')
          },
          wait: false
        },
        {
          step: 3,
          element_type: 'select',
          params: {
            name: 'stockId',
            options: await this.getStocks(),
            label: this.translate.instant('CASHBACK.OBJECT')
          },
          wait: false
        },
        {
          step: 4,
          element_type: 'input',
          params: {
            name: 'percentage',
            type: 'number',
            label: this.translate.instant('CASHBACK.PERCENTAGE'),
          },
          wait: false
        },
        {
          step: 5,
          element_type: 'input',
          params: {
            type: 'hidden',
            name: 'id',
            label: ''
          },
          wait: false
        }
      ],
      title: this.translate.instant('CASHBACK.EDIT_CASHBACK')
    };
    this.columns = {
      cardTitle: [
        {title: 'categoryName', style: 'padding-right: 150px;'},
        {title: 'paymentMethodName', style: 'padding-right: 150px;'},
        {title: 'percentage', implode: ' %', style: 'padding-right: 150px;', class: 'text-success'}
      ],
      cardBody: [
        {label: this.translate.instant('COMMON.NAME'), field: 'paymentMethodName'},
        {label: this.translate.instant('CASHBACK.OBJECT'), field: 'stockName'},
        {label: this.translate.instant('CASHBACK.CATEGORY'), field: 'categoryName'},
        {label: this.translate.instant('CASHBACK.PERCENTAGE'), field: 'percentage'}
      ]
    };

  }

  async getCategories(): Promise<{value: string, text: string}[]> {
    const data: ListCategory[] | undefined = await this.categoryService.getAll();
    const result: {value: string, text: string}[] = data?.map(c => ({
      value: c.id,
      text: c.name
    })) || [];
    return [{ value: '', text: this.translate.instant('COMMON.SELECT') }, ...result];
  }

  async getPaymentMethods(): Promise<{value: string, text: string}[]> {
    const data: ListPaymentMethod[] | undefined = await this.paymentMethodService.getAll();
    return data?.map(c => ({
      value: c.id,
      text: c.name
    })) || [];
  }

  async getStocks(): Promise<{value: string, text: string}[]> {
    const data: ListStock[] | undefined = await this.stockService.getAll();
    const result: {value: string, text: string}[] = data?.map(c => ({
      value: c.id,
      text: c.name
    })) || [];
    return [{ value: '', text: this.translate.instant('COMMON.SELECT') }, ...result];
  }

}
