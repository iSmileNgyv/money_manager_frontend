import {AfterViewInit, Component, Input, OnInit, Renderer2} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ErrorService} from "../../services/error.service";
import {CdkDrag, CdkDragHandle} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-error-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CdkDrag,
    CdkDragHandle
  ],
  templateUrl: './error-list.component.html',
  styleUrl: './error-list.component.scss'
})
export class ErrorListComponent implements OnInit, AfterViewInit{
  constructor(
    private readonly errorService: ErrorService,
    private renderer: Renderer2
  ) {
  }
  @Input() errors: { message: string, isResolved: boolean }[] = [];
  collapsed = false;
  visible: boolean = false;
  position: {x: number, y: number} = { x: 0, y: 0 };

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  close() {
    this.errorService.clearErrors();
    this.visible = false;
    sessionStorage.removeItem('errorListPosition');
    this.position = {x: 0, y: 0};
  }

  clearErrors() {
    this.errors = [];
  }

  toggleResolved(index: number) {
    this.errors[index].isResolved = !this.errors[index].isResolved;
  }

  onDragEnded(event: any) {
    this.position = event.source.getFreeDragPosition();
    sessionStorage.setItem('errorListPosition', JSON.stringify(this.position));
  }

  private restorePosition() {
    const savedPosition = sessionStorage.getItem('errorListPosition');
    if (savedPosition) {
      this.position = JSON.parse(savedPosition);
    }
  }

  removeError(index: number) {
    this.errors.splice(index, 1);
  }

  ngOnInit() {
    this.errorService.errors$.subscribe(errors => {
      this.errors = errors.map(error => ({ message: error, isResolved: false }));
      this.visible = errors.length > 0;
    });
  }

  ngAfterViewInit() {
    if (this.visible) {
      this.restorePosition();
    }
  }
}
