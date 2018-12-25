import { Component, Input, OnInit } from '@angular/core';
import { FCEVENT } from 'fccomponent2/fc';
import { ParentEditComponent } from 'fccomponent2';
import SysdepartmentBusiness from '../../../business/sysdepartment.business';
import { CommonService } from 'fccore2/common/common';
/* 部门管理-撤销弹窗 */
@Component({
    selector: 'departmentcanceldialog',
    template: `
    <fc-layoutpanel class="templatefastposition ">
    <fc-layoutrow fcSpan="30" fccontent>
            <fc-layoutpanel fccontent2>
                <form fccontent>
                    <fc-layoutpanel fccontent id="basic-information">
                        <fc-title fcLabel="变更信息" fcBorder="bottom" fcWidth="96%" fcheader></fc-title>
                        <fc-layoutcol fcSpans="1,1" fccontent>
                            <fc-date [fcLabel]="'生效日期'"[(ngModel)]="RevokeObj.REVOKE_SBEGIN_DATE" name="REVOKE_SBEGIN_DATE"  fccontent1></fc-date>
                            <fc-text [fcLabel]="'变更文号'" [(ngModel)]="RevokeObj.REVOKE_FILE_NO" name="REVOKE_FILE_NO" fccontent2></fc-text>                            
                        </fc-layoutcol>
                        <fc-layoutcol fcSpans="1,0" fccontent >
                            <fc-textarea [fcLabel]="'变更原因'"  [(ngModel)]="RevokeObj.REVOKE_REASON" name="REVOKE_REASON" fcCol="2" fccontent1  class="line-col"></fc-textarea>                          
                        </fc-layoutcol>
                        <fc-layoutcol fcSpans="8,1" fccontent>
                            <fc-text [fcLabel]="'附件'" name="textname" fccontent1 class="attachment"></fc-text>  
                            <div class="sys-choose-icon-upload" fccontent2>
                                <fc-upload fcListType="icon" fcShowLabel="N" fccontent class="upload-content attachment-btn" (fcEvent)="event('fileEvent',$event)"
                                    [fcOption]="fcUploadOption">
                                </fc-upload>
                            </div>               
                        </fc-layoutcol>
                    </fc-layoutpanel>
                </form>
            </fc-layoutpanel>
    </fc-layoutrow>
</fc-layoutpanel>
<div class="customize-footer">
<fc-button  [fcType]="'primary'" fcLabel="确定" (click)="ok($event)">
</fc-button>
<fc-button [fcType]="'default'" fcLabel="取消"  (click)="cancel($event)">
</fc-button>
</div>
    `,
    styles: [`
    .customize-footer{
        padding: 4px 13px;
        text-align: right;
        position: absolute;
        bottom: 0;
        width: 100%;
        left: 0;
       }
       .customize-footer fc-button{
        margin-left:8px;
       }
  `]
})
export class DepartmentcanceldialogComponent extends ParentEditComponent {
    //弹窗唯一标识
    @Input()
    fcToken: string;
    @Input()
    comp_id: string;
    mainObj: any = {};
    RevokeObj: any = { REVOKE_FILE_NO: "1233" };
    constructor() {
        super('SYSTEM', 'SYSDEPARTMENT');
    }
    init(): void {
        this.RevokeObj.REVOKE_FILE_NO = "asdfadfe";
    }
    addNew(mainObj: any): boolean {
        return true;
    }
    event(eventName: string, param: any): void {
    }
    //上传文件配置
    fcUploadOption: any = { FILETYPE: 'PIC', SOURCEID: 'dd90c093667947c4a4265e001602b9cd', SOURCEAID: 'SYSAPP', 'SOURCEFIELD': 'APPURL', 'RESTITLE': '' }
    ngOnInit() {

    }
    _init() {
    }
    _emitdataOutside(data: any) {

    }
    selectdata(ev: any, data: any) {

    }
    _cancel() {

    }
    tlblistEvent(event: FCEVENT) {
    }
    /**
   * 确定
   */
    ok() {
        CommonService.event(this.fcToken + '-close', {});
        var _comp_id = this.comp_id;// 'b4cf21e55a824134b27212f4248158e5';//todo  不知道如何接收参数
        SysdepartmentBusiness.getDataByAppID_Col_Val("SYSDEPARTMENT", "ID", _comp_id).subscribe((result) => {
            if (result.CODE === '0' && result.DATA.length > 0) {
                this.mainObj = result.DATA[0];
                SysdepartmentBusiness.cancelDepartment(this.mainObj).subscribe((result) => {
                    if (result.CODE === '0') {
                        SysdepartmentBusiness.msgService.success("撤销成功！");
                        //TODO 关闭弹出窗
                    }
                });
            }
        });
    }
    /**
     * 取消
     */
    cancel() {
        CommonService.event(this.fcToken + '-close', {});
    }
}
