import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysuserlist',
  templateUrl: './sysuser.component.html',
  styles: [`
  `]
})
export class SysuserComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSUSER');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}