import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysdiclist',
  templateUrl: './sysdic.component.html',
  styles: [`
  `]
})
export class SysdicComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSDIC');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}