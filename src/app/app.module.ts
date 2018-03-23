import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutes } from './router-conf'

import { AppComponent } from './app.component';
import { ListComponent } from './event/list/list.component';
import { EditComponent } from './event/edit/edit.component';
import { CreateComponent } from './event/create/create.component';

import { EventService } from './event/service/event.service';
import { IntervalComponent } from './event/util/interval/interval.component';
import { DeleteComponent } from './event/util/delete/delete.component';
import { HttpInterceptorService } from './event/util/http-interceptor';


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
    RouterModule.forRoot(AppRoutes, {useHash: true}),
    HttpClientModule,
    DlDateTimePickerDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EventService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpInterceptorService, 
      multi: true 
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
