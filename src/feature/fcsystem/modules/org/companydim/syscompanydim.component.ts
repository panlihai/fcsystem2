import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import { SyscompanydimBusiness } from '../../../business/syscompanydim.business';
@Component({
  selector: 'syscompanydim',
  templateUrl: './syscompanydim.component.html',
  styles: [`
  
  `]
})
export class SyscompanydimComponent extends ParentlistComponent {
  constructor(){
    super(SyscompanydimBusiness.pid, SyscompanydimBusiness.appId);
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