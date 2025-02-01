import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Step } from '../components/form-builder/form-builder.component';

@Injectable({ providedIn: 'root' })
export class StateService {
  private stepsSubject = new BehaviorSubject<Step[]>([]);
  private formDataSubject = new BehaviorSubject<any>({});
  private dtoSubject = new BehaviorSubject<any>({});
  private filterStepsSubject = new BehaviorSubject<Step[]>([]);

  steps$ = this.stepsSubject.asObservable();
  formData$ = this.formDataSubject.asObservable();
  dto$ = this.dtoSubject.asObservable();
  filterSteps$ = this.filterStepsSubject.asObservable();

  updateSteps(newSteps: Step[]): void {
    this.stepsSubject.next(newSteps);
  }

  updateFormData(newFormData: any): void {
    this.formDataSubject.next(newFormData);
  }

  updateDto(newDto: any): void {
    this.dtoSubject.next(newDto);
  }

  updateFilterSteps(newFilterSteps: Step[]): void {
    this.filterStepsSubject.next(newFilterSteps);
  }
}
