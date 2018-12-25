import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysbackcodelist',
  templateUrl: './sysbackcode.component.html',
  styles: [`
  `]
})
export class SysbackcodeComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSBACKCODE');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}