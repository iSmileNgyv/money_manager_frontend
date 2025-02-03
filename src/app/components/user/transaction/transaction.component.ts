import {Component, OnInit} from '@angular/core';
import {CreateTransaction} from '../../../dtos/transaction/create-transaction';
import {EditTransaction} from '../../../dtos/transaction/edit-transaction';
import {DynamicModalConfig} from '../../dynamic-modal/dynamic-modal.component';
import {CategoryService} from '../../../services/entities/category.service';
import {PaymentMethodService} from '../../../services/entities/payment-method.service';
import {ListPaymentMethod} from '../../../dtos/payment-method/list-payment-method';
import {StockService} from '../../../services/entities/stock.service';
import {ListStock} from '../../../dtos/stock/list-stock';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ListCategory} from '../../../dtos/category/list-category';
import {
  DynamicCardListColumns,
  DynamicCardListComponent,
  DynamicCardListCustomButtons
} from '../../dynamic-card-list/dynamic-card-list.component';
import {NgIf} from '@angular/common';
import {CashbackService} from '../../../services/entities/cashback.service';
import {FilterCashback} from '../../../dtos/cashback/filter-cashback';
import {ListCashback} from '../../../dtos/cashback/list-cashback';
import {Validators} from '@angular/forms';
import {ListTransaction} from '../../../dtos/transaction/list-transaction';
import {FilterTransaction} from '../../../dtos/transaction/filter-transaction';
import {Step} from '../../form-builder/form-builder.component';

declare var $: any;
@Component({
  selector: 'app-transaction',
  imports: [
    TranslatePipe,
    DynamicCardListComponent,
    NgIf
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit{
  protected createTransaction: CreateTransaction = new CreateTransaction();
  protected editTransaction: EditTransaction = new EditTransaction();
  protected filterTransaction: FilterTransaction = new FilterTransaction();
  protected columns!: DynamicCardListColumns;
  protected createModalConfig!: DynamicModalConfig;
  protected editModalConfig!: DynamicModalConfig;
  protected filterSteps: Step[] = [];
  protected isLoaded: boolean = false;
  protected customButtons!: DynamicCardListCustomButtons[];

  constructor(
    private readonly categoryService: CategoryService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly stockService: StockService,
    private readonly cashbackService: CashbackService,
    protected readonly translate: TranslateService
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
          element_type: 'select',
          params: {
            name: 'paymentMethodId',
            options: await this.getPaymentMethods(),
            label: 'Payment method'
          },
          wait: false
        },
        {
          step: 2,
          element_type: 'select',
          params: {
            name: 'categoryId',
            options: await this.getCategories(),
            label: 'Category'
          },
          wait: false
        },
        {
          step: 3,
          element_type: 'select',
          params: {
            name: 'stockId',
            options: await this.getStocks(),
            label: 'Stock'
          },
          wait: true,
          waitParams: {
            dependsOn: 'categoryId'
          }
        },
        {
          step: 4,
          element_type: 'input',
          params: {
            name: 'amount',
            label: 'Amount',
            validators: [
              Validators.required
            ],
            validationMessages: {required: 'Amount is required'}
          },
          wait: true,
          waitParams: {
            dependsOn: 'categoryId'
          },
          onChange: (value: number): void => {this.getFilteredCashback(value);}
        },
        {
          step: 5,
          element_type: 'input',
          params: {
            name: 'cashbackAmount',
            label: 'Cashback amount',
            value: '0',
            validators: [
              //Validators.required
            ],
            validationMessages: {
              //required: 'Cashback amount is required'
            }
          },
          wait: true,
          waitParams: {
            dependsOn: 'amount'
          }
        },
        {
          step: 6,
          element_type: 'input',
          params: {
            type: 'date',
            label: 'Date',
            name: 'eventDate',
            value: new Date().toISOString().split('T')[0],
            validators: [
              Validators.required
            ],
            validationMessages: {
              required: 'Date is required'
            }
          },
          wait: false
        }
      ],
      title: 'Create Transaction'
    };

    this.editModalConfig = {
      steps: [
        {
          step: 1,
          element_type: 'select',
          params: {
            name: 'paymentMethodId',
            options: await this.getPaymentMethods(),
            label: 'Payment method'
          },
          wait: false
        },
        {
          step: 2,
          element_type: 'select',
          params: {
            name: 'categoryId',
            options: await this.getCategories(),
            label: 'Category'
          },
          wait: false
        },
        {
          step: 3,
          element_type: 'select',
          params: {
            name: 'stockId',
            options: await this.getStocks(),
            label: 'Stock'
          },
          wait: false
        },
        {
          step: 4,
          element_type: 'input',
          params: {
            name: 'amount',
            label: 'Amount'
          },
          wait: false
        },
        {
          step: 5,
          element_type: 'input',
          params: {
            name: 'cashbackAmount',
            label: 'Cashback amount'
          },
          wait: false
        },
        {
          step: 6,
          element_type: 'input',
          params: {
            type: 'date',
            label: 'Date',
            name: 'eventDate'
          },
          wait: false
        },
        {
          step: 7,
          element_type: 'input',
          params: {
            name: 'id',
            label: '',
            type: 'hidden'
          },
          wait: false
        }
      ],
      title: 'Edit transaction'
    };

    this.filterSteps = [
      {
        step: 1,
        element_type: 'select',
        params: {
          name: 'categoryId',
          options: await this.getCategories(),
          label: 'Category'
        },
        wait: false
      },
      {
        step: 2,
        element_type: 'select',
        params: {
          name: 'stockId',
          options: await this.getStocks(),
          label: 'Stock'
        },
        wait: false
      }
    ];

    this.columns = {
      cardTitle: [
        {
          title: 'categoryName',
          image: 'categoryImage'
        },
        {
          title: 'amount',
          style: 'padding-left: 30px; font-weight: bold;',
          class: 'transactionAmountSpan',
          transform: (value) => {
            $(".transactionAmountSpan span").addClass("text-danger");
            return "₼ " + value;
          }
        }
      ],
      cardBody: [
        {field: 'categoryName', label: 'Category', image: 'categoryImage'},
        {field: 'paymentMethodName', label: 'Payment method', image: 'paymentMethodImage'},
        {field: 'stockName', label: 'Stock', image: 'stockImage'},
        {field: 'eventDate', label: 'Date'},
        {field: 'amount', label: 'Amount', transform: (value) => {
          return "₼ " + value;
          },
          style: 'font-weight: bold;'
        },
        {field: 'cashbackAmount', label: 'Cashback amount', class: 'text-success font-weight-bold', transform: (value) => {
          return "₼ " + value;
          }}
      ]
    };
    this.customButtons = [
      {
        icon: 'fas fa-shopping-basket',
        clickHandler: (value: ListTransaction): void => {
          console.log(value);
        }
      }
    ];
  }

  private async getPaymentMethods(): Promise<{value: string, text: string}[]> {
    const data: ListPaymentMethod[] | undefined = await this.paymentMethodService.getAll();
    return data?.map(c => ({
      value: c.id,
      text: c.name
    })) || [];
  }

  private async getStocks(): Promise<{value: string, text: string}[]> {
    const data: ListStock[] | undefined = await this.stockService.getAll();
    const result: {value: string, text: string}[] = data?.map(c => ({
      value: c.id,
      text: c.name
    })) || [];
    return [{ value: '', text: this.translate.instant('COMMON.SELECT') }, ...result];
  }

  async getCategories(): Promise<{value: string, text: string}[]> {
    const data: ListCategory[] | undefined = await this.categoryService.getAll();
    const result: {value: string, text: string}[] = data?.map(c => ({
      value: c.id,
      text: c.name
    })) || [];
    return [{ value: '', text: this.translate.instant('COMMON.SELECT') }, ...result];
  }

  private async getFilteredCashback(amount?: number): Promise<void> {
    const filterCashback: FilterCashback = {
      categoryId: $("#categoryId").val(),
      stockId: $("#stockId").val(),
      paymentMethodId: $("#paymentMethodId").val()
    };
    const data: ListCashback[] | undefined = await this.cashbackService.filter(filterCashback);
    if(data && data.length > 0) {
      $("#cashbackAmount").val(Number(((amount! * data[0].percentage) / 100).toFixed(2)));
    }
    return undefined;
  }
}
