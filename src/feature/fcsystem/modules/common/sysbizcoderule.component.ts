import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysbizcoderulelist',
  templateUrl: './sysbizcoderule.component.html',
  styles: [`
  `]
})
export class SysbizcoderuleComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSBIZCODERULE');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}