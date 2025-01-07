import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ErrorService} from "../../services/error.service";
import {CdkDrag} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-error-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CdkDrag
  ],
  templateUrl: './error-list.component.html',
  styleUrl: './error-list.component.scss'
})
export class ErrorListComponent implements OnInit, AfterViewInit{
  constructor(
    private readonly errorService: ErrorService
  ) {
  }
  @Input() errors: { message: string, isResolved: boolean }[] = [];
  collapsed: boolean = false;
  visible: boolean = false;
  position: {x: number, y: number} = { x: 0, y: 0 };

  close(): void {
    this.errorService.clearErrors();
    this.visible = false;
    sessionStorage.removeItem('errorListPosition');
    this.position = {x: 0, y: 0};
  }

  toggleResolved(index: number): void {
    this.errors[index].isResolved = !this.errors[index].isResolved;
  }

  onDragEnded(event: any): void {
    this.position = event.source.getFreeDragPosition();
    sessionStorage.setItem('errorListPosition', JSON.stringify(this.position));
  }

  private restorePosition(): void {
    const savedPosition: string | null = sessionStorage.getItem('errorListPosition');
    if (savedPosition) {
      this.position = JSON.parse(savedPosition);
    }
  }

  removeError(index: number) {
    this.errors.splice(index, 1);
  }

  ngOnInit(): void {
    this.errorService.errors$.subscribe(errors => {
      this.errors = errors.map(error => ({ message: error, isResolved: false }));
      this.visible = errors.length > 0;
    });
  }

  ngAfterViewInit(): void {
    if (this.visible) {
      this.restorePosition();
    }
  }
}
