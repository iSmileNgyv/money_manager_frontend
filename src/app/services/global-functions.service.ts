import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {

  constructor() { }
  categoryTypes(): {value: CategoryType, text: string}[] {
    return [
      { value: CategoryType.PLUS, text: 'Gəlir' },
      { value: CategoryType.MINUS, text: 'Xərc' },
      { value: CategoryType.PRODUCT, text: 'Məhsul' }
    ];
  }
  categoryType(type: CategoryType): string {
    switch(type) {
      case CategoryType.PLUS:
        return 'Gəlir';
      case CategoryType.MINUS:
        return 'Xərc';
      case CategoryType.PRODUCT:
        return 'Məhsul';
    }
    return 'undefined';
  }
}

export enum CategoryType {
  PLUS = 0,
  MINUS = 1,
  PRODUCT = 2
}
