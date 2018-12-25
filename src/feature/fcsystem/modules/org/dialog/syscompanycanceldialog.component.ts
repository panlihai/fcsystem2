import { Component, Input, OnInit } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { FCEVENT } from 'fccomponent2/fc';
import { SyscompanyBusiness } from '../../../business/syscompany.business'; 
import { CommonService } from 'fccore2/common/common';

/* 单位管理-撤销弹窗 */

@Component({
    selector: 'syscompanycanceldialog',
    template: `
<fc-layoutpanel class="templatefastposition ">
    <fc-layoutrow fcSpan="30" fccontent>
            <fc-layoutpanel fccontent2>
                <form fccontent>
                    <fc-layoutpanel fccontent id="basic-information">
                        <fc-title fcLabel="变更信息" fcBorder="bottom" fcWidth="96%" fcheader></fc-title>
                        <fc-layoutcol fcSpans="1,1" fccontent>
                            <fc-date [fcLabel]="'生效日期'"  [(ngModel)]="RevokeObj.REVOKE_SBEGIN_DATE" name="REVOKE_SBEGIN_DATE" fccontent1></fc-date>
                            <fc-text [fcLabel]="'变更文号'" [(ngModel)]="RevokeObj.REVOKE_FILE_NO" name="REVOKE_FILE_NO" fccontent2></fc-text>                            
                        </fc-layoutcol>
                        <fc-layoutcol fcSpans="1,0" fccontent >
                            <fc-textarea [fcLabel]="'变更原因'"  [(ngModel)]="RevokeObj.REVOKE_REASON" name="REVOKE_REASON" fcRow="2" fccontent1 class="line-col"></fc-textarea>                          
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
export class SyscompanycanceldialogComponent extends ParentEditComponent {
    //弹窗唯一标识
    @Input()
    fcToken: string;
    @Input()
    comp_id: string;
    mainObj: any = {};
    RevokeObj: any = { REVOKE_FILE_NO: "1233" };
    //上传文件配置
    fcUploadOption: any = { FILETYPE: 'PIC', SOURCEID: 'dd90c093667947c4a4265e001602b9cd', SOURCEAID: 'SYSAPP', 'SOURCEFIELD': 'APPURL', 'RESTITLE': '' }

    constructor() {
        super('SYSTEM', 'SYSCOMPANY');
    }
    init(): void {
        this.RevokeObj.REVOKE_FILE_NO = "asdfadfe";//??TODO
    }

    addNew(mainObj: any): boolean {
        return true;
    }

    event(eventName: string, param: any): void {
    }

    /**
  * 获取单位元数据信息
  */
    getCompData() {
        var _comp_id = this.comp_id;
        return new Promise((resolve, reject) => {
            SyscompanyBusiness.getDataByAppID_Col_Val("SYSCOMPANY", "ID", _comp_id).subscribe((result) => {
                if (result.CODE === '0' && result.DATA.length > 0) {
                    resolve(result);
                }
            });
        });
    }
    /*
    *修改元数据信息
    */
    updateCompData(result) {
        return new Promise((resolve, reject) => {
            this.mainObj = result["DATA"][0];
            for (var _element in this.mainObj) {
                if (this.mainObj[_element] === 'null' || this.mainObj[_element] == null)
                    this.mainObj[_element] = '';
            }
            SyscompanyBusiness.cancelCompany(this.mainObj).subscribe((result) => {
                resolve(result);
            });
        });
    }
    /*
    * 执行确定事件方法
    */
    ok() {
        this.getCompData().then((result) => {
            return this.updateCompData(result);
        }).then((result) => {
            if (result["CODE"] === '0') {
                SyscompanyBusiness.msgService.success("撤销成功！");                
                CommonService.event(this.fcToken + '-close', {});
            }
        }).catch((e) => {
            SyscompanyBusiness.msgService.success("撤销失败！");
        });
    }

    /**
     * 关闭转移部门窗口
     */
    cancel() {
        CommonService.event(this.fcToken + '-close', {});
    }

    tlblistEvent(event: FCEVENT) {       
    }
}
