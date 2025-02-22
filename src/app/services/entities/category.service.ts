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

  async filterByType(type: string): Promise<ListCategory[] | undefined> {
    return new Promise((resolve, reject) => {
      this.httpClientService.get<ListCategory[]>({
        controller: "category",
        action: 'filter',
        queryString: `categoryType=${type}`
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

  async getAll(): Promise<ListCategory[] | undefined> {
    return new Promise((resolve, reject) => {
      this.httpClientService.get<ListCategory[]>({
        controller: "category",
        action: 'all'
      }).subscribe({
        next: (data: ListCategory[]): void => {
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
