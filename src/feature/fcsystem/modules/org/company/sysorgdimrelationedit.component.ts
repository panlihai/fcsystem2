import { Component } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2'; 
import { CommonService } from 'fccore2/common/common'; 
/* 组织维度 */
@Component({
  selector: 'sysorgdimrelationedit',
  template: `
  <fc-layoutpanel fcFull="true"> 
  <fc-tlbform fcheader [fcAppid]="appId" fccontent1 fcLayout="left" (fcEvent)="tlbformEvent($event)" [fcDisableds]='disableds'></fc-tlbform>
  <fc-layoutcol fcSpans="1,1" fccontent>
      <fc-text fccontent1  [(ngModel)]="mainObj.SDIM_CODE" [fcReadonly]='fccodeReadOnly'  fcLabel="维度编码"   name="TITLE"></fc-text>
      <fc-combo fccontent1 [fcLabel]="'是否内置'"   fcReadonly='Y'   [(ngModel)]="mainObj.BISBUILTIN" [fcAppid]="appId" fcFieldCode="BISBUILTIN" fcLabelCode="DICDESC" fcValueCode="DICVALUE"></fc-combo>
      <fc-combo fccontent1 [fcAppid]="appId" [fcLabel]="'是否公有'" [(ngModel)]="mainObj.BISPUBLIC" [fcAppid]="appId"fcFieldCode="BISPUBLIC" fcLabelCode="DICDESC" fcValueCode="DICVALUE"></fc-combo>
      <fc-text fccontent2  [fcAppid]="appId" [(ngModel)]="mainObj.SDIM_NAME" fcLabel="维度名称" name="PUBLISHUSER" ></fc-text>        
      <fc-text fccontent2  [fcAppid]="appId" [(ngModel)]="mainObj.SREMARK" fcLabel="应用" name="SREMARK" ></fc-text>
      <fc-combo fccontent2 [fcLabel]="'启用状态'" [(ngModel)]="mainObj.BISUSE" [fcAppid]="appId" fcFieldCode="BISUSE" fcLabelCode="DICDESC" fcValueCode="DICVALUE"></fc-combo>
  </fc-layoutcol>
  </fc-layoutpanel>
  `,
  styles: [`
  .btns {
      padding: 10px 0px;
  }
  `]
})

export class SysorgdimrelationeditComponent extends ParentEditComponent {
  pageState: string;
  fccodeReadOnly: string;
  constructor() {
    super("SYSTEM", "SYSCOMPANYDIM");
  }
  init(): void {
   
    this.fccodeReadOnly = this.routerParam.ID ? 'Y' : 'N';
    if (this.routerParam && this.routerParam.ID ){
      //如果是新增，初始化维度对象
      // this.mainObj.ID = CommonService.guid();
      // this.mainObj.SDIM_CODE = '';
      // this.mainObj.SDIM_NAME = '';
      this.mainObj.BISPUBLIC = 'N';
      // this.mainObj.BISDEFAULT = '';
      // this.mainObj.SREMARK = '';
      this.mainObj.BISUSE = 'Y';
      this.mainObj.BISBUILTIN = 'N';
      this.mainObj.SCRATOR = this.userInfo.PID;
      this.mainObj.SCREATE_TIME = CommonService.getMilliseconds();
      // this.mainObj.SMODIFIER = '';
      // this.mainObj.SMODIFY_TIME = '';
      this.mainObj.SCREATECOMPANY = this.userInfo.COMPANYCODE;
    }
  }

  /**
  * 事件
  * @param event 
  */
  event(eventName: string, context: any): void {
    switch (eventName) {
      case '':

        break;
    }
  }

  /**
  * 新增事件
  * @param event 
  */
  addNew(mainObj: any): boolean {
    return true;
  }

  /**
   * 保存前事件
   * @param event 
   */
  beforeSave(): boolean {
    return true;
  };

  /**
   * 保存后事件
   * @param event 
   */
  afterSave() {

  }

  /**
   * 跳转到列表页面并刷新
   * @param event 
   */
  cardBack(action) {
    this.navigate("/system/sysorgdimList", { refresh: 'Y' });
  }

  // /**
  //  * 保存事件
  //  * @param event 
  //  */
  // cardSave(action) {
  //   this.saveObj(false);
  // }

  // /**
  //  * 保存并返回事件
  //  * @param event 
  //  */
  // cardSaveBack(action) {
  //   this.saveObj(true);
  // }

  // /**
  // * 保存方法
  // * @param event 
  // */
  // saveObj(isBack) {
  //   //如果是新增
  //   //if (this.pageState != "Edit") {
  //   SyscompanyBusiness.appService.saveObject(this.appId, this.mainObj).subscribe(result => {
  //     if (result.CODE === '0') {
  //       SyscompanyBusiness.msgService.success("保存成功！");
  //       if (isBack) this.cardBack({});
  //     } else {
  //       SyscompanyBusiness.msgService.error('保存失败,错误原因' + result.MSG);
  //     }
  //   });
  //   // }
  //   // //如果是修改
  //   // else {
  //   //   SyscompanyBusiness.appService.updateObject(this.appId, this.mainObj).subscribe(result => {
  //   //     if (result.CODE === '0') {
  //   //       SyscompanyBusiness.msgService.success("保存成功！");
  //   //       if (isBack) this.cardBack({});
  //   //     } else {
  //   //       SyscompanyBusiness.msgService.error('保存失败,错误原因' + result.MSG);
  //   //     }
  //   //   });
  //   // }
  // }
}