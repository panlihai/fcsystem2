import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'syslogremovelist',
  templateUrl: './syslogremove.component.html',
  styles: [`
  `]
})
export class SyslogremoveComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSLOGREMOVE');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}