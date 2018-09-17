import { Component, Input } from '@angular/core';
import { FCEVENT } from 'fccomponent2/fc';
/** 单位管理-转移弹窗 */
@Component({
    selector: 'syscompanytransferdialog',
    template: `
    <fc-layoutpanel class="templatefastposition ">
        <fc-layoutrow fcSpan="30" fccontent>
            <fc-tlbform fcAppid="appId" fccontent1></fc-tlbform>
                <fc-layoutpanel fccontent2>
                    <form fccontent>
                        <fc-layoutpanel fccontent id="basic-information">
                            <fc-title fcLabel="变更信息" fcBorder="bottom" fcWidth="96%" fcheader></fc-title>
                            <fc-layoutcol fcSpans="1,1" fccontent>
                                <fc-date [fcLabel]="'生效日期'" name="datename" fccontent1></fc-date>
                                <fc-text [fcLabel]="'变更文号'" name="textname" fccontent2></fc-text>                            
                            </fc-layoutcol>
                            <fc-layoutcol fcSpans="1,0" fccontent >
                                <fc-textarea [fcLabel]="'变更原因'" name="textareaname" fcRow="2" fccontent1 class="line-col"></fc-textarea>                          
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
                        <fc-layoutpanel fccontent id="higher-unit">
                            <fc-title fcLabel="上级单位" fcBorder="bottom" fcheader fcWidth="96%"></fc-title>
                            <table border="1" fccontent class="fc-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>维度</th>
                                        <th>上级</th>
                                        <th>生效日期</th>
                                        <th>失效日期</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="checkbox" id="check1">
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="checkbox" id="check2">
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>       
                        </fc-layoutpanel>
                    </form>
                </fc-layoutpanel>
        </fc-layoutrow>
    </fc-layoutpanel>
    `,
    styles: [`
   .customize-footer{
     text-align:right;
   }
  `]
})
export class syscompanytransferdialogComponent {
    //工具栏配置
    tlbconfig: any[] = [{
        'BTNTYPE': 'default',
        'BTNICON': '',
        'ACTCODE': 'save',
        'BTNNAME': '保存'
    }, {
        'BTNTYPE': 'default',
        'BTNICON': '',
        'ACTCODE': 'back',
        'BTNNAME': '返回列表'
    }];
    // 生效日期
    sbeginDate: Date;
    //变更文号
    dcmtno: string;
    //变更原因
    changeResult: string;
    //上传附件
    sysresUpload: string;
    @Input()
    userId: string;
    @Input()
    set options(option: any) {
        this.userId = option.userId;
    }
    _userId: string;
    emitDataOutside() {
        // let params = { userId: this._userId };
        // this.modal.next(params);
        // if (this._userId == '') {
        //     this.modal.destroy();
        // }
        // this.modal.destroy();
    }

    handleCancel(e) {
        // this.modal.destroy();
    }
    /**
     * 工具栏事件
     * @param event 
     */
    tlblistEvent(event: FCEVENT) {
        switch (event.eventName) {
            case 'save'://保存
                break;
            case 'back'://返回列表
                break;
        }
    }
    /**
     * 上传附件事件
     * @param event 
     */
    fctextEvent(event: FCEVENT) {
        switch (event.eventName) {
            case 'click'://上传附件
                break;
        }
    }
}