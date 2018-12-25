import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysregionlist',
  templateUrl: './sysregion.component.html',
  styles: [`
  `]
})
export class SysregionComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSREGION');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}