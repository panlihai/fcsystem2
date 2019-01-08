import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysresliblist',
  templateUrl: './sysreslib.component.html',
  styles: [`
  `]
})
export class SysreslibComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSRESLIB');
  }
  init(): void {
    this.enableAutoSearch = false;
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}