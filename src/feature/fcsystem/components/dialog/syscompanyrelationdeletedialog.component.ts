import { Component, OnInit } from '@angular/core';
import { FCEVENT } from 'fccomponent2/fc';
/* 单位维度关系-删除弹窗 */
@Component({
    selector: 'syscompanyrelationdeletedialog',
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
                </form>
            </fc-layoutpanel>
    </fc-layoutrow>
</fc-layoutpanel>
    `,
    styles: [`
  `]
})
export class SyscompanyrelationdeletedialogComponent implements OnInit {
    ngOnInit() {
        this._init();
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
}
