import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysiconlist',
  templateUrl: './sysicon.component.html',
  styles: [`
  `]
})
export class SysiconComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSICON');
  }
  init(): void {
    this.enableAutoSearch =  false;

  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}