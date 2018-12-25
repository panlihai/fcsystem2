import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysversionlist',
  templateUrl: './sysversion.component.html',
  styles: [`
  `]
})
export class SysversionComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSVERSION');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}