import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'element-checkbox',
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements OnInit{
  @Input('name') name!: string;
  @Input('id') id?: string;
  @Input('label') label?: string;
  @Input('checked') checked: boolean = false;
  @Input('disabled') disabled: boolean = false;
  @Input('class') class: string = "";
  @Input('style') style: string = "";
  @Input('value') value: string = "";
  @Input('required') required: boolean = false;
  @Input('toggle') toggle: boolean = true;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked: boolean = target.checked;
    this.value = isChecked ? 'true' : 'false';
    this.valueChange.emit(this.value);
  }

  get controlClasses(): string {
    return this.toggle
      ? 'custom-control custom-switch custom-switch-off-danger custom-switch-on-success'
      : 'custom-control custom-checkbox';
  }

  ngOnInit(): void {
    this.checked = this.value === 'true';
    if (!this.id && this.name) {
      this.id = this.name;
    }
  }


}
