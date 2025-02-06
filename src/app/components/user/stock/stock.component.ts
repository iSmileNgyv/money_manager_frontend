import {Component, OnInit} from '@angular/core';
import {CreateStock} from '../../../dtos/stock/create-stock';
import {EditStock} from '../../../dtos/stock/edit-stock';
import {FilterStock} from '../../../dtos/stock/filter-stock';
import {DynamicModalConfig} from '../../dynamic-modal/dynamic-modal.component';
import {Step} from '../../form-builder/form-builder.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {
  ApiSettings,
  DynamicCardListColumns,
  DynamicCardListComponent
} from '../../dynamic-card-list/dynamic-card-list.component';

@Component({
  selector: 'app-stock',
  imports: [
    TranslatePipe,
    DynamicCardListComponent
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit{
  protected createDto: CreateStock = new CreateStock();
  protected editDto: EditStock = new EditStock();
  protected filterDto: FilterStock = new FilterStock();
  protected columns!: DynamicCardListColumns;
  protected createModalConfig!: DynamicModalConfig;
  protected editModalConfig!: DynamicModalConfig;
  protected filterSteps: Step[] = [];
  protected apiSettings!: ApiSettings;

  constructor(
    protected readonly translate: TranslateService
  ) {
  }

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
      title: this.translate.instant('STOCK.ADD_OBJECT')
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
            name: 'image',
            label: ''
          },
          wait: false
        },
        {
          step: 3,
          element_type: 'input',
          params: {
            name: 'id',
            type: 'hidden',
            label: ''
          },
          wait: false
        }
      ],
      title: this.translate.instant('STOCK.UPDATE_OBJECT')
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
      cardTitle: [
        {title: 'name', image: 'image'}
      ],
      cardBody: [
        {label: this.translate.instant('COMMON.NAME'), field: 'name'}
      ]
    };
    this.apiSettings = {
      controller: 'stock'
    };
  }
}
