import { Injectable } from '@angular/core';
import {HttpClientService} from '../http-client.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ListPaymentMethod} from '../../dtos/payment-method/list-payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  async getAll(): Promise<ListPaymentMethod[] | undefined> {
    return new Promise((resolve, reject) => {
      this.httpClientService.get<ListPaymentMethod[]>({
        controller: "paymentMethod",
        action: 'all'
      }).subscribe({
        next: (data: ListPaymentMethod[]): void => {
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
