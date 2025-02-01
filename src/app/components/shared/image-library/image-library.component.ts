import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {NgForOf, NgIf} from '@angular/common';
import {CustomToastrService, ToastrMessageType, ToastrPosition} from '../../../services/custom-toastr.service';
import {HttpClientService} from '../../../services/http-client.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DeleteDirective} from '../../../directives/delete.directive';
import {CdkCopyToClipboard} from '@angular/cdk/clipboard';
import {firstValueFrom} from 'rxjs';
import {LanguageService} from '../../../services/language.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../environments/environment';
@Component({
  selector: 'app-image-library',
  imports: [
    NgxDropzoneModule,
    NgForOf,
    DeleteDirective,
    CdkCopyToClipboard,
    NgIf
  ],
  templateUrl: './image-library.component.html',
  styleUrl: './image-library.component.scss'
})
export class ImageLibraryComponent implements OnInit{
  @Input() canSelect: boolean = false;
  @Input() label!: string;
  @Output() imageSelected: EventEmitter<string> = new EventEmitter<string>();
  protected files: File[] = [];
  protected images: any;
  protected mediasController: string = environment.framework.controllers.media;
  protected imageProperties = environment.framework.imageProperties;

  constructor(
    private readonly toastr: CustomToastrService,
    private readonly httpClientService: HttpClientService,
    private readonly languageService: LanguageService,
    private readonly translate: TranslateService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.languageService.loadCustomTranslations(this.languageService.getCurrentLanguage(), 'image-library');
    if(!this.label)
      this.label = this.translate.instant('IMAGE_LIBRARY.UPLOAD_IMAGES');
    this.images = await this.getAll();
  }

  protected copyMessage(): void {
    this.toastr.message(this.translate.instant('IMAGE_LIBRARY.COPIED'), "", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }

  protected onRemove(file: File): void {
    this.files = this.files.filter(f => f !== file);
  }

  protected uploadFiles(): void {
    const formData = new FormData();
    this.files.forEach((file, index) => {
      formData.append('files', file, file.name);
    });
    this.httpClientService.post({
      controller: this.mediasController
    }, formData).subscribe({
      next: (response) => {
        console.log(response);
        this.files = [];
        this.handleSuccess().then();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  async handleSuccess(): Promise<void> {
    this.images = await this.getAll();

  }

  private async getAll() {
    try {
      const images = await firstValueFrom(this.httpClientService.get({
        controller: this.mediasController,
      }));
      if (!images) {
        return undefined;
      }
      return images;
    } catch (error) {
      console.error("Error fetching images:", error);
      return undefined;
    }
  }

  protected onSelect(event: any): void {
    this.files.push(...event.addedFiles);
  }

  protected onSelectImage(image: any): void {
    const selectedImage = {
      [this.imageProperties.unique]: image[this.imageProperties.unique],
      [this.imageProperties.imgSrc]: image[this.imageProperties.imgSrc]
    };
    this.imageSelected.emit(JSON.stringify(selectedImage));
  }

  protected readonly environment = environment;
}
