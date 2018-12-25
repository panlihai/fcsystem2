import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'systelsmslist',
  templateUrl: './systelsms.component.html',
  styles: [`
  `]
})
export class SystelsmsComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSTELSMS');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}