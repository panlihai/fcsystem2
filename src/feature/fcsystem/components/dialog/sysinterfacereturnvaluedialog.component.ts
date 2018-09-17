import { Component, Input } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SysinterfaceBusiness } from '../../business/sysinterface.business';
import SystemBusiness from 'fccore2/classes/system.business';
@Component({
  selector: 'sysinterfacereturnvaluedialog',
  template: `
  <div>
    <div class="bg-dialog-content">
         <fc-title fcLabel="返回值配置-编辑" class="sys-card-pannel-title" fcHasLine="N"></fc-title>
         <div>编辑：指定返回值及其类型等</div>
           <div class="sys-card-fast">
             <ul class="sys-fast-list">
                 <li class="sys-icon-btn"  (click)="event('close')">
                     <fc-icon fcIcon="fc-icon-close" fcColor="#009DFF"></fc-icon>关闭
                 </li>
             </ul>
           </div>
         <form fccontent>
         <fc-layoutpanel fccontent id="id0">
             <fc-title fcLabel="基本信息" fcWidth="96%" fcheader  fcHasLine="N"></fc-title>
             <fc-layoutcol fcSpans="1,0" fccontent>
                 <div fccontent1>
                     <fc-text [fcLabel]="'服务名称'" fcReadonly="Y"  [(ngModel)]="serviceName" [fcAppid]="appId" fcFieldCode="PID" [fcValid]="mainValid.PID"name="PID" ></fc-text>
                     <fc-text [fcLabel]="'接口名称'" fcReadonly="Y"  [(ngModel)]="interfaceName" [fcAppid]="appId" fcFieldCode="IMPLID"   [fcValid]="mainValid.IMPLID"
                     name="IMPLID" fcHelp="被关联的模型名称" ></fc-text>
                     <fc-text [fcLabel]="'参数编码'" fcPlaceHolder="请选择默认模型" [(ngModel)]="mainObj.PARAMNAME" 
                     [fcAppid]="appId" fcFieldCode="PARAMNAME" [fcValid]="mainValid.PARAMNAME" name="PARAMNAME" fcHelp="默认模型"></fc-text>
                     <fc-radio [(ngModel)]="mainObj.VALUETYPE" fcLabel="值类型" [fcAppid]="appId" fcFieldCode="VALUETYPE" [fcValid]="mainValid.VALUETYPE"  fcLabelCode="DICDESC"
                     fcValueCode="DICVALUE" name="VALUETYPE" (ngModelChange)="componentEvents('valuetypeEvent',$event)"
                     fcHelp="默认为启用"></fc-radio>
                     <fc-text fcLabel="帮助" [(ngModel)]="mainObj.REMARK" [fcAppid]="appId" fcFieldCode="PARAMNAME"  
                      fcPlaceHolder="填写帮助内容" name="REMARK" fcHelp="描述参数的含义"></fc-text>
                 </div>               
             </fc-layoutcol>
         </fc-layoutpanel>
     </form>
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
    top: 3%;
    left: 37.7%;
    z-index: 999;
    cursor: pointer;
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
  `]
})
export class SysinterfacereturnvaluedialogComponent extends ParentEditComponent {
  //接口名称
  interfaceName: any;
  //服务名称
  serviceName: any;
  constructor() {
    super('SYSTEM', 'SYSINTFRESPARAM');
  }
  //接收的对象
  @Input()
  fcReturnValueObj:any;
  //初始化
  init(): void {
    this.mainObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
  }
  /**
   * 当发生改变的时候，mainObj重新赋值
   */
  ngOnChanges(): void {
    this.handleCustomParam(this.fcReturnValueObj);
  }
   /**
   * 获取数据
   * @param param 
   */
  handleCustomParam(param) {
    //获取mainObj
    if (param.ID!==undefined&&param.ID!==''&&param.ID!==null) {//修改页面
      SysinterfaceBusiness.appService.findWithQuery('SYSINTFRESPARAM', { ID: param.ID }).subscribe(res => {
        if (res.CODE === '0') {
          this.mainObj = res.DATA[0];
        }
      })
    } else {//新增页面
      this.mainObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
    }
    //获取服务名称
    if (param.serviceId) {
      SysinterfaceBusiness.appService.findWithQuery('SYSSERVICE', { ID: param.serviceId }).subscribe(res => {
        if (res.CODE === '0') {
          this.serviceName = `${res.DATA[0].SERVICEID} - ${res.DATA[0].SERVICENAME} `;
        }
      })
    }
    //获取接口名称
    if (param.interfaceId) {
      SysinterfaceBusiness.appService.findWithQuery('SYSINTERFACE', { ID: param.interfaceId }).subscribe(res => {
        if (res.CODE === '0') {
          this.interfaceName = `${res.DATA[0].REQWAY} - ${res.DATA[0].IMPLNAME}`
        }
      })
    }
  }
  addNew(mainObj: any): boolean {
    return true;
  }
  event(eventName: string, param: any): void {
  }
  /**
  * 组件事件收集
  * @param type 字符串命名
  * @param ev 事件传过来的参数
  */
  componentEvents(type: string, ev: any) {
    switch (type) {
      //值类型
      case 'valuetypeEvent':
        this.mainObj.VALUETYPE = ev;
        break;
    }
  }
  //确定按钮
  emitDataOutside(ev) {
    if (this.mainObj.ID === undefined) {
      //新增模态框数据新增到子表中  
      SysinterfaceBusiness.childrensave(this.mainObj);
    } else {
      //修改子表数据
      SysinterfaceBusiness.childrenupdate(this.mainObj);
    }
  }
}