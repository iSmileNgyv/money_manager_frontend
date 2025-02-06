import { Injectable } from '@angular/core';
import {HttpClientService} from '../http-client.service';
import {ListProduct} from '../../dtos/product/list-product';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private readonly httpClientService: HttpClientService
  ) { }

  async getAll(): Promise<ListProduct[] | undefined> {
    return new Promise((resolve, reject) => {
      this.httpClientService.get<ListProduct[]>({
        controller: "product",
        action: 'all'
      }).subscribe({
        next: (data: ListProduct[]): void => {
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
