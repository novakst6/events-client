import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';


import { AppRoutes } from './router-conf'

import { AppComponent } from './app.component';
import { ListComponent } from './event/list/list.component';
import { EditComponent } from './event/edit/edit.component';
import { CreateComponent } from './event/create/create.component';

import { EventService } from './event/service/event.service';
import { IntervalComponent } from './event/util/interval/interval.component';
import { DeleteComponent } from './event/util/delete/delete.component';
import { HttpInterceptorService } from './event/util/http-interceptor';
import { NotificationService, CustomOption } from './event/service/notification/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditComponent,
    CreateComponent,
    IntervalComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {useHash: true}),
    HttpClientModule,
    DlDateTimePickerDateModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot()
  ],
  providers: [
    EventService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpInterceptorService, 
      multi: true 
    },
    NotificationService,
    {
      provide: ToastOptions, 
      useClass: CustomOption
    }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
