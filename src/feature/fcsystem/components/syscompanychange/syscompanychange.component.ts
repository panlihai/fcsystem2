import { ParentlistComponent,} from 'fccomponent2';
import { Component } from '@angular/core';
@Component({
    selector: 'syscompanychange',
    templateUrl: './syscompanychange.component.html',
    styles: [`
    :host ::ng-deep .treesearch-width .fc-date-default{
        width:100%;
    }
    :host ::ng-deep  .ant-calendar-picker{
        width:100%;
    }
  `]
})
export class SyscompanychangeComponent extends ParentlistComponent {
    init(): void {
    }    getDefaultQuery() {
    }
    event(eventName: string, context: any): void {
    }
    constructor() {
        super("SYSTEM", "SYSCOMPANY");
    }
 
}
