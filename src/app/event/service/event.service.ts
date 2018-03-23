import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Event } from '../model/event'
import { environment } from "../../../environments/environment";
import { EventPage } from '../model/event.page';
import { EventFilter } from '../model/event.filter';

@Injectable()
export class EventService {

  constructor(private _http: HttpClient) { }

  public getAll<T>(): Observable<Event[]> {
    return this._http.get<Event[]>(environment.url.backend + environment.url.endpoints.events);
  }

  public getPage<T>(page: number, size: number, filter: EventFilter): Observable<EventPage> {
    var params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('filter', JSON.stringify(filter))
    return this._http.get<EventPage>(environment.url.backend + environment.url.endpoints.events + '/page', {params: params});
  }

  public get<T>(id: string): Observable<Event> {
    return this._http.get<Event>(environment.url.backend + environment.url.endpoints.events + '/' + id);
  }

  public post<T>(params: Event): Observable<any> {
    return this._http.post<any>(environment.url.backend + environment.url.endpoints.events, params);
  }

  public put<T>(id: string, params: Event): Observable<any> {
    return this._http.put<any>(environment.url.backend + environment.url.endpoints.events + '/' + id, params);
  }

  public delete<T>(id: string): Observable<any> {
    return this._http.delete<any>(environment.url.backend + environment.url.endpoints.events + '/' + id);
  }

}
