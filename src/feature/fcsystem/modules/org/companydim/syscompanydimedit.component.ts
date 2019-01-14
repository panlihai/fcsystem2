import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FCEVENT } from 'fccomponent2/fc';
import { ParentEditComponent } from 'fccomponent2';
import { SyscompanydimBusiness } from '../../../business/syscompanydim.business';
import SystemBusiness from 'fccore2/classes/system.business';
@Component({
    selector: 'syscompanydimedit',
    templateUrl: './syscompanydimedit.component.html',
    styles: [``]
})
export class SyscompanydimeditComponent extends ParentEditComponent {
    constructor(){
        super(SyscompanydimBusiness.pid, SyscompanydimBusiness.appId);
  
    }
    init(): void {

    }
    addNew(mainObj: any): boolean {
        return true;
    }
    event(eventName: string, param: any): void {
        switch(eventName){
            case "saveObj":
                this.saveObj(param);
            break;

          }
    }
    /**
     * 完成维度的保存
     * @param param 事件参数
     */
    saveObj(param){
        SyscompanydimBusiness.saveObj(this.mainObj).subscribe(result=>{
            if(result.CODE==='0'){
                //
            }else{
                SystemBusiness.msgService.error(result.MSG);
            }
        });
    }

}