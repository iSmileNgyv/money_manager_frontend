import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'element-select',
  imports: [NgForOf, NgIf],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  private defaults: {
    class: string;
    disabled: boolean;
    iconPosition: string;
  } = {
    class: 'form-control',
    disabled: false,
    iconPosition: 'right',
  };

  @Input('class') class: string = this.defaults.class;
  @Input('name') name?: string = '';
  @Input('id') id?: string = this.name;
  @Input('disabled') disabled: boolean = this.defaults.disabled;
  @Input('options') options: { value: string; text: string }[] = [];
  @Input('label') label?: string;
  @Input('value') value?: string;
  @Input('icon') icon?: string;
  @Input('iconPosition') iconPosition: string = this.defaults.iconPosition;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  handleValueChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.valueChange.emit(target.value || '');
  }
}
