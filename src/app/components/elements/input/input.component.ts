import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'element-input',
  imports: [
    NgIf
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit, OnChanges{
  private readonly defaults: {
    type: string;
    class: string;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    iconPosition: string;
  } = {
    type: 'text',
    class: 'form-control',
    disabled: false,
    readonly: false,
    required: false,
    iconPosition: 'right',
  };
  @Input('type') type: string = this.defaults.type;
  @Input('placeholder') placeholder: string = '';
  @Input('class') class: string = this.defaults.class;
  @Input('value') value: string = '';
  @Input('name') name!: string;
  @Input('id') id?: string;
  @Input('disabled') disabled: boolean = this.defaults.disabled;
  @Input('readonly') readonly: boolean = this.defaults.readonly;
  @Input('required') required: boolean = this.defaults.required;
  @Input('icon') icon?: string;
  @Input('iconPosition') iconPosition: string = this.defaults.iconPosition;
  @Input('label') label?: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    if (!this.id && this.name) {
      this.id = this.name;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['value'] && !changes['value'].isFirstChange()) {
      this.valueChange.emit(this.value);
    }
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value || '');
  }
}
