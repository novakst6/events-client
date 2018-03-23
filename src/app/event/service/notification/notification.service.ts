import { Injectable, ViewContainerRef } from "@angular/core";
import {ToastOptions, ToastsManager} from 'ng2-toastr/ng2-toastr'

@Injectable()
export class NotificationService {

  constructor(
    private _toastr: ToastsManager
  ) { 
    
  }

  init(vcr: ViewContainerRef){
    this._toastr.setRootViewContainerRef(vcr)
  }

  public showMessage(message:string, title:string){
    this._toastr.custom(message, title)
  }

  public showInfo(message:string, title:string){
    this._toastr.info(message, title)
  }

  public showSuccess(message:string, title:string){
    this._toastr.success(message, title)
  }

  public showError(message:string, title:string){
    this._toastr.error(message, title)
  }

} 

export class CustomOption extends ToastOptions {
    animate = 'flyRight'
    newestOnTop = false
    positionClass = 'toast-top-right'
}