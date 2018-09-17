import { Component, Input } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
// 编辑菜单弹窗
@Component({
    selector: 'menueditdialog',
    template: `
<fc-layoutpanel>
    <div fcheader>
        <fc-title fcLabel="编辑导航项" class="sys-card-pannel-title" fcHasLine="N"></fc-title>
        <P class="sys-card-pannel-smarks">
            说明：导航页，是菜单项的编辑，包含菜单中文名称，编码名称，是否末级等，可建子导航；
        </P>
    </div>
    <div fccontent>
        <div fccontent class="basic-information">
            <fc-title fcLabel="基本信息" class="sys-card-pannel-title" fcHasLine="N" fccontent></fc-title>
            <fc-layoutcol fcSpans="1,0" fccontent>
                <fc-layoutcol fcSpans="1,1" fccontent1>
                    <fc-text fccontent1 [fcLabel]="'导航编码'"  fcPlaceHolder="请输入字符" [(ngModel)]="mainObj.MENUID" [fcAppid]="appId"  fcFieldCode="MENUID" [fcValid]="mainValid.MENUID" name="APPID"  fcHelp="唯一标识该导航"></fc-text>
                    <fc-text fccontent1 [fcLabel]="'名称导航'"  fcPlaceHolder="请输入中文" [(ngModel)]="mainObj.MENUNAME" [fcAppid]="appId"  fcFieldCode="MENUNAME" [fcValid]="mainValid.MENUNAME"  fcHelp="此内容将在导航中显示"></fc-text>
                    <div class="noShow" fccontent1 [ngClass]="{'show':show===true}" >
                        <fc-text fccontent [fcLabel]="'路由'"  fcPlaceHolder="请输入路由名称" [(ngModel)]="mainObj.ROUTER" [fcAppid]="appId"  fcFieldCode="ROUTER" [fcValid]="mainValid.ROUTER" fcHelp="不包含产品编码，不包含/；如sysappList"></fc-text>
                        <fc-radio fccontent [fcLabel]="'导航类型'"  [fcAppid]="'SYSMENU'" fcFieldCode="MENUTYPE" [fcValid]="mainValid.MENUTYPE" [(ngModel)]="mainObj.MENUTYPE" fcFieldCode="MENUTYPE" fcLabelCode="DICDESC"
                            fcValueCode="DICVALUE" fcHelp="功能：默认路由；内部路由：全部路由（pid/sysappList）；外部路径：http：//www.baidu .com/index.html">
                        </fc-radio>
                    </div>
                </fc-layoutcol>
            </fc-layoutcol>
        </div>
        <div fccontent class="other-information">
            <fc-title fcLabel="其他信息" class="sys-card-pannel-title" fcHasLine="N" fccontent></fc-title>
            <fc-layoutcol fcSpans="1,0" fccontent>
                <fc-layoutcol fcSpans="1,1" fccontent1>
                    <fc-long fccontent1 [fcLabel]="'排序'" fcPlaceHolder="请输入整数" [(ngModel)]="mainObj.SORT" [fcAppid]="appId"  fcFieldCode="SORT" [fcValid]="mainValid.SORT" ></fc-long>
                    <fc-radio fccontent2 [fcLabel]="'是否启用'" [fcAppid]="'SYSMENU'"  fcFieldCode="ENABLE" [fcValid]="mainValid.ENABLE" [(ngModel)]="mainObj.ENABLE" fcFieldCode="ENABLE" fcLabelCode="DICDESC"
                        fcValueCode="DICVALUE" fcHelp="默认为启用">
                    </fc-radio>
                </fc-layoutcol>
                <fc-textarea  fccontent1 [fcLabel]="'备注（可选）'" name="textareaname" [fcRow]="'2'" [(ngModel)]="mainObj.REMARK" [fcAppid]="appId" fcPlaceHolder="请输入备注" class="remarkText"></fc-textarea>
            </fc-layoutcol>
            <div class="customize-footer" fccontent1>
                <fc-tlbform fccontent1 fcType="primary" [fcAppid]="appId" fcLayout="center" (fcEvent)="tlbformEvent($event)" class="basicTlb"></fc-tlbform>
            </div>
        </div>       
    </div>
</fc-layoutpanel>
    `,
    styles: [`
   .instructions{
        width: 100%;
        display: block;
        margin-left: 25%;
        color: #CFCFCF;
   }
   .instructions1{
        width: 100%;
        display: block;
        margin-left: 500px;
    }
    .noShow{
        display:none;
    }
    .show{
        display:block;
    }
    .sys-card-pannel-header{
        border-bottom:1px solid #e9e9e9;
    }
    :host ::ng-deep .remarkText .ant-form-item-label {
        width: 12.5%;
    }
    .customize-footer {
        text-align: center;
    }
    :host ::ng-deep .basic-information {
        border-bottom: 1px solid #EDEDED;
        padding-bottom: 10px;
    }
    :host ::ng-deep .fc-header{
        border-bottom: 1px solid #EDEDED;
        padding-bottom: 10px;
    }
  `]
})
export class MenueditdialogComponent extends ParentEditComponent {
    //传过来的对象
    @Input()
    fcMenu: any;
    //是否显示路由等相关信息
    show: boolean;
    event(eventName: string) {
    }
    init(): void {
    }
    addNew(mainObj: any): boolean {
        return true;
    }
    /**
    * 初始化模型，产品对应的内容
    */
    constructor() {
        super('SYSTEM', 'SYSMENU');
    }
    /**
     * 当发生改变的时候，mainObj重新赋值
     */
    ngOnChanges(): void {
        //初始化不显示，判断fcMenu.HASCHILD的状态在决定是否显示
        this.show = false;  
        if (this.fcMenu.HASCHILD === 'N') {
            this.show = true;      
        }
        this.mainObj = this.fcMenu;
    }   
}