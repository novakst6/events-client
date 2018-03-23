import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { EventService } from '../service/event.service'
import { Router } from '@angular/router';
import { Event } from '../model/event';
import { EventFilter } from '../model/event.filter';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  @Input() 
  set pickerValue(value) {
    this.changeInterval(value)
  }

  @Input() 
  set deleteValue(value) {
    this.delete(this.eventToDelete.id)
  }

  @Input() 
  set createValue(value) {
    this.reset()
  }

  @Input() 
  set editValue(value) {
    this.reset()
  }

  events: any[] = []
  private _size: number = 5
  private _filter: EventFilter
  public page: number
  public total: number
  public totalPages: number
  public sortAttrs: string[] = ['FromDate' , 'ToDate', 'Created']
  public currentOfFuture: boolean = false
  public showIntervalPicker: boolean = false
  public intervalFromDate: Date
  public intervalToDate: Date
  public showDeleteDialog: boolean = false
  public eventToDelete: Event
  public showCreateForm: boolean = false
  public showEditForm: boolean = false
  public eventToEdit: Event

  constructor(private _events: EventService, private _router: Router) {
    this.page = 1;
    this._filter = new EventFilter()
    this._filter.sortAttribute = 'FromDate'
    this._filter.sortDirection = true
    this._filter.currentOrFuture = 'no'
  }

  openIntervalPicker(){
    this.showIntervalPicker = true
  }

  changeInterval(pickerValue){
    if(pickerValue.length > 1){
      this.intervalFromDate = pickerValue[0]
      this.intervalToDate = pickerValue[1]
      this._filter.fromDate = pickerValue[0]
      this._filter.toDate = pickerValue[1]
    } else {
      delete this._filter.fromDate
      delete this._filter.toDate
    }
    this.reset()
  }

  reset(){
    this.page = 1
    this.getEventPage(this.page)
  }

  isAsc(){
    return this._filter.sortDirection
  }

  isSort(sort: string){
    return this._filter.sortAttribute == sort
  }

  setSort(sort: string){
    if(this.isSort(sort)){
      this._filter.sortDirection = !this._filter.sortDirection
    } else {
      this._filter.sortAttribute = sort
    }
    this.reset()
  }

  toggleCurrentOrFuture(){
    if(this.currentOfFuture){
      this.currentOfFuture = false
      this._filter.currentOrFuture = 'no'
    } else {
      this.currentOfFuture = true
      this._filter.currentOrFuture = 'yes'
    }
    this.reset()
  }

  ngOnInit() {
    this.getAllEvents()
  }

  getPrevPage(){
    if(!this.hasPrev()){
      this.page -= 1
      this.getEventPage(this.page)
    }  
  }

  hasNext(){
    return !(this.page < this.totalPages)
  }

  hasPrev(){
    return !(this.page > 1)
  }

  getNextPage(){
    if(!this.hasNext()){ 
      this.page += 1
      this.getEventPage(this.page)
    }  
  }

  getEventPage(page: number){
    this._events.getPage(page, this._size, this._filter).subscribe(response => {
      this.events = response.list
      this.total = response.count
      this.totalPages = response.totalPages
    }, error => {
      console.log('error')
    });
  }

  getAllEvents() {
    this.getEventPage(this.page)
  }

  editAction(event){
    this.eventToEdit = event
    this.showEditForm = true
  }

  createAction(){
    this.showCreateForm = true
  }

  deleteAction(event){
    this.eventToDelete = event
    this.showDeleteDialog = true;
  }

  delete(id: string){
    this.eventToDelete = null
    this._events.delete(id).subscribe(response => {
      console.log('Delete success')
      this.getAllEvents()
    }, error => {
      console.log('Delete success')
      this.getAllEvents()
    })
  }

  categoryEvent(event: Event): string{
    if(new Date(event.toDate).getTime() < Date.now()){
      return 'event-past';
    }
    if(new Date(event.fromDate).getTime() <= Date.now() && Date.now() <= new Date(event.toDate).getTime()){
      return 'event-now';
    }
    if(Date.now() < new Date(event.fromDate).getTime()){
      return 'event-future';
    }
  }

}
