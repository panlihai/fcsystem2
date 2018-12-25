import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'syscontactlist',
  templateUrl: './syscontact.component.html',
  styles: [`
  `]
})
export class SyscontactComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSCONTACT');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}