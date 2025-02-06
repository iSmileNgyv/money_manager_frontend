import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CreateTransactionProduct} from '../../../dtos/transaction-product/create-transaction-product';
import {EditTransactionProduct} from '../../../dtos/transaction-product/edit-transaction-product';
import {
  ApiSettings,
  DynamicCardListColumns,
  DynamicCardListComponent
} from '../../dynamic-card-list/dynamic-card-list.component';
import {DynamicModalConfig} from '../../dynamic-modal/dynamic-modal.component';
import {ProductService} from '../../../services/entities/product.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ListProduct} from '../../../dtos/product/list-product';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-transaction-product',
  imports: [
    TranslatePipe,
    RouterLink,
    NgIf,
    DynamicCardListComponent
  ],
  templateUrl: './transaction-product.component.html',
  styleUrl: './transaction-product.component.scss'
})
export class TransactionProductComponent implements OnInit{
  protected createTransactionProduct: CreateTransactionProduct = new CreateTransactionProduct();
  protected editTransactionProduct: EditTransactionProduct = new EditTransactionProduct();
  protected columns!: DynamicCardListColumns;
  protected createModalConfig!: DynamicModalConfig;
  protected editModalConfig!: DynamicModalConfig;
  protected isLoading: boolean = false;
  private transactionId!: string;
  protected apiSettings!: ApiSettings;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.transactionId = params['transactionId'];
    });
    this.initialize().then(() => {
      this.isLoading = true;
    });
  }

  private async initialize(): Promise<void> {
    this.createModalConfig = {
      steps: [
        {
          step: 1,
          element_type: 'select',
          params: {
            name: 'productId',
            options: await this.getProducts(),
            label: 'Product'
          },
          wait: false
        },
        {
          step: 2,
          element_type: 'input',
          params: {
            name: 'quantity',
            type: 'number',
            label: 'Quantity'
          },
          wait: false,
          col_size: 6
        },
        {
          step: 3,
          element_type: 'input',
          params: {
            name: 'price',
            type: 'number',
            label: 'Price'
          },
          wait: false,
          col_size: 6
        },
        {
          step: 4,
          element_type: 'input',
          params: {
            name: 'transactionId',
            type: 'hidden',
            value: this.transactionId,
            label: ''
          },
          wait: false
        }
      ],
      title: 'Add product'
    };
    this.editModalConfig = {
      steps: [
        {
          step: 1,
          element_type: 'select',
          params: {
            name: 'productId',
            options: await this.getProducts(),
            label: 'Product'
          },
          wait: false
        },
        {
          step: 2,
          element_type: 'input',
          params: {
            name: 'quantity',
            type: 'number',
            label: 'Quantity'
          },
          wait: false,
          col_size: 6
        },
        {
          step: 3,
          element_type: 'input',
          params: {
            name: 'price',
            type: 'number',
            label: 'Price'
          },
          wait: false,
          col_size: 6
        },
        {
          step: 4,
          element_type: 'input',
          params: {
            name: 'id',
            type: 'hidden',
            label: ''
          },
          wait: false
        },
        {
          step: 5,
          element_type: 'input',
          params: {
            name: 'transactionId',
            type: 'hidden',
            label: ''
          },
          wait: false
        }
      ],
      title: 'Edit product'
    };
    this.columns = {
      cardTitle: [
        {
          title: 'productName',
          image: 'productImage'
        }
      ],
      cardBody: [
        {
          label: 'Product name',
          field: 'productName'
        },
        {
          label: 'Quantity',
          field: 'quantity'
        },
        {
          label: 'Price',
          field: 'price'
        }
      ]
    };
    this.apiSettings = {
      controller: 'transactionProduct',
      action: 'transaction',
      queryString: `transactionId=${this.transactionId}`
    };
  }

  private async getProducts(): Promise<{value: string, text: string}[]> {
    const data: ListProduct[] | undefined = await this.productService.getAll();
    const result: {value: string, text: string}[] = data?.map(p => ({
      value: p.id,
      text: p.name
    })) || [];
    return [{ value: '', text: this.translate.instant('COMMON.SELECT') }, ...result];
  }

}
