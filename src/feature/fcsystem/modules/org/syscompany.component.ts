import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'syscompany',
  templateUrl: './syscompany.component.html',
  styles: [`
  `]
})
export class SyscompanyComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSCOMPANY');
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