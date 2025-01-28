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
import {DynamicCardListColumns} from '../../dynamic-card-list/dynamic-card-list.component';

@Component({
  selector: 'app-transaction',
  imports: [
    TranslatePipe
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit{
  protected createTransaction: CreateTransaction = new CreateTransaction();
  protected editTransaction: EditTransaction = new EditTransaction();
  protected columns!: DynamicCardListColumns;
  protected createModalConfig!: DynamicModalConfig;
  protected editModalConfig!: DynamicModalConfig;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly stockService: StockService,
    protected readonly translate: TranslateService
  ) {}
  async ngOnInit(): Promise<void> {
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
            name: 'id',
            label: '',
            type: 'hidden'
          },
          wait: false
        }
      ],
      title: 'Edit transaction'
    };
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
}
