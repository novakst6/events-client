import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../../model/event';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() event: Event;
  constructor() { }

  ngOnInit() {
  }

  clear(){
    this.valueChange.emit({confirm: true});
    this.close()
  }

  close(){
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
