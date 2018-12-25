import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'syswizardlist',
  templateUrl: './syswizard.component.html',
  styles: [`
  `]
})
export class SyswizardComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSWIZARD');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}