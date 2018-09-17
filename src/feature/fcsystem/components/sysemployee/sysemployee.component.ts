import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
    selector: 'sysemployee',
    templateUrl: './sysemployee.component.html',
    styles: [`
    .employeemanagement .list-search{
        border-bottom:none;
    }
  `]
})
export class SysemployeeComponent extends ParentlistComponent {
    constructor() {
        super("SYSTEM", "SYSEMPLOYEE");
    }
    init(): void {
        
    }
    /**
     * 默认查询
     */
    getDefaultQuery() {

    }
    event(eventName: string, context: any): void {

    }
}
