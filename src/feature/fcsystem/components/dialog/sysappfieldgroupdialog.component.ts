import { Component, Input } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SysappBusiness } from '../../business/sysapp.business';
@Component({
    selector: 'sysappfieldgroupdialog',
    template: `
    <fc-layoutpanel>
        <fc-layoutcol fccontent>
            <fc-text fccontent1 fcLabel="隶属编码"  [(ngModel)]="codeValue" [fcAppid]="appId" fcFieldCode="APPID" [fcValid]="mainValid.APPID" name="APPID" fcReadonly="true"></fc-text>
            <fc-radio fccontent2 fcLabel="分组类型"  [(ngModel)]="mainObj.TYPE" [fcAppid]="appId" fcFieldCode="TYPE"  [fcValid]="mainValid.TYPE"  fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="TYPE" [fcDisabled]="true"></fc-radio>
            <fc-text fccontent1 fcLabel="分组编码"  [(ngModel)]="mainObj.GRPCODE" [fcAppid]="appId" fcFieldCode="GRPCODE"  [fcValid]="mainValid.GRPCODE" name="GRPCODE"></fc-text>
            <fc-text fccontent2 fcLabel="分组名称"  [(ngModel)]="mainObj.GRPNAME" [fcAppid]="appId" fcFieldCode="GRPNAME"  [fcValid]="mainValid.GRPNAME" name="GRPNAME"></fc-text>
            <fc-text fccontent1 fcLabel="排序"  [(ngModel)]="mainObj.SORTBY" [fcAppid]="appId" fcFieldCode="SORTBY"  [fcValid]="mainValid.SORTBY"  name="SORTBY"></fc-text>
        </fc-layoutcol>
        <div fccontent class="centerBtn">
            <fc-tlbform fcType="primary" [fcAppid]="appId"  (fcEvent)="tlbformEvent($event)"></fc-tlbform>
        </div>
    </fc-layoutpanel>
    `,
    styles: [`
    .centerBtn {
        display: flex;
        justify-content: center;
    }
  `]
})
export class SysappfieldgroupdialogComponent extends ParentEditComponent {
    mainObj: any = {};
    codeValue: any;
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