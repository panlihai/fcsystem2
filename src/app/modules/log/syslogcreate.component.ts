import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'syslogcreatelist',
  templateUrl: './syslogcreate.component.html',
  styles: [`
  `]
})
export class SyslogcreateComponent extends ParentlistComponent {
  fcListdataOptions:any;
  constructor(){
    super('SYSTEM', 'SYSLOGCREATE');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}