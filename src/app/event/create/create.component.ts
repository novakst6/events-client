import { Component, OnInit, ContentChildren, QueryList, ViewChild, ContentChild, ViewChildren, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DlDateTimePickerComponent, DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';
import { EventService } from '../service/event.service'
import { Event } from '../model/event'
import { ValidTimeInterval } from '../validators/validators';
import { round, dateFromString, offset } from '../util/util'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit, OnDestroy {

  private _dtpFrom: DlDateTimePickerComponent<Date>
  private _dtpTo: DlDateTimePickerComponent<Date>
  private _dptFromSubs: any
  private _dptToSubs: any

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('datetimeFrom') set datetimeFrom(ref: DlDateTimePickerComponent<Date>) { 
    if(!ref) {
      console.log('datetimeFrom '+ref) 
      return 
    }
    this._dtpFrom = ref
    this._dptFromSubs = ref.change.subscribe(v => { 
      this.eForm.patchValue({'from': v.value.toLocaleString()});
      this.dateFrom = v.value
      this.checkInterval()
    })
  }
  @ViewChild('datetimeTo') set datetimeTo(ref: DlDateTimePickerComponent<Date>) { 
    if(!ref) {
      console.log('datetimeTo '+ref) 
      return 
    }
    this._dtpTo = ref
    this._dptToSubs = ref.change.subscribe(v => {
      console.log(this._dtpTo) 
      this.eForm.patchValue({'to': v.value.toLocaleString()});
      this.dateTo = v.value
      this.checkInterval()
    })
  }

  public eForm: FormGroup
  public dateTo: Date
  public dateFrom: Date
  private _model: Event
  private _time: Date
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
  
  constructor(private _formBuilder: FormBuilder, private _events: EventService, private _router: Router) {
    this._time = new Date()
    this.dateFrom = offset(new Date(), 0)
    this.dateTo = offset(new Date(), 1)
  }

  ngOnDestroy(): void {
    this._dptFromSubs.unsubscribe()
    this._dptToSubs.unsubscribe()
  }

  onSubmit(post){
    console.log(post)

    this._model = new Event()
    this._model.name = post.name
    this._model.fromDate = dateFromString(post.from)
    this._model.toDate = dateFromString(post.to)
    this._events.post(this._model).subscribe(response => {
      console.log('save success')
      this.saved()
    }, error => {
      console.log('save error')
      this.close()
    })
  }

  ngOnInit() {
    this.eForm = this._formBuilder.group({
      'name' : [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      'from' : [round(this._time, 0), Validators.compose([Validators.required])],
      'to' : [round(this._time, 1), Validators.compose([Validators.required])],
    })
  }

  saved() {
    this.eForm = this._formBuilder.group({
      'name' : [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      'from' : [round(this._time, 0), Validators.compose([Validators.required])],
      'to' : [round(this._time, 1), Validators.compose([Validators.required])],
    })
    this.valueChange.emit({saved: true})
    this.close()
  }

  close(){
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }



}
