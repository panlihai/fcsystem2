import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysassignmentlist',
  templateUrl: './sysassignment.component.html',
  styles: [`
  `]
})
export class SysassignmentComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSASSIGNMENT');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}