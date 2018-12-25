import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysloglist',
  templateUrl: './syslog.component.html',
  styles: [`
  `]
})
export class SyslogComponent extends ParentlistComponent {
  fcListdataOptions:any;
  constructor(){
    super('SYSTEM', 'SYSLOG');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}