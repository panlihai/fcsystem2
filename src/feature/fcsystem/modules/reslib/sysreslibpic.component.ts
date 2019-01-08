import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysreslibpiclist',
  templateUrl: './sysreslibpic.component.html',
  styles: [`
  `]
})
export class SysreslibpicComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSRESLIBPIC');
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