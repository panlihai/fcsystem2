import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
  selector: 'sysreslibthumbnaillist',
  templateUrl: './sysreslibthumbnail.component.html',
  styles: [`
  `]
})
export class SysreslibthumbnailComponent extends ParentlistComponent {
  constructor(){
    super('SYSTEM', 'SYSRESLIBTHUMBNAIL');
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}