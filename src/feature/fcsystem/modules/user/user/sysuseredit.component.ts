import { Component } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SysuserBusiness } from '../../../business/sysuser.business';
@Component({
  selector: 'sysuseredit',
  templateUrl: './sysuseredit.component.html',
  styles: [`
  `]
})
export class SysusereditComponent extends ParentEditComponent {
  addNew(mainObj: any): boolean {
    return true;
  }
  constructor(){
    super(SysuserBusiness.pid, SysuserBusiness.appId);
  }
  init(): void {
  }
  getDefaultQuery():any { 
    return {};
  }
event(eventName: string, param: any): void {
    switch (eventName) {
    }
}

}