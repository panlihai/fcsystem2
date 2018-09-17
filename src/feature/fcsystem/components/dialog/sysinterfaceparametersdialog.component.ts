import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SysinterfaceBusiness } from '../../business/sysinterface.business';
import SystemBusiness from 'fccore2/classes/system.business';
@Component({
  selector: 'sysinterfaceparametersdialog',
  template: `
  <div>
    <div class="bg-dialog-content">
         <fc-title fcLabel="参数配置-编辑" class="sys-card-pannel-title" fcHasLine="N"></fc-title>
         <div>编辑：编辑请求参数功能，配置参数的属性：包含参数名称、类型、是否必填、数值类型等</div>
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
                     <fc-text [fcLabel]="'服务名称'" [(ngModel)]="serviceName" [fcAppid]="appId" fcFieldCode="PID" [fcValid]="mainValid.PID"  name="PID" fcReadonly="Y"></fc-text>
                     <fc-text [fcLabel]="'接口名称'" [(ngModel)]="interfaceName"[fcAppid]="appId" fcFieldCode="IMPLID" [fcValid]="mainValid.IMPLID"  name="IMPLID" fcReadonly="Y"></fc-text>
                     <fc-text [fcLabel]="'参数编码'" fcPlaceHolder="请选择默认模型" [(ngModel)]="mainObj.PARAMNAME" 
                     [fcAppid]="appId" fcFieldCode="PARAMNAME"  [fcValid]="mainValid.PARAMNAME" name="PARAMNAME" fcHelp="默认模型">
                     </fc-text>
                     <fc-radio [(ngModel)]="mainObj.PARAMTYPE" fcLabel="参数类型" [fcAppid]="appId" fcFieldCode="PARAMTYPE" [fcValid]="mainValid.PARAMTYPE"  fcLabelCode="DICDESC"
                     fcValueCode="DICVALUE" name="PARAMTYPE"  (ngModelChange)="componentEvents('paramtypeEvent',$event)"
                     fcHelp="条件参数：自动作为条件；头部参数及数据参数：接口内部代码获取，统一在paramBean中获取">
                     </fc-radio>
                     <fc-radio [(ngModel)]="mainObj.VALUETYPE" fcLabel="值类型" [fcAppid]="appId" fcFieldCode="VALUETYPE" fcLabelCode="DICDESC"
                     fcValueCode="DICVALUE" [fcValid]="mainValid.IMPLID" name="VALUETYPE" (ngModelChange)="componentEvents('valuetypeEvent',$event)"
                     fcHelp="默认为启用"></fc-radio>
                     <fc-radio [(ngModel)]="mainObj.ISNULL" fcLabel="是否必填" [fcAppid]="appId" fcFieldCode="ISNULL" [fcValid]="mainValid.ISNULL"  fcLabelCode="DICDESC"
                     fcValueCode="DICVALUE" name="ISNULL" (ngModelChange)="componentEvents('isnullEvent',$event)"
                     fcHelp="默认为可以为空字符串"></fc-radio>
                     <fc-text fccontent1 fcLabel="帮助"  [(ngModel)]="mainObj.REMARK" [fcAppid]="appId" fcFieldCode="REMARK" 
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
export class SysinterfaceparametersdialogComponent extends ParentEditComponent {
  //接口名称
  interfaceName: any;
  //服务名称
  serviceName: any;
  constructor() {
    super('SYSTEM', 'SYSINTFREQPARAM');
  }
  //接收的对象
  @Input()
  fcParamObj:any;
  //初始化
  init(): void {
    this.mainObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
  }
  /**
   * 当发生改变的时候，mainObj重新赋值
   */
  ngOnChanges(): void {
    this.handleCustomParam(this.fcParamObj);
  }
  /**
   * 获取数据
   * @param param 
   */
  handleCustomParam(param) {
    //获取mainObj
    if (param.ID!==undefined&&param.ID!==''&&param.ID!==null) {
      SysinterfaceBusiness.appService.findWithQuery('SYSINTFRESPARAM',{WHERE:"{ID:{eq:'"+param.ID+"'}}"}).subscribe(res => {
        if (res.CODE === '0') {
          this.mainObj = res.DATA[0];
        }
      })
    } else {
      this.mainObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
    }
    //获取服务名称
    if (param.serviceId) {
      SysinterfaceBusiness.appService.findWithQuery('SYSINTFRESPARAM', {WHERE:"{ID:{eq:'"+param.serviceId+"'}}"}).subscribe(res => {
        if (res.CODE === '0') {
          this.serviceName = `${res.DATA[0].SERVICEID} - ${res.DATA[0].SERVICENAME} `;
        }
      })
    }
    //获取接口名称
    if (param.interfaceId) {
      SysinterfaceBusiness.appService.findWithQuery('SYSINTFRESPARAM', {WHERE:"{ID:{eq:'"+param.interfaceId+"'}}"}).subscribe(res => {
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
    switch (eventName) {
      //保存按钮
      case 'emitDataOutside':
        this.cardSave(param);
        break;
      //参数类型
      case 'paramtypeEvent':
        this.mainObj.PARAMTYPE = param;
        break;
      //值类型
      case 'valuetypeEvent':
        this.mainObj.VALUETYPE = param;
        break;
      //是否必填
      case 'isnullEvent':
        this.mainObj.ISNULL = param;
        break;
      case 'close':
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
      //参数类型
      case 'paramtypeEvent':
        this.mainObj.PARAMTYPE = ev;
        break;
      //值类型
      case 'valuetypeEvent':
        this.mainObj.VALUETYPE = ev;
        break;
      //是否必填
      case 'isnullEvent':
        this.mainObj.ISNULL = ev;
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