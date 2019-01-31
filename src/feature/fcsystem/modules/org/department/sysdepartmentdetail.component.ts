import { Component } from '@angular/core';  
import { SyscompanydimBusiness } from '../../../business/syscompanydim.business'; 
import { ParentDetailComponent } from 'fccomponent2';
@Component({
    selector: 'sysdepartmentdetail',
    templateUrl: './sysdepartmentdetail.component.html',
    styles: [``]
})
export class SysdepartmenteditComponent extends ParentDetailComponent {
    constructor(){
        super(SyscompanydimBusiness.pid, SyscompanydimBusiness.appId);
  
    }
    init(): void {

    }
    addNew(mainObj: any): boolean {
        return true;
    }
    event(eventName: string, param: any): void {
       
    } 
}