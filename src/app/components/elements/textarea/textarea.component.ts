import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-textarea',
  imports: [
    NgIf
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  @Input('class') class: string = 'form-control';
  @Input('name') name!: string;
  @Input('value') value: string = "";
  @Input('placeholder') placeholder: string = "";
  @Input('disabled') disabled: boolean = false;
  @Input('required') required: boolean = false;
  @Input('readonly') readonly: boolean = false;
  @Input('icon') icon?: string;
  @Input('iconPosition') iconPosition: string = 'right';
  @Input('label') label?: string;
  @Input('id') id?: string = this.name;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  handleValueChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.valueChange.emit(target.value || '');
  }
}
