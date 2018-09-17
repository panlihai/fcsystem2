import { Component, Input } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SysappBusiness } from '../../business/sysapp.business';
/* 单位变更审批-调整 */
@Component({
    selector: 'sysadjustdialog',
    template: `
    <fc-layoutpanel>
        <fc-tlbform [fcAppid]="appId" (fcEvent)="tlbformEvent($event)" fccontent></fc-tlbform>
        <div fccontent class="sys-title-container">
             <fc-title fcLabel="变更信息" fcBorder="bottom" fcWidth="96%"></fc-title>
        </div>
        <fc-layoutcol fccontent>
            <fc-text fccontent1 fcLabel="生效日期"  [(ngModel)]="codeValue" [fcAppid]="appId" fcFieldCode="APPID" [fcValid]="mainValid.APPID" name="APPID" fcReadonly="true"></fc-text>
            <fc-text fccontent2 fcLabel="变更文号"  [(ngModel)]="mainObj.GRPCODE" [fcAppid]="appId" fcFieldCode="GRPCODE"  [fcValid]="mainValid.GRPCODE" name="GRPCODE"></fc-text>
        </fc-layoutcol>
        <fc-layoutcol fccontent fcSpans="1,0">
            <fc-textarea fccontent1 fcCol="1" fcLabel="变更原因" [(ngModel)]="mainObj.GRPCODE" [fcAppid]="appId" fcFieldCode="GRPCODE" name="REMARK"
                fcHelp="详细描述接口的含义" fcPlaceHolder="请输入中文，描述接口具备什么特性，请求参数或返回结果"></fc-textarea>
        </fc-layoutcol>
        <fc-layoutcol fccontent>
            <div class="sys-choose-icon" fccontent1>
                <fc-title fccontent1 fcLabel="产品文档"></fc-title>
                <div class="sys-choose-icon-upload">
                    <fc-upload fcListType="icon" fcShowLabel="N" fccontent class="upload-content" fcHelp="可上传多个文档" (fcEvent)="event('fileEvent',$event)"
                        [fcOption]="fcUploadOption">
                    </fc-upload>
                </div>
            </div>
        </fc-layoutcol>
        <div fccontent class="sys-title-container">
            <fc-title fcLabel="基本信息" class="sys-flex-title" fcBorder="bottom" fcWidth="96%"  fcHasLine="N"></fc-title>
        </div>
        <fc-layoutcol fccontent>
            <fc-text fccontent1 fcLabel="单位代码"  [(ngModel)]="codeValue" [fcAppid]="appId" fcFieldCode="APPID" [fcValid]="mainValid.APPID" name="APPID" fcReadonly="true"></fc-text>
            <fc-text fccontent2fcLabel="单位简码"  [(ngModel)]="mainObj.GRPCODE" [fcAppid]="appId" fcFieldCode="GRPCODE"  [fcValid]="mainValid.GRPCODE" name="GRPCODE"></fc-text>
            <fc-text fccontent1 fcLabel="单位全称"  [(ngModel)]="mainObj.GRPNAME" [fcAppid]="appId" fcFieldCode="GRPNAME"  [fcValid]="mainValid.GRPNAME" name="GRPNAME"></fc-text>
            <fc-text fccontent2 fcLabel="单位简称"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-any fccontent1  fcLabel="单位性质" ></fc-any>
            <fc-any fccontent2  fcLabel="行业属性" ></fc-any>
            <fc-any fccontent1  fcLabel="控股方式" ></fc-any>
            <fc-any fccontent2  fcLabel="路内策层级" ></fc-any>
            <fc-layoutcol fcSpans="1,1" fccontent1>
                <fc-check fccontent1 fcLabel="法人单位" [(ngModel)]="checkValue" [fcOption]="checkOption"></fc-check>
                <fc-check fccontent2 fcLabel="虚拟单位" [(ngModel)]="checkValue" [fcOption]="checkOption"></fc-check>
            </fc-layoutcol>
            <fc-any fccontent2 fcLabel="维度" ></fc-any>
            <fc-text fccontent1 fcLabel="拼音简码"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent2 fcLabel="成立日期"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent1 fcLabel="生效日期"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent2 fcLabel="注销日期"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent1 fcLabel="联系电话"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent2 fcLabel="传真"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent1 fcLabel="邮政编码"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent2 fcLabel="网址"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent1 fcLabel="地址"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent2 fcLabel="状态"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
        </fc-layoutcol>
    </fc-layoutpanel>
    `,
    styles: [`
    .centerBtn {
        display: flex;
        justify-content: center;
    }
    .sys-choose-icon{
        position:relative;
        height:30px;
        margin-bottom:15px;
        margin-left: 6%;
      }
      .sys-choose-icon .sys-choose-icon-upload{
        line-height: 22px;
        position: absolute;
        height:200px;
        left: 20%;
        top: 2px;
      }
  `]
})
export class SysadjustdialogComponent extends ParentEditComponent {
    mainObj: any = {};
    codeValue: any;
    checkOption: any[] = [{ icon: '', label: '', value: 'a' }];
      //上传属性
  fcUploadOption: { FILETYPE: string; SOURCEID: any; SOURCEAID: string; SOURCEFIELD: string; RESTITLE: string; };
    /**
    * 初始化模型，产品对应的内容
    */
    constructor() {
        super('SYSTEM', 'SYSAPPFLDGROUP');
    }
    @Input()
    // set options(dialogCardListArgs: DialogCardListArgs) {
    //     if (Object.keys(dialogCardListArgs.data).indexOf('VIEWID') > -1) {
    //         this.mainObj.TYPE = 'viewElement';
    //         this.mainObj.APPID = dialogCardListArgs.data.VIEWID;
    //         this.getInfoAboutView(dialogCardListArgs.data.VIEWID);
    //     } else {
    //         this.mainObj.TYPE = 'attrElement';
    //         this.mainObj.APPID = dialogCardListArgs.data.APPID;
    //         this.codeValue = this.mainObj.APPID;
    //     }
    // }
    getInfoAboutView(id) {
        SysappBusiness._findWithQuery('SYSVIEW', { VIEWID: id }).subscribe(res => {
            if (res.CODE === '0') {
                this.codeValue = `${res.DATA[0]['VIEWID']} - ${res.DATA[0]['VIEWNAME']}`;
            }
        })
    }
    /**
      * 点击保存icon类名
      * @param event  
      */
    event(eventName: string) {
    }
    init(): void {
         //上传图片资源和地址
    this.fcUploadOption = {
        FILETYPE: "PIC",
        SOURCEID: this.routerParam.ID,
        SOURCEAID: "SYSCOMPANY",
        SOURCEFIELD: "",
        RESTITLE: ""
      };
    }
    addNew(mainObj: any): boolean {
        return true
    }
}