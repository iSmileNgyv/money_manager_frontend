import { Injectable } from '@angular/core';
import {HttpClientService} from '../http-client.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ListStock} from '../../dtos/stock/list-stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private readonly httpClientService: HttpClientService
  ) { }

  async getAll(): Promise<ListStock[] | undefined> {
    return new Promise((resolve, reject) => {
      this.httpClientService.get<ListStock[]>({
        controller: "stocks",
        action: 'all'
      }).subscribe({
        next: (data: ListStock[]): void => {
          resolve(data);
        },
        error: (error: HttpErrorResponse): void => {
          console.error(error.message);
          reject(error);
        }
      });
    });
  }
}
