import { Component } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { CommonService } from 'fccore2/common/common';
import SystemBusiness from 'fccore2/classes/system.business';
import { SysdepartmentBusiness } from '../../../business/sysdepartment.business';
import { ObjStatus } from "fccore2/common/constant";


@Component({
    selector: 'sysdepartmentedit',
    templateUrl: './sysdepartmentedit.component.html',
    styles: [`
        
    `]
})
export class SysdepartmenteditComponent extends ParentEditComponent {
    addNew(mainObj: any): boolean {
        // throw new Error("Method not implemented.");
        return true
    }

    getDefaultQuery() {

    }
    constructor() {

        super(SysdepartmentBusiness.pid, SysdepartmentBusiness.appId);

    }
    init(): void {
        this.mainObj.BIS_VIRTUAL = "N";
        this.mainObj.ILEVEL = 3;
        this.mainObj.SCOMPANY_CODE = 666666;
        this.mainObj.SCREATE_TIME = new Date()
        this.mainObj.SCREATE_TIME = CommonService.dateFormat(this.mainObj.SCREATE_TIME, "yyyyMMdd");
        this.mainObj.SEST_DATE = new Date()
        this.mainObj.SEST_DATE = CommonService.dateFormat(this.mainObj.SEST_DATE, "yyyyMMdd");
    }

    event(eventName: string, param: any): void {

    }
    beforeSave(): boolean {
        if (this.mainObj.SBEGIN_DATE) {

            this.mainObj.SBEGIN_DATE = CommonService.dateFormat(this.mainObj.SBEGIN_DATE, "yyyy-MM-dd");

        }

        return true;

    }

    /**
* 保存返回
* @param action 事件名称
*/
    cardSaveBack(event): void {
        console.log(1)
        if (!this.validator()) {
            return;
        }
        if (this.beforeSave()) {
            let department: any = [];
            department[0]= this.mainObj;
            SysdepartmentBusiness.createDepartments(this.appId, department, 'SYSDEPARTMENT').subscribe(result => {
                if (result.CODE === '0') {
                    SystemBusiness.msgService.message('保存成功！');
                    this.afterSave();
                    this.objStatus = ObjStatus.SAVED;
                    // this.cardBack(action);
                }
                else {
                    SystemBusiness.msgService.message('保存失败！');
                }
            });
        }
    };

}