import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorMessages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  errors$: Observable<string[]> = this.errorMessages.asObservable();
  constructor() { }

  addError(message: string): void {
    const currentErrors: string[] = this.errorMessages.getValue();
    this.errorMessages.next([...currentErrors, message]);
  }

  clearErrors(): void {
    this.errorMessages.next([]);
  }

}
