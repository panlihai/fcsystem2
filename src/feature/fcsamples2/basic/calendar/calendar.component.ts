import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styles: [``]
})
export class CalendarComponent extends ComponentParent {
  listDataMap = {
    eight : [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' }
    ],
    ten   : [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' }
    ],
    eleven: [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event........' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' }
    ]
  }
   //基础js
   basicjs: string = `
   import { Component, OnInit } from '@angular/core';
   @Component({
     selector: 'calendar',
     templateUrl: './calendar.component.html',
     styleUrl:'./calendar.component.css'
   })
   export class CalendarComponent{
     }
   `
  constructor(public mainService: ComponentService) {
    super('FCCALENDAR', mainService);
  }
}