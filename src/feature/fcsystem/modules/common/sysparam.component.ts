import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysparamlist',
  templateUrl: './sysparam.component.html',
  styles: [`
  `]
})
export class SysparamComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSPARAM');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}