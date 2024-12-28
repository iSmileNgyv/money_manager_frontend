import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-card-footer-information',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './card-footer-information.component.html',
  styleUrl: './card-footer-information.component.scss'
})
export class CardFooterInformationComponent {
  convertDate(date: string): Date {
    return new Date(date);
  }

  @Input('model') model?: any;
}
