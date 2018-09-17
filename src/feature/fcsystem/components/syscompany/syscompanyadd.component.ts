import { Component, OnInit } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SyscompanyBusiness } from '../../business/syscompany.business';
import SystemBusiness from 'fccore2/classes/system.business';
@Component({
  selector: 'syscompanyadd',
  templateUrl: './syscompanyadd.component.html',
  styles: [`
 
  `]
})
export class SyscompanyaddComponent extends ParentEditComponent {
  //单位隶属关系
  syscompanyrelationObj: any = {};
  //父级编码
  parentCode: string;
  //维度编码
  dimCode: string;
  // 生效日期
  sbeginDate: Date;
  // 成立日期
  sestDate: Date;
  // 注销日期
  sendDate: Date;
  //单位隶属关系过滤
  companyrelationCondition: string;
  //单位隶属关系
  syscompanyrelationOption: any = {};
  constructor() {
    super("SYSTEM", "SYSCOMPANY");
  }
  init() {
    //初始化单位隶属关系字段
    this.syscompanyrelationObj = SyscompanyBusiness.getSyscompanyrelationField();
    //上级单位代码
    this.parentCode = this.routerParam.parentCode;
    //维度代码
    this.dimCode = this.routerParam.dimCode;
    //单位隶属关系过滤
    let relationCon: any = {
      WHERE: 'SDIM_CODE!=' + "'" + this.dimCode + "'"
    }
    //单位隶属关系过滤
    this.companyrelationCondition = JSON.stringify(relationCon);
    //单位隶属关系
    this.syscompanyrelationOption = SyscompanyBusiness.syscompanyrelationOption;
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
    //成立日期
    this.mainObj.SEST_DATE = this.sestDate;
    //生效日期
    this.mainObj.SBEGIN_DATE = this.sbeginDate;
    //注销日期
    this.mainObj.SEND_DATE = this.sendDate;
    //自定义时间验证,生效日期不能大于成立日期，注销日期不能大于生效日期
    SyscompanyBusiness.validator(this.mainObj, this.mainValid);
    //平台不能空和最长输入长度的验证
    return !this.validator();
  }
  /**
   * 保存返回
   * @param action 
   */
  cardSaveBack(action: string) {
    let a = this.beforeSave();
    if (this.beforeSave()) {
      SyscompanyBusiness.saveOrUpdateCompany(this.mainObj, this.dimCode, this.parentCode)
        .subscribe(result => {
          if (result[0].CODE === '0' && result[1].CODE === '0') {
            SystemBusiness.msgService.message('保存成功');
            this.cardBack(action);
          } else {
            SystemBusiness.msgService.error("保存失败," + result[0].MSG + ',' + result[1].MSG);
          }
        })
    }
  }
}
