import { Component, OnInit } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { CommonService } from 'fccore2/common/common';
import SysdepartmentBusiness from '../../../business/sysdepartment.business';
@Component({
  selector: 'sysdepartmentedit',
  templateUrl: './sysdepartmentedit.component.html',
  styles: [`
 
  `]
})
export class SysdepartmenteditComponent extends ParentEditComponent {
  checkOptions: any[] = [];
  constructor() {
    super("SYSTEM", "SYSDEPARTMENT");
  }
  /**
   * 初始化
   */
  init() {
    SysdepartmentBusiness.getDataByAppID_Col_Val("SYSDEPARTMENT", "ID", this.routerParam.ID).subscribe((result) => {
      if (result.CODE === '0' && result.DATA.length > 0) {
        this.mainObj = result.DATA[0];

        //成立日期转成date格式
        // this.sestDate = CommonService.stringToDate(this.mainObj.SEST_DATE);
        this.mainObj.SEST_DATE = CommonService.stringToDate(this.mainObj.SEST_DATE);
        //生效日期转成date格式
        // this.sbeginDate = CommonService.stringToDate(this.mainObj.SBEGIN_DATE);
        this.mainObj.SBEGIN_DATE = CommonService.stringToDate(this.mainObj.SBEGIN_DATE);
        //注销日期转成date格式
        // this.sendDate = CommonService.stringToDate(this.mainObj.SEND_DATE);
        this.mainObj.SEND_DATE = CommonService.stringToDate(this.mainObj.SEND_DATE);
      }
    });
  }
  /**
* 事件
* @param eventName 事件名
* @param param 返回参数
*/
  pageEvent(eventName: string): void {
    switch (eventName) {
      case 'BASE':
        //保存基本信息
        this.saveBaseInfo();
        break;
      case 'principal':
        //保存负责人信息
        this.principal();
        break;
    }
  }
  /**
* 保存基本信息
*/
  saveBaseInfo() {
    this.mainObj.SMODIFIER = SysdepartmentBusiness.userService.getUserInfo().USERCODE;//创建人
    this.mainObj.SMODIFY_TIME = CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd');//创建时间
    SysdepartmentBusiness.saveOrUpdateDepartment(this.mainObj, "")
      .subscribe(result => {
        if (result[0].CODE === '0') {
          SysdepartmentBusiness.msgService.message('保存成功');
          // this.cardBack(action);
        } else {
          SysdepartmentBusiness.msgService.error("保存失败," + result[0].MSG + ',' + result[1].MSG);
        }
      })
  }
  /**
   * 保存负责人信息
   */
  principal() {
    this.mainObj.SMODIFIER = SysdepartmentBusiness.userService.getUserInfo().USERCODE;//创建人
    this.mainObj.SMODIFY_TIME = CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd');//创建时间
    SysdepartmentBusiness.saveOrUpdateExtendDepartment("SYSFDEPARTMENT", this.mainObj)
      .subscribe(result => {
        if (result[0].CODE === '0') {
          SysdepartmentBusiness.msgService.message('保存成功');
        } else {
          SysdepartmentBusiness.msgService.error("保存失败," + result[0].MSG + ',' + result[1].MSG);
        }
      })
  }
/**
 * 新增
 * @param mainObj 
 */
addNew(mainObj: any): boolean {
  return true;
}
/**
 * 事件
 * @param eventName 事件名
 * @param param 返回参数
 */
event(eventName: string, param: any): void {

}
/**
 * 保存前验证
 */
beforeSave(): boolean {
  return true;
}
}
