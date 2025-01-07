import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'element-select',
  imports: [NgForOf, NgIf],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnInit{
  private defaults: {
    class: string;
    disabled: boolean;
    iconPosition: string;
    placeholder: string
  } = {
    class: 'form-control',
    disabled: false,
    iconPosition: 'right',
    placeholder: 'Birini seçin'
  };

  @Input('class') class: string = this.defaults.class;
  @Input('name') name!: string;
  @Input('id') id?: string;
  @Input('disabled') disabled: boolean = this.defaults.disabled;
  @Input('options') options: { value: string; text: string }[] = [];
  @Input('label') label?: string;
  @Input('value') value?: string;
  @Input('icon') icon?: string;
  @Input('multiple') multiple: boolean = false;
  @Input('iconPosition') iconPosition: string = this.defaults.iconPosition;
  @Input('placeholder') placeholder: string = this.defaults.placeholder;
  @Output() valueChange: EventEmitter<string | string[]> = new EventEmitter<string | string[]>();
  ngOnInit(): void {
    if (!this.id && this.name) {
      this.id = this.name;
    }
  }

  get dynamicClass(): string {
    return this.multiple ? 'select2bs4' : this.class;
  }

  handleValueChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (this.multiple) {
      const selectedValues: string[] = Array.from(target.selectedOptions).map(option => option.value);
      this.valueChange.emit(selectedValues);
    } else {
      this.valueChange.emit(target.value || '');
    }
  }
}
