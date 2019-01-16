import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import { SysuserBusiness } from '../../../business/sysuser.business';
@Component({
  selector: 'sysuserlist',
  templateUrl: './sysuser.component.html',
  styles: [`
  `]
})
export class SysuserComponent extends ParentlistComponent {
  constructor(){
    super(SysuserBusiness.pid, SysuserBusiness.appId);
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
  event(eventName: string, context: any): void {

  }


}