import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysdepartment',
  templateUrl: './sysdepartment.component.html',
  styles: [`
  `]
})
export class SysdepartmentComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSDEPARTMENT');
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