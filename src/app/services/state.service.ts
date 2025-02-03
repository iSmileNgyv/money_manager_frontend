import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Step } from '../components/form-builder/form-builder.component';

@Injectable({ providedIn: 'root' })
export class StateService {
  private createStepsSubject: BehaviorSubject<Step[]> = new BehaviorSubject<Step[]>([]);
  private editStepsSubject: BehaviorSubject<Step[]> = new BehaviorSubject<Step[]>([]);
  private formDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private createDtoSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private editDtoSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private filterDtoSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private filterStepsSubject: BehaviorSubject<Step[]> = new BehaviorSubject<Step[]>([]);

  createSteps$: Observable<Step[]> = this.createStepsSubject.asObservable();
  editSteps$: Observable<Step[]> = this.editStepsSubject.asObservable();
  formData$: Observable<any> = this.formDataSubject.asObservable();
  createDto$: Observable<any> = this.createDtoSubject.asObservable();
  editDto$: Observable<any> = this.editDtoSubject.asObservable();
  filterDto$: Observable<any> = this.filterDtoSubject.asObservable();
  filterSteps$: Observable<Step[]> = this.filterStepsSubject.asObservable();

  updateCreateSteps(newSteps: Step[]): void {
    this.createStepsSubject.next(newSteps);
  }

  updateEditSteps(newSteps: Step[]): void {
    this.editStepsSubject.next(newSteps);
  }

  updateFormData(newFormData: any): void {
    this.formDataSubject.next(newFormData);
  }

  updateCreateDto(newDto: any): void {
    this.createDtoSubject.next(newDto);
  }

  updateEditDto(newDto: any): void {
    this.editDtoSubject.next(newDto);
  }

  updateFilterDto(newDto: any): void {
    this.filterDtoSubject.next(newDto);
  }

  updateFilterSteps(newFilterSteps: Step[]): void {
    this.filterStepsSubject.next(newFilterSteps);
  }
}
