import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysworkplanlist',
  templateUrl: './sysworkplan.component.html',
  styles: [`
  `]
})
export class SysworkplanComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSWORKPLAN');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}