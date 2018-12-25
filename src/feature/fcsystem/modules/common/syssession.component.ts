import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'syssessionlist',
  templateUrl: './syssession.component.html',
  styles: [`
  `]
})
export class SyssessionComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSSESSION');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}