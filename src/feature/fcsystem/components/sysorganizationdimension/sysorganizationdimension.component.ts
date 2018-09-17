import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
    selector: 'sysorganizationdimension',
    templateUrl: './sysorganizationdimension.component.html',
    styles: [`
  `]
})
export class SysorganizationdimensionComponent extends ParentlistComponent {
    constructor() {
        super("SYSTEM", "SYSCOMPANYDIM");
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
