import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {
  constructor(private toastr: ToastrService) { }

  message(message: string, title: string, toastrOptions?: Partial<ToastrOptions>): void {
    toastrOptions = toastrOptions || new ToastrOptions();
    if(toastrOptions.messageType === undefined) {
      throw new Error('messageType is required');
    }
    (this.toastr as any)[toastrOptions.messageType](message, title, {
      positionClass: toastrOptions.position
    });
  }
}

export class ToastrOptions {
  messageType: ToastrMessageType = ToastrMessageType.Info;
  position: ToastrPosition = ToastrPosition.TopRight;
  constructor(messageType: ToastrMessageType = ToastrMessageType.Info, position: ToastrPosition = ToastrPosition.TopRight) {
    this.messageType = messageType;
    this.position = position;
  }
}

export enum ToastrMessageType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
}

export enum ToastrPosition {
  TopRight = 'toast-top-right',
  TopLeft = 'toast-top-left',
  BottomRight = 'toast-bottom-right',
  BottomLeft = 'toast-bottom-left',
  BottomFullWidth = 'toast-bottom-full-width',
  TopCenter = 'toast-top-center',
  BottomCenter = 'toast-bottom-center'
}
