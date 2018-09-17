import { Component, Input } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SysappBusiness } from '../../business/sysapp.business';
/* 单位变更审批-设立 */
@Component({
    selector: 'syssetupdialog',
    template: `
    <fc-layoutpanel>
        <fc-tlbform [fcAppid]="appId" (fcEvent)="tlbformEvent($event)" fccontent></fc-tlbform>
        <div fccontent class="sys-title-container">
             <fc-title fcLabel="基本信息" fcBorder="bottom" fcWidth="96%"></fc-title>
        </div>
        <fc-layoutcol fccontent>
            <fc-text fccontent1 fcLabel="单位编码"  [(ngModel)]="codeValue" [fcAppid]="appId" fcFieldCode="APPID" [fcValid]="mainValid.APPID" name="APPID" fcReadonly="true"></fc-text>
            <fc-text fccontent2 fcLabel="单位简码"  [(ngModel)]="mainObj.GRPCODE" [fcAppid]="appId" fcFieldCode="GRPCODE"  [fcValid]="mainValid.GRPCODE" name="GRPCODE"></fc-text>
            <fc-text fccontent1 fcLabel="单位全职"  [(ngModel)]="mainObj.GRPNAME" [fcAppid]="appId" fcFieldCode="GRPNAME"  [fcValid]="mainValid.GRPNAME" name="GRPNAME"></fc-text>
            <fc-text fccontent2 fcLabel="单位简称"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-any fccontent1  fcLabel="单位性质" ></fc-any>
            <fc-any fccontent2  fcLabel="行业属性" ></fc-any>
            <fc-any fccontent1 fcLabel="控股方式" ></fc-any>
            <fc-any fccontent2 fcLabel="路内层级" ></fc-any>
            <fc-layoutcol fcSpans="7,3" fccontent1>
                <fc-check fccontent1 fcLabel="法人单位" [(ngModel)]="checkValue" [fcOption]="checkOption"></fc-check>
                <fc-check fccontent2 fcLabel="虚拟单位" [(ngModel)]="checkValue" [fcOption]="checkOption"></fc-check>
            </fc-layoutcol>
            <fc-any fccontent2 fcLabel="维度" ></fc-any>
            <fc-text fccontent1 fcLabel="拼音简码"  [(ngModel)]="codeValue" [fcAppid]="appId" fcFieldCode="APPID" [fcValid]="mainValid.APPID" name="APPID" fcReadonly="true"></fc-text>
            <fc-text fccontent2 fcLabel="成立日期"  [(ngModel)]="mainObj.GRPCODE" [fcAppid]="appId" fcFieldCode="GRPCODE"  [fcValid]="mainValid.GRPCODE" name="GRPCODE"></fc-text>
            <fc-text fccontent1 fcLabel="生效日期"  [(ngModel)]="mainObj.GRPNAME" [fcAppid]="appId" fcFieldCode="GRPNAME"  [fcValid]="mainValid.GRPNAME" name="GRPNAME"></fc-text>
            <fc-text fccontent2 fcLabel="注销日期"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent1 fcLabel="联系电话"  [(ngModel)]="codeValue" [fcAppid]="appId" fcFieldCode="APPID" [fcValid]="mainValid.APPID" name="APPID" fcReadonly="true"></fc-text>
            <fc-text fccontent2 fcLabel="传真"  [(ngModel)]="mainObj.GRPCODE" [fcAppid]="appId" fcFieldCode="GRPCODE"  [fcValid]="mainValid.GRPCODE" name="GRPCODE"></fc-text>
            <fc-text fccontent1 fcLabel="邮政编码"  [(ngModel)]="mainObj.GRPNAME" [fcAppid]="appId" fcFieldCode="GRPNAME"  [fcValid]="mainValid.GRPNAME" name="GRPNAME"></fc-text>
            <fc-text fccontent2 fcLabel="网址"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent1 fcLabel="地址"  [(ngModel)]="mainObj.GRPNAME" [fcAppid]="appId" fcFieldCode="GRPNAME"  [fcValid]="mainValid.GRPNAME" name="GRPNAME"></fc-text>
            <fc-any fccontent2 fcLabel="状态" ></fc-any>
        </fc-layoutcol>
        <div fccontent class="sys-title-container">
            <fc-title fcLabel="上级单位" class="sys-flex-title" fcBorder="bottom" fcWidth="96%"  fcHasLine="N"></fc-title>
        </div>
        <fc-layoutrow fccontent fcSpan="200">
            <div style="height:190px;" fccontent1>
                 <fc-listdata  [fcAppid]="appId" [fcOption]="listOptions" (fcEvent)="componentEvents('listdataEvent',$event)"></fc-listdata>
            </div>
        </fc-layoutrow>
        <div fccontent class="sys-title-container">
            <fc-title fcLabel="开票信息" class="sys-flex-title" fcBorder="bottom" fcWidth="96%"  fcHasLine="N"></fc-title>
        </div>
        <fc-layoutcol fccontent>
            <fc-text fccontent1 fcLabel="纳税人识别号"  [(ngModel)]="codeValue" [fcAppid]="appId" fcFieldCode="APPID" [fcValid]="mainValid.APPID" name="APPID" fcReadonly="true"></fc-text>
            <fc-text fccontent2fcLabel="联系电话"  [(ngModel)]="mainObj.GRPCODE" [fcAppid]="appId" fcFieldCode="GRPCODE"  [fcValid]="mainValid.GRPCODE" name="GRPCODE"></fc-text>
            <fc-text fccontent1 fcLabel="开户银行"  [(ngModel)]="mainObj.GRPNAME" [fcAppid]="appId" fcFieldCode="GRPNAME"  [fcValid]="mainValid.GRPNAME" name="GRPNAME"></fc-text>
            <fc-text fccontent2 fcLabel="银行账号"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent2 fcLabel="开票地址"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
        </fc-layoutcol>
        <fc-layoutcol fccontent fcSpans="1,0">
            <fc-textarea fccontent1 fcCol="1" fcLabel="开票地址" [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY" name="SORTBY"
                fcHelp="详细描述接口的含义" fcPlaceHolder="请输入中文，描述接口具备什么特性，请求参数或返回结果"></fc-textarea>
        </fc-layoutcol>
        <div fccontent class="sys-title-container">
            <fc-title fcLabel="注册信息" class="sys-flex-title" fcBorder="bottom" fcWidth="96%"  fcHasLine="N"></fc-title>
        </div>
        <fc-layoutcol fccontent>
            <fc-text fccontent1 fcLabel="统一社会信用代码"  [(ngModel)]="codeValue" [fcAppid]="appId" fcFieldCode="APPID" [fcValid]="mainValid.APPID" name="APPID" fcReadonly="true"></fc-text>
            <fc-text fccontent2 fcLabel="法定代表人"  [(ngModel)]="mainObj.GRPCODE" [fcAppid]="appId" fcFieldCode="GRPCODE"  [fcValid]="mainValid.GRPCODE" name="GRPCODE"></fc-text>
            <fc-text fccontent1 fcLabel="注册资本(万元)"  [(ngModel)]="mainObj.GRPNAME" [fcAppid]="appId" fcFieldCode="GRPNAME"  [fcValid]="mainValid.GRPNAME" name="GRPNAME"></fc-text>
            <fc-text fccontent2 fcLabel="实缴资本(万元)"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent1 fcLabel="登记相关"  [(ngModel)]="mainObj.GRPNAME" [fcAppid]="appId" fcFieldCode="GRPNAME"  [fcValid]="mainValid.GRPNAME" name="GRPNAME"></fc-text>
            <fc-text fccontent2 fcLabel="证照编号"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent1 fcLabel="核准日期"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-any fccontent2  fcLabel="企业类型" ></fc-any>
            <fc-text fccontent1 fcLabel="营业期限"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
            <fc-text fccontent2 fcLabel="注册地址"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
        </fc-layoutcol>
        <fc-layoutcol fccontent fcSpans="1,0">
            <fc-textarea fccontent1 fcCol="1" fcLabel="经营范围" [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY" name="SORTBY"
                fcHelp="详细描述接口的含义" fcPlaceHolder="请输入中文，描述接口具备什么特性，请求参数或返回结果"></fc-textarea>
        </fc-layoutcol>
    </fc-layoutpanel>
    `,
    styles: [`
    .centerBtn {
        display: flex;
        justify-content: center;
    }
  `]
})
export class SyssetupdialogComponent extends ParentEditComponent {
    mainObj: any = {};
    codeValue: any;
    checkOption: any[] = [{ icon: '', label: '', value: 'a' }];
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
    }
    addNew(mainObj: any): boolean {
        return true
    }
}