import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorMessages = new BehaviorSubject<string[]>([]);
  errors$ = this.errorMessages.asObservable();
  constructor() { }

  addError(message: string) {
    const currentErrors: string[] = this.errorMessages.getValue();
    this.errorMessages.next([...currentErrors, message]);
  }

  clearErrors() {
    this.errorMessages.next([]);
  }

}
