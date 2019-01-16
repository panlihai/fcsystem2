import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FCEVENT } from 'fccomponent2/fc';
import { ParentEditComponent, FcadformOption } from 'fccomponent2';
import { SyscompanydimBusiness } from '../../../business/syscompanydim.business';
import { CommonService } from 'fccore2/common/common';
@Component({
    selector: 'syscompanydimedit',
    templateUrl: './syscompanydimedit.component.html',
    styles: [``]
})
export class SyscompanydimeditComponent extends ParentEditComponent {
    constructor() {
        super(SyscompanydimBusiness.pid, SyscompanydimBusiness.appId);
    }
    init(): void {
        this.mainObj.SDIM_CODE = CommonService.getTimestamp()+"";
        this.mainObj.SCREATOR =  this.userInfo.USERCODE;
        this.mainObj.SCREATE_TIME =  CommonService.getTimestamp();
    }

    beforeSave():boolean{
        if(this.mainObj.ID){
            this.mainObj.SMODIFIER =  this.userInfo.USERCODE;
            this.mainObj.SMODIFY_TIME =  CommonService.getTimestamp();
        }
        return true;
    }
    addNew(mainObj: any): boolean {
        return true;
    }
    event(eventName: string, param: any): void {
        switch (eventName) {
        }
    }
}
