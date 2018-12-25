import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'syslogupdatelist',
  templateUrl: './syslogupdate.component.html',
  styles: [`
  `]
})
export class SyslogupdateComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSLOGUPDATE');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}