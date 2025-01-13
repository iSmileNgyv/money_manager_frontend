import {Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {HttpClientService} from "../services/http-client.service";
import {AlertifyService, MessageType, Position} from "../services/alertify.service";
import {HttpErrorResponse} from "@angular/common/http";

@Directive({
  selector: '[appDelete]',
  standalone: true
})
export class DeleteDirective implements OnInit{
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly renderer: Renderer2,
    private readonly element: ElementRef,
    private readonly alertify: AlertifyService
  ) {}
  ngOnInit(): void {
    if(this.createButton) {
      const button: HTMLElement = document.createElement('button');
      const icon: HTMLElement = document.createElement('i');
      icon.setAttribute('class', 'fas fa-trash');
      button.setAttribute('class', this.buttonClass);
      this.renderer.appendChild(this.element.nativeElement, button);
      this.renderer.appendChild(button, icon);
      button.setAttribute('style', this.deleteStyle);
      this.renderer.listen(button, 'click', (event: Event): void => this.onClick(event));
    } else {
      this.renderer.listen(this.element.nativeElement, 'click', (event: Event): void => this.onClick(event));
    }
  }
  @Input('deleteStyle') deleteStyle: string = 'float: right;';
  @Input('buttonClass') buttonClass: string = 'btn btn-outline-danger';
  @Input('controller') controller!: string;
  @Input('body') body!: any;
  @Input('title') title: string = 'Silmə sorğusu';
  @Input('createButton') createButton?: boolean = true;
  @Input('message') message: string = 'Silmək istədiyinizdən əminsiniz?';
  @Output('successCallBack') successCallBack: EventEmitter<any> = new EventEmitter<any>();
  onClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.alertify.confirm(this.title, this.message, () => {
      this.httpClientService.delete({
        controller: this.controller
      }, this.body).subscribe(data => {
        this.alertify.message('Silindi', {
          dismissOthers: true,
          messageType: MessageType.Succcess,
          position: Position.BottomRight
        });
        this.successCallBack.emit();
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
      });
    });
  }
}
