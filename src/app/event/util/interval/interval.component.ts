import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { offset } from '../util';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DlDateTimePickerComponent } from 'angular-bootstrap-datetimepicker';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.sass']
})
export class IntervalComponent implements OnInit {

  private _dtpFrom: DlDateTimePickerComponent<Date>
  private _dtpTo: DlDateTimePickerComponent<Date>
  private _dptFromSubs: any
  private _dptToSubs: any

  @ViewChild('datetimeFromIP') set datetimeFrom(ref: DlDateTimePickerComponent<Date>) { 
    if(!ref) {
      return 
    }
    this._dtpFrom = ref
    this._dptFromSubs = ref.change.subscribe(v => {
      console.log(v.value) 
      this.dateFrom = v.value
      this.checkInterval()
    })
  }
  @ViewChild('datetimeToIP') set datetimeTo(ref: DlDateTimePickerComponent<Date>) { 
    if(!ref) {
      console.log('datetimeTo '+ref) 
      return 
    }
    this._dtpTo = ref
    this._dptToSubs = ref.change.subscribe(v => {
      console.log(v.value) 
      this.dateTo = v.value
      this.checkInterval()
    })
  }

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  public dateFrom: Date
  public dateTo: Date
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

  constructor() {
    this.dateFrom = new Date()
    this.dateTo = offset(this.dateFrom, 24)
  }

  update(){
    this.valueChange.emit([this.dateFrom, this.dateTo]);
    this.close()
  }

  clear(){
    this.valueChange.emit([]);
    this.close()
  }

  close(){
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnInit() {
  }

}
