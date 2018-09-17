import { Component} from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
@Component({
    selector: 'syscompanychangeaudit',
    template: `
    <fc-layoutpanel [fcFull]="true" class="templatelist">
        <fc-layoutrow fcSpan="50" fccontent>
            <fc-tlblist [fcAppid]="appId" fccontent1></fc-tlblist>
            <fc-layoutrow fccontent2 fcSpan="50">
                <form fccontent1 class="list-search" name="searchForm" #searchForm >
                </form>
                <fc-listdata fccontent2 [fcAppid]="appId" [fcOption]="fcListdataOptions"></fc-listdata>
            </fc-layoutrow>
        </fc-layoutrow>
    </fc-layoutpanel>
    `,
    styles: [`

  `]
})
export class SyscompanychangeauditComponent extends ParentlistComponent {
    constructor() {
        super("SYSTEM","SYSCOMPANY");
    }
    init(): void {
    }
    getDefaultQuery() {
    }
    event(eventName: string, context: any): void {
        switch (eventName) {
        }
    }
}
