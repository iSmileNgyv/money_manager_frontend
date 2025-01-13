import { Component } from '@angular/core';
import {ImageLibraryComponent} from '../../shared/image-library/image-library.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-image',
  imports: [
    ImageLibraryComponent,
    RouterLink
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {

}
