import {Component, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {DynamicCardListComponent} from '../../dynamic-card-list/dynamic-card-list.component';
import {CreatePaymentMethod} from '../../../dtos/payment-method/create-payment-method';
import {EditPaymentMethod} from '../../../dtos/payment-method/edit-payment-method';
import {FilterPaymentMethod} from '../../../dtos/payment-method/filter-payment-method';
import {DynamicModalConfig} from '../../dynamic-modal/dynamic-modal.component';
import {Step} from '../../form-builder/form-builder.component';

@Component({
  selector: 'app-payment-method',
  imports: [
    TranslatePipe,
    DynamicCardListComponent
  ],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss'
})
export class PaymentMethodComponent implements OnInit{
  protected createDto: CreatePaymentMethod = new CreatePaymentMethod();
  protected editDto: EditPaymentMethod = new EditPaymentMethod();
  protected filterDto: FilterPaymentMethod = new FilterPaymentMethod();
  protected columns: any = [];
  protected createModalConfig!: DynamicModalConfig;
  protected editModalConfig!: DynamicModalConfig;
  protected filterSteps: Step[] = [];

  constructor(
    protected readonly translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.createModalConfig = {
      steps: [
        {
          step: 1,
          element_type: 'input',
          params: {
            name: 'name',
            label: this.translate.instant('COMMON.NAME')
          },
          wait: false
        },
        {
          step: 2,
          element_type: 'select-image',
          params: {
            name: 'image',
            label: ''
          },
          wait: false
        }
      ],
      title: this.translate.instant('PAYMENT_METHOD.ADD_PAYMENT_METHOD')
    };

    this.editModalConfig = {
      steps: [
        {
          step: 1,
          element_type: 'input',
          params: {
            name: 'name',
            label: this.translate.instant('COMMON.NAME')
          },
          wait: false
        },
        {
          step: 2,
          element_type: 'select-image',
          params: {
            label: '',
            name: 'image'
          },
          wait: false
        },
        {
          step: 3,
          element_type: 'input',
          params: {
            type: 'hidden',
            label: '',
            name: 'id'
          },
          wait: false
        }
      ],
      title: this.translate.instant('PAYMENT_METHOD.UPDATE_PAYMENT_METHOD')
    };

    this.filterSteps = [
      {
        step: 1,
        element_type: 'input',
        params: {
          name: 'name',
          label: this.translate.instant('COMMON.NAME')
        },
        wait: false
      }
    ];

    this.columns = {
      cardTitle: 'name',
      cardBody: [
        {label: this.translate.instant('COMMON.NAME'), field: 'name'}
      ]
    };
  }
}
