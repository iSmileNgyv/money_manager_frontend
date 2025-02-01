import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {environment} from '../../../environments/environment';
import {Environment} from '@angular/cli/lib/config/workspace-schema';

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
  protected config = environment.framework;
  convertDate(date: string): Date {
    return new Date(date);
  }

  @Input('model') model?: any;
}
