import { Component } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SyscompanyBusiness } from '../../../business/syscompany.business';
import SystemBusiness from 'fccore2/classes/system.business';
import { CommonService } from 'fccore2/common/common';
@Component({
    selector: 'syscompanyedit',
    templateUrl: './syscompanyedit.component.html',
    styles: [``]
})
export class SyscompanyeditComponent extends ParentEditComponent {
    levelCondition: string;
    cityConditon:string="";
    constructor() {
        super(SyscompanyBusiness.pid, SyscompanyBusiness.appId);
    }
    init(): void {
        let lCondition = { WHERE: "{DICID:{eq:'SYSCOMPANYILEVEL'}}" };
        this.levelCondition = JSON.stringify(lCondition);
        this.mainObj.SCREATE_TIME = new Date();
    }
    addNew(mainObj: any): boolean {
        return true;
    }
    event(eventName: string, param: any): void {
        switch (eventName) {
            case 'provinceChange':
                let lCondition = {"ORDER":"SORT", WHERE: "{PARENT:{eq:'"+param+"'}}" };
                this.cityConditon = JSON.stringify(lCondition); 
                break;
        }
    }

}