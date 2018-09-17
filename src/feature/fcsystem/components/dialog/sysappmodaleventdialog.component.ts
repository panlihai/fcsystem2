import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SysappBusiness } from '../../business/sysapp.business';
import SystemBusiness from 'fccore2/classes/system.business';
import { CommonService } from 'fccore2/common/common';
//模型事件-弹窗
@Component({
  selector: 'sysappmodaleventdialog',
  template: `
  <div>
    <div class="bg-dialog-content">
         <div class="topClose">
            <fc-title fcLabel="模型的事件" class="sys-card-pannel-title" fcHasLine="N"></fc-title>
            <div *ngIf="!fromFunc">事件：描述与模型的事件，呈现方式体现在按钮上，与属性及关系构成模型</div>
            <div *ngIf="fromFunc">按钮事件：描述与功能的按钮事件，呈现方式体现在按钮上，与视图构成功能</div>
            <div class="sys-card-fast">
                <ul class="sys-fast-list">
                    <li class="sys-icon-btn"  (click)="event('closetop')">
                        <fc-icon fcIcon="fc-icon-close" fcColor="#009DFF"></fc-icon>关闭
                    </li>
                </ul>
            </div>
         </div>
         <div fccontent>
         <fc-layoutpanel fccontent id="id0">
             <fc-title fcLabel="基本信息" fcWidth="96%" fcheader fcHasLine="N"></fc-title>
             <fc-layoutcol fcSpans="1,0" fccontent>
                 <div fccontent1>
                     <fc-text fcLabel="模型名称" [(ngModel)]="content" [fcAppid]="appId" fcFieldCode="APPID" [fcValid]="mainValid.APPID" name="APPID" *ngIf="!fromFunc" fcReadonly="Y"></fc-text>
                     <fc-text fcLabel="功能名称" [(ngModel)]="funcName" [fcAppid]="appId" fcFieldCode="APPID" [fcValid]="mainValid.APPID" name="APPID" *ngIf="fromFunc" fcReadonly="Y"></fc-text>
                     <fc-text fcLabel="事件编码" [fcAppid]="appId" fcFieldCode="BTNCODE" [fcValid]="mainValid.BTNCODE" fcPlaceHolder="按编码规则自动生成"   [(ngModel)]="mainObj.BTNCODE" 
                     name="BTNCODE" fcHelp="与其关系名称，中文，如，元数据的属性"></fc-text>
                     <fc-text fcLabel="事件名称" [fcAppid]="appId" fcFieldCode="BTNNAME" [fcValid]="mainValid.BTNNAME"  fcPlaceHolder="请输入中文"  [(ngModel)]="mainObj.BTNNAME" 
                     name="BTNNAME" fcHelp="被关联的模型名称"></fc-text>
                     <fc-text fcLabel="操作代码"  [fcAppid]="appId" fcFieldCode="ACTCODE" [fcValid]="mainValid.ACTCODE"   fcPlaceHolder="请输入编码如addCard" [(ngModel)]="mainObj.ACTCODE"
                     name="ACTCODE"  fcHelp="前端操作的事件编码"></fc-text>
                 </div>
             </fc-layoutcol>
             <fc-layoutcol fcSpans="1,1" fccontent>
                 <div fccontent1 style="margin-left:34%;">
                      <fc-long  [fcAppid]="appId" fcFieldCode="SORT" [fcValid]="mainValid.SORT"  [(ngModel)]="mainObj.SORT" fcLabel="排序" fcPlaceHolder="请输入整数" name="SORT"></fc-long>
                 </div>
                 <div fccontent2>
                      <fc-radio [(ngModel)]="mainObj.ENABLE" fcLabel="是否启用" [fcAppid]="appId" fcFieldCode="ENABLE" [fcValid]="mainValid.ENABLE"  fcLabelCode="DICDESC"
                      fcValueCode="DICVALUE" name="ENABLE"  (ngModelChange)="componentEvents('enableEvent',$event)"></fc-radio>
                 </div>
             </fc-layoutcol>
             <div class="sys-title-container" fccontent>
                <fc-title class="sys-flex-title" fcLabel="其他信息" fcHasLine="N"></fc-title>
                <i class="sys-title-arrow" *ngIf="showDown===true" (click)="open($event)" fccontent1>∨</i>
                <i class="sys-title-arrow" *ngIf="showDown===false" (click)="close($event)" fccontent1>∧</i>
            </div>
            <fc-layoutcol fcSpans="1,0" fccontent class="otherMessage">
                <div class="sys-choose-icon" fccontent1 *ngIf="showDown===false">
                    <span class="icontext">图标:</span>
                    <fc-modalcard fcEvent="modalEvent($event)" fcWidth="60%">
                        <sysicondialog fccontent></sysicondialog>
                        <div class="sys-choose-icon-box" fcopen>
                            <fc-icon [fcIcon]="mainObj.BTNICON"  fcFontSize="30px"  fcHelp="请选择一个字体图标"  name="eventicon"></fc-icon>                         
                                <span class="select-icon" >选择字体图标</span>                         
                            <span class="sys-deleticon"  (click)="event('deleticonEvent')">x</span>
                            <div *ngIf="mainObj.BTNICON===''" class="sys-uploadall">
                                <span class="sys-icon-upload">
                                    <fc-icon fcIcon="fc-icon-add"></fc-icon>
                                </span>
                                <span>选择图标</span>
                            </div>
                        </div>                       
                    </fc-modalcard>
                </div>
                <div fccontent1 style="margin-top:5px;" *ngIf="showDown===false">
                    <fc-radio  [fcAppid]="appId" fcFieldCode="BTNTYPE" [fcValid]="mainValid.BTNTYPE" [(ngModel)]="mainObj.BTNTYPE" fcLabel="事件发生场景" fcFieldCode="BTNTYPE"
                     fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="BTNTYPE"  (ngModelChange)="componentEvents('btntypeEvent',$event)"
                     fcHelp="此事件在模型卡片场景，列表场景，工具栏场景的事件类型"></fc-radio>                  
                    <fc-radio  [fcAppid]="appId" fcFieldCode="ALLOWTYPE"  [fcValid]="mainValid.ALLOWTYPE" [(ngModel)]="mainObj.ALLOWTYPE" fcLabel="许可类型" fcFieldCode="ALLOWTYPE"
                    fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="ALLOWTYPE"  (ngModelChange)="componentEvents('allowtypeEvent',$event)"
                    fcHelp="开放的事件无需授权，许可按钮需要授权"></fc-radio>  
                </div>
                <fc-textarea fccontent1 [fcAppid]="appId" fcFieldCode="HELP" [(ngModel)]="mainObj.HELP" fcLabel="帮助(可选)"  name="HELP" fcPlaceHolder="请输入备注" *ngIf="showDown===false"
                fcHelp="请输入少于200字"></fc-textarea>
            </fc-layoutcol>
         </fc-layoutpanel>
     </div>
    </div>
    <div class="customize-footer">
        <fc-tlbform fccontent1 fcType="primary" [fcAppid]="appId" fcLayout="center" (fcEvent)="tlbformEvent($event)" class="basicTlb"></fc-tlbform>
    </div>
  </div>
    `,
  styles: [`
  .bg-dialog-content{
      height:450px;
      overflow: scroll;
  }
   .customize-footer{
     text-align:center;
   }
  .sys-deleticon{
    background: #108ee9;
    width: 14px;
    text-align: center;
    position: absolute;
    z-index: 999;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    heihgt: 20px;
    height: 14px;
    right: 0px;
    top: 0px;
  }
  .sys-choose-icon{
    position:relative;
    height:100px;
  }
  .sys-choose-icon .sys-choose-icon-box{
    width: 100px;
    height: 100px;
    line-height: 90px;
    padding: 10px;
    border-radius: 4px;
    background-color: #ffffff;
    border: 1px dashed #ebedf0;
    position: absolute;
    left: 26%;
    top: 2px;
    text-align: center;
  }
  .sys-topclose{
    color: #108ee9;
    margin-top: 8px;
    margin-left: 19px;
  }
  .sys-tab{
      margin-left:26%;
  }
  .anticon {
    margin-right: 20px;
    display: block;
    text-align: right;
 }
 .sys-title-arrow{
  font-size: 20px;
  font-style: inherit;
  flex: 0.2;
  display:block;
  text-align: right;
}
.sys-title-arrow:hover{
  cursor:pointer;
}
.topClose{
  border-bottom:1px solid #ccc;
}
.helpBottom{
  border-bottom:1px solid #ccc;
  padding-left: 250px;
}
.sys-title-container{
  display:flex;
  flex-direction:row;
  align-items:center;
  padding-right: 20px;
  border-top: 1px solid #ccc;
}
.sys-flex-title{
  flex:0.8;
} 
.select-icon{
  position: absolute;
  left: -6%;
  top: 62px;
  width: 100%;
  color: #cccccc;
}
span.icontext {
  width: 24%;
  display: inline-block;
  text-align: right;
}
  `]
})
export class SysappmodaleventdialogComponent extends ParentEditComponent {
  //显示展开收起图标,初始收起
  showDown: boolean = true;
  //模型名称
  content: string;
  funcName: string;
  emitData: any;
  fromFunc: boolean = false;
  //传过来的对象
  @Input()
  fceventObj: any;
  // @Input()
  // set options(option: any) {
  //   this.emitData = option;
  //   if (option.data ? option.data.funcId : false)
  //     this.getInfoAboutFunc(option.data.funcId)
  //   if (option.data ? option.data.fromFunc : false)
  //     this.fromFunc = option.data.fromFunc;
  //   if (option.data.ID) {
  //     this.getInfoAboutMain(option.data.ID);
  //   }
  //   else {
  //     this.mainObj = option.event ? option.event : SysappBusiness.initObjDefaultValue(this.mainApp);
  //     this.content = option.str;
  //   }
  // }
  /**
   * 初始化模型，产品对应的内容
   */
  constructor() {
    super('SYSTEM', 'SYSAPPBUTTONS');
  }
  init(): void {
  }
  /**
   * 当发生改变的时候，mainObj重新赋值
   */
  ngOnChanges(): void {
    if (this.fceventObj !== undefined && this.fceventObj !== '') {
      if (this.fceventObj.event !== null) {//编辑卡片的弹窗事件
        this.mainObj = this.fceventObj.event;
        //模型名称
        this.content = this.fceventObj.str;
      } else {//新增卡片的弹窗事件
        this.mainObj = {
          APPID: '',
          BTNCODE: '',
          BTNNAME: '',
          ACTCODE: '',
          SORT: '',
          ENABLE: '',
          BTNICON: '',
          BTNTYPE: '',
          ALLOWTYPE: '',
          HELP: ''
        }
        //模型名称
        this.content = this.fceventObj.str;
      }
    }
  }
  addNew(mainObj: any): boolean {
    return true;
  }
  afterSave() {
    // this.modal.next(this.emitData);
    // this.modal.destroy();
  }
  /**  
   * 根据ID获取关于功能的部分信息
   * @param id 
   */
  getInfoAboutFunc(id) {
    SysappBusiness._findWithQuery('SYSFUNC', { ID: id }).subscribe(res => {
      if (res.CODE === '0') {
        this.mainObj.APPID = res.DATA[0].FUNCID;
        this.funcName = `${res.DATA[0].FUNCID} - ${res.DATA[0].FUNCNAME}`;
      }
    })
  }
  /**
   * 根据ID获取关于编辑信息
   */
  getInfoAboutMain(id) {
    SystemBusiness.appService.findWithQuery("", { ID: id }).subscribe(res => {
      if (res.CODE === '0') {
        this.mainObj = res.DATA[0];
      }
    })
  }
  /**
  * 保存前验证
  */
  beforeSave(): boolean {
    if (!this.fromFunc)
      this.mainObj.APPID = this.content.split('-')[0];
    return true;
  }
  event(eventName: string, param: any): void {
    switch (eventName) {
      //删除字体图标X
      case 'deleticonEvent':
        this.mainObj.BTNICON = "";
        event.stopPropagation()
        break;
      case 'closetop':
      // this.modal.destroy();
    }
  }
  /**
* 组件事件收集
* @param type 字符串命名
* @param ev 事件传过来的参数
*/
  componentEvents(type: string, ev: any) {
    switch (type) {
      case 'enableEvent':
        this.mainObj.ENABLE = ev;
        break;
      case 'btntypeEvent':
        this.mainObj.BTNTYPE = ev;
        break;
      case 'allowtypeEvent':
        this.mainObj.ALLOWTYPE = ev;
        break;
    }
  }
  /**
  * 展开其他信息
  */
  open() {
    this.showDown = false;
  }
  /**
  * 收起其他信息
  */
  close() {
    this.showDown = true;
  }
  /**
  * 点击弹出图标列表
  * @param event  
  */
  selectIcon(): void {
    let token = CommonService.guid();
    CommonService.subscribe('selectIcon', (result) => {
      this.mainObj.ICON = result.param;
    });
  }
}