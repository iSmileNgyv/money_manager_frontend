import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgIf} from '@angular/common';
import {ImageLibraryComponent} from '../../shared/image-library/image-library.component';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {LanguageService} from '../../../services/language.service';
import {TranslatePipe} from '@ngx-translate/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-selected-image',
  imports: [
    NgIf,
    ImageLibraryComponent,
    CdkDrag,
    CdkDragHandle,
    TranslatePipe
  ],
  templateUrl: './selected-image.component.html',
  styleUrl: './selected-image.component.scss'
})
export class SelectedImageComponent implements OnChanges, OnInit{
  @Input() value?: string;
  @Input() imagePath: string | null = null;
  @Input() fullPath: string | null = null;
  @Output() imageSelected: EventEmitter<{path: string, fullPath: string}> = new EventEmitter<{path: string, fullPath: string}>();
  protected imageProperties = environment.framework.imageProperties;
  constructor(
    private readonly languageService: LanguageService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.languageService.loadCustomTranslations(this.languageService.getCurrentLanguage(), 'elements');
    if(this.imagePath == null) {
      this.imagePath = !this.value ? null : this.value;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imagePath'] || changes['fullPath']) {
      this.imagePath = changes['imagePath']?.currentValue || this.imagePath;
      this.fullPath = changes['fullPath']?.currentValue || this.fullPath;
    }
  }

  protected openModal(): void {
    const modalElement: HTMLElement | null = document.getElementById('imageLibraryModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      modalElement.removeAttribute('aria-hidden');
      modalElement.setAttribute('aria-modal', 'true');
      document.body.classList.add('modal-open');

      const backdrop: HTMLDivElement = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      backdrop.id = 'modal-backdrop';
      document.body.appendChild(backdrop);
    }
  }

  protected closeModal(): void {
    const modalElement: HTMLElement | null = document.getElementById('imageLibraryModal');
    const backdrop: HTMLElement | null = document.getElementById('modal-backdrop');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.removeAttribute('aria-modal');
      document.body.classList.remove('modal-open');
    }
    if (backdrop) {
      document.body.removeChild(backdrop);
    }
  }

  protected onImageSelect(selectedImageJson: string): void {
    const selectedImage: any = JSON.parse(selectedImageJson);
    this.imagePath = selectedImage[this.imageProperties.unique];
    this.fullPath = selectedImage[this.imageProperties.imgSrc];

    this.imageSelected.emit({
      path: selectedImage[this.imageProperties.unique],
      fullPath: selectedImage[this.imageProperties.imgSrc],
    });

    this.closeModal();
  }

  protected deleteImage(): void {
    this.imagePath = null;
    this.fullPath = null;
    this.imageSelected.emit({path: "", fullPath: ""});
  }
}
