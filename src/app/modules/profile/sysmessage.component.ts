import { Component } from '@angular/core';
import { ParentlistComponent } from '../../../feature/fccomponent2';
@Component({
  selector: 'sysmessagelist',
  templateUrl: './sysmessage.component.html',
  styles: [`
  `]
})
export class SysmessageComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSMESSAGE');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {
  
  }


}