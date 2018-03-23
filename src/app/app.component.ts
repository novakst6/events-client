import { Component, ViewContainerRef } from '@angular/core';
import { NotificationService } from './event/service/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(    
    private _notification: NotificationService,
    private _vcr: ViewContainerRef
  ){
    this._notification.init(_vcr)
  }

}
