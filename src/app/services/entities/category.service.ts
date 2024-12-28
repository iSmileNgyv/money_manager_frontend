import { Injectable } from '@angular/core';
import {HttpClientService} from '../http-client.service';
import {ListCategory} from '../../dtos/category/list-category';
import {HttpErrorResponse} from '@angular/common/http';
import {CategoryType} from '../global-functions.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private readonly httpClientService: HttpClientService
  ) { }
  async read(
    page: number,
    size: number,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<ListCategory[] | undefined> {
    return new Promise((resolve, reject) => {
      this.httpClientService.get<ListCategory[]>({
        controller: "categories",
        queryString: `page=${page}&size=${size}`
      }).subscribe({
        next: (data) => {
          if (successCallBack) {
            successCallBack();
          }
          resolve(data);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.message);
          if (errorCallBack) {
            errorCallBack(error.message);
          }
          reject(error);
        }
      });
    });
  }

  async filterByType(type: CategoryType): Promise<ListCategory[] | undefined> {
    return new Promise((resolve, reject) => {
      this.httpClientService.get<ListCategory[]>({
        controller: "categories",
        action: 'filter',
        queryString: `type=${type}`
      }).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.message);
          reject(error);
        }
      });
    });
  }
}
