import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event.service';
import { Event } from '../model/event';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidTimeInterval } from '../validators/validators';
import { Subject } from 'rxjs/Subject';
import { DlDateTimePickerComponent } from 'angular-bootstrap-datetimepicker';
import { dateFromString } from '../util/util';
import { NotificationService } from '../service/notification/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit, OnDestroy {

  private _dtpFrom: DlDateTimePickerComponent<Date>
  private _dtpTo: DlDateTimePickerComponent<Date>
  private _dptFromSubs: any
  private _dptToSubs: any

  @ViewChild('datetimeFromEdit') set datetimeFrom(ref: DlDateTimePickerComponent<Date>) { 
    if(!ref) {
      return 
    }
    this._dtpFrom = ref
    this._dptFromSubs = ref.change.subscribe(v => { 
      this.eForm.patchValue({'from': v.value.toLocaleString()})
      this.dateFrom = v.value
      this.checkInterval()
    })
  }
  @ViewChild('datetimeToEdit') set datetimeTo(ref: DlDateTimePickerComponent<Date>) {
    if(!ref) {
      return 
    } 
    this._dtpTo = ref
    this._dptToSubs = ref.change.subscribe(v => {
      console.log(this._dtpTo) 
      this.eForm.patchValue({'to': v.value.toLocaleString()})
      this.dateTo = v.value
      this.checkInterval()
    })
  }

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() event: any;

  private _paramsSub: any
  private _id: string
  private _model: Event
  private _subject: Subject<Event>

  public eForm: FormGroup
  public dateTo: Date
  public dateFrom: Date
  public warn: boolean = false

  checkInterval(){
    if(this.dateFrom && this.dateTo){
      if(this.dateFrom.getTime() <= this.dateTo.getTime()){
        this.warn = false
      } else {
        this.warn = true 
      }
    } else {
      this.warn = true
    }
  }
  

  ngOnDestroy(): void {
    this._paramsSub.unsubscribe()
    this._dptFromSubs.unsubscribe()
    this._dptToSubs.unsubscribe()
  }
  constructor(
    private _router: Router, 
    private _activtedRoute: ActivatedRoute,
    private _events: EventService,
    private _formBuilder: FormBuilder,
    private _notifications: NotificationService
  ) { 
    this._subject = new Subject()
  }

  private loadModel(){
    this._events.get(this._id).subscribe(response => {
        console.log('Edit load success')
        this._model = response
        this._subject.next(this._model)
    }, error => {
        console.log('Edit load error')
        this._notifications.showError("Unable to load event","Error")
        this.close()
    })
  }

  ngOnInit() {
    this._paramsSub = this._activtedRoute.params.subscribe(params => {
      this._id = this.event.id
      this.loadModel()
    })
    this._subject.subscribe(event => {
      this.dateTo = new Date(event.toDate)
      this.dateFrom = new Date(event.fromDate)
      this.eForm = this._formBuilder.group({
        'id'      : [event.id, Validators.required],
        'name'    : [event.name, Validators.compose([Validators.required, Validators.maxLength(50)])],
        'from'    : [new Date(event.fromDate).toLocaleString(), Validators.compose([Validators.required])],
        'to'      : [new Date(event.toDate).toLocaleString(), Validators.compose([Validators.required])],
        'created' : [new Date(event.created).toLocaleString(), Validators.required]
      })
    })
  }

  onSubmit(post){
    this._model = new Event()
    this._model.id = post.id
    this._model.name = post.name
    this._model.fromDate = dateFromString(post.from)
    this._model.toDate = dateFromString(post.to)
    this._model.created = dateFromString(post.created)
    this._events.put(this._model.id, this._model).subscribe(response => {
      console.log('edit success')
      this._notifications.showSuccess("Event updated","Success")
      this.edited()
    }, error => {
      console.log('edit error')
      this._notifications.showError("Unable update event","Error")
      this.close()
    })
  }

  edited(){
    this.valueChange.emit({edited: true})
    this.close()
  }

  close(){
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
