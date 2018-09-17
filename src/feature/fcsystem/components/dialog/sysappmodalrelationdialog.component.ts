import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SysappBusiness } from '../../business/sysapp.business';
import { CommonService } from 'fccore2/common/common';
//模型关系-弹窗
@Component({
  selector: 'sysappmodalrelationdialog',
  template: `
  <div>
  <div class="bg-dialog-content">
       <fc-title fcLabel="与其他模型的关系" class="sys-card-pannel-title" fcHasLine="N"></fc-title>
       <div class="topClose">
          <div>关系：描述模型与模型之间，数据与数据之间的联系，与属性、事件构成模型</div>
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
                    <fc-text [fcLabel]="'主模型名称'"  [fcAppid]="appId" fcFieldCode="MAINAPP" [fcValid]="mainValid.MAINAPP" [(ngModel)]="content" name="MAINAPP" fcReadonly="Y"></fc-text>
                    <fc-text [fcLabel]="'关系名称'" [fcAppid]="appId" fcFieldCode="LINKNAME" [fcValid]="mainValid.LINKNAME"   fcPlaceHolder="请输入关系的中文描述"   [(ngModel)]="mainObj.LINKNAME" 
                    name="LINKNAME" fcHelp="与其关系名称，中文，如，元数据的属性"></fc-text>
                    <fc-any  fcLabel="子模型名称"  [fcAppid]="appId" fcFieldCode="ITEMAPP" [fcOption]="scomDataItemOptions"   fcPlaceHolder="请输入中文" 
                    [(ngModel)]="mainObj.ITEMAPP" (ngModelChange)="componentEvents('ruletypeEvent',$event)" name="ITEMAPP"
                    fcHelp="被关联的模型名称"></fc-any>
                    <fc-text [fcLabel]="'关联条件'" [fcAppid]="appId" fcFieldCode="LINKFILTER"  [fcValid]="mainValid.LINKFILTER" fcPlaceHolder="请输入sql条件，带and" [(ngModel)]="mainObj.LINKFILTER" 
                    name="LINKFILTER" fcHelp="与主模型通过sql条件构成一对一或一对多关系或主外键关系"></fc-text>
               </div>
           </fc-layoutcol>
           <fc-layoutcol fcSpans="1,1" fccontent>
               <div fccontent1 style="margin-left:34%;">
                    <fc-long  [fcAppid]="appId" fcFieldCode="SORTBY" [fcValid]="mainValid.SORTBY"  [(ngModel)]="mainObj.SORTBY" fcLabel="排序" fcPlaceHolder="请输入整数" name="SORTBY"></fc-long>
               </div>
               <div fccontent2>
                    <fc-radio [(ngModel)]="mainObj.ENABLE" fcLabel="是否启用" [fcAppid]="appId" fcFieldCode="ENABLE" [fcValid]="mainValid.ENABLE" fcLabelCode="DICDESC"
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
                  <span class="icontext">数据源图标:</span>                
                  <fc-modalcard fcEvent="modalEvent($event)" fcWidth="60%">
                        <sysicondialog fccontent></sysicondialog>
                        <div class="sys-choose-icon-box" fcopen>
                            <fc-icon [fcIcon]="mainObj.ICON"  fcFontSize="30px"  fcHelp="请选择一个字体图标"  name="eventicon"></fc-icon>                         
                                <span class="select-icon" >选择字体图标</span>                         
                            <span class="sys-deleticon"  (click)="event('deleticonEvent')">x</span>
                            <div *ngIf="mainObj.ICON===''" class="sys-uploadall">
                                <span class="sys-icon-upload">
                                    <fc-icon fcIcon="fc-icon-add"></fc-icon>
                                </span>
                                <span>选择图标</span>
                            </div>
                        </div>                       
                    </fc-modalcard>
              </div>
              <div fccontent1 style="margin-top:5px;" *ngIf="showDown===false">
                  <fc-radio [(ngModel)]="mainObj.VIEWPOSITION" fcLabel="相对位置" [fcAppid]="appId" fcFieldCode="VIEWPOSITION"  [fcValid]="mainValid.VIEWPOSITION" fcLabelCode="DICDESC"
                  fcValueCode="DICVALUE" name="VIEWPOSITION"  (ngModelChange)="componentEvents('viewpositionEvent',$event)"
                  fcHelp="与主模型的相对位置，并排，并列，并列后并排的相对位置"></fc-radio>
                  <fc-radio [(ngModel)]="mainObj.ENABLECACHE" fcLabel="关联缓存" [fcAppid]="appId" fcFieldCode="ENABLECACHE"  [fcValid]="mainValid.ENABLECACHE"  fcLabelCode="DICDESC"
                  fcValueCode="DICVALUE" name="ENABLECACHE"  (ngModelChange)="componentEvents('enablecacheEvent',$event)"></fc-radio>
              </div>     
              <fc-textarea fccontent1 fcLabel="备注" [(ngModel)]="mainObj.REMARK" name="REMARK" *ngIf="showDown===false"
              fchelp="请输入少于200字"></fc-textarea>
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
export class SysappmodalrelationdialogComponent extends ParentEditComponent {
  //显示展开收起图标,初始收起
  showDown: boolean;
  //依赖产品下拉属性
  scomDataItemOptions: any;
  //模型名称
  content: string;
  //传过来的对象
  @Input()
  fcrelationObj: any;
  /**
   * 初始化模型，产品对应的内容
   */
  constructor() {
    super('SYSTEM', 'SYSAPPLINKS');
  }
  init(): void {
    //初始化加载图标判断是否有图标
    SysappBusiness.applinksall().subscribe(result => {
      this.scomDataItemOptions = [];
      result.DATA.forEach(el => {
        let obj: any = {};
        obj.label = el.APPID + '-' + el.APPNAME;
        obj.value = el.APPID;
        obj.disabled = false;
        this.scomDataItemOptions.push(obj)
      })
    })
    this.showDown = true;
  }
  /**
   * 当发生改变的时候，mainObj重新赋值
   */
  ngOnChanges(): void {
    if (this.fcrelationObj !== undefined && this.fcrelationObj !== '') {
      if (this.fcrelationObj.event !== null) {//编辑卡片的弹窗事件
        this.mainObj = this.fcrelationObj.event;
       
      } else {//新增卡片的弹窗事件
        this.mainObj = {
          MAINAPP: '',
          LINKNAME: '',
          ITEMAPP: '',
          LINKFILTER: '',
          ENABLE: '',
          SORTBY: '',
          ICON: '',
          VIEWPOSITION: '',
          ENABLECACHE: '',
          REMARK: ''
        }
      }
       //模型名称
       this.content = this.fcrelationObj.str;
    }
  }
  addNew(mainObj: any): boolean {
    return true;
  }
  /**
  * 保存前验证
  */
  beforeSave(): boolean {
    this.mainObj.MAINAPP = this.content.split('-')[0];
    this.mainObj.SORTBY += "";
    return true;
  }
  event(eventName: string, param: any): void {
    switch (eventName) {
      //删除字体图标X
      case 'deleticonEvent':
        this.mainObj.ICON = "";
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
      //相对位置单选按钮
      case 'viewpositionEvent':
        this.mainObj.VIEWPOSITION = ev;
        break;
      //关系缓存单选按钮
      case 'enablecacheEvent':
        this.mainObj.ENABLECACHE = ev;
        break;
      //关系缓存单选按钮
      case 'ruletypeEvent':
        this.mainObj.ITEMAPP = ev.value;
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