import { Injectable } from '@angular/core';
import {HttpClientService} from '../http-client.service';
import {ListCashback} from '../../dtos/cashback/list-cashback';
import {FilterCashback} from '../../dtos/cashback/filter-cashback';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CashbackService {

  constructor(
    private readonly httpClientService: HttpClientService
  ) { }

  async filter(filterCashback: FilterCashback): Promise<ListCashback[] | undefined> {
    return new Promise((resolve, reject) => {
      this.httpClientService.get<ListCashback[]>({
        controller: 'cashbacks',
        action: 'filter',
        queryString: this.toQueryString(filterCashback)
      }).subscribe({
        next: (data: ListCashback[]) => {resolve(data);},
        error: (error: HttpErrorResponse) => {
          console.error(error.message);
          reject(error);
        }
      })
    });
  }

  private toQueryString(obj: any): string {
    return Object.keys(obj)
      .map(key => {
        const value: any = obj[key] == null ? '' : obj[key];
        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
      })
      .join('&');
  }
}
