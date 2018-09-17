
import { Component, AfterViewInit } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import SysproductBusiness from '../../business/sysproduct.business';
import { SysicondialogComponent } from '../dialog/sysicondialog.component';
import SystemBusiness from 'fccore2/classes/system.business';
import { SysappBusiness } from '../../business/sysapp.business';
import { FcEvent } from '../../../fcsamples2/business/fcsample.business';
import { FCEVENT } from 'fccomponent2/fc';
import { CommonService } from 'fccore2/common/common';
@Component({
  selector: 'sysproductedit',
  templateUrl: 'sysproductedit.component.html',
  styles: [`
  .sys-card-btn{
    width:25%;
  }
  .edit-footer-btn{
    text-align:center;
  }
  .sys-choose-icon{
    position:relative;
    height:100px; 
    margin-left: 2%;
  }
  .sys-choose-file{
    position:relative; 
    margin-left: 2%;
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
    border-radius: 7px;
  }
  .sys-choose-file fc-button{
    position:absolute;
    left:35%;
    top:45px;
  }
  .sys-radio{
    margin-left:34% ;
  }
  .sys-num{
    margin-right:9%;
  }
  .sys-proicon{
    display: inline-block;
    margin-left: 62%;
  }
  .sys-sqlaaid{
    display: inline-block;
    position: absolute;
    top: 25%;
    left: 25%;
    background: #fafafa;
    width: 15%;
    text-align: center;
    height: 23px;
    line-height: 23px;
    border-radius:2px;
  }
  :host ::ng-deep .sys-buttonpid .ant-form-item-control nz-input {
    width: 76%;
    margin-left: 24%;
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
    border-radius: 4px
  }
  .sys-tab{
    margin-left:26%;
  }
  .sys-fast-list>li{
    cursor:pointer;
  }
  .sys-button{
    display: flex;
    justify-content: center;
    padding-bottom:40px;
  }

  .sys-choose-file .sys-choose-file-upload{
    line-height: 22px;
    position: absolute; 
    left: 26%;
    top: 2px;
  }
  .sys-card-pannel .fc-content .sys-card-pannel-edit .sortNoBottomLine .fc-layoutcol {
    padding: 0px;
    border-bottom:none;
    margin-left：-6%；
  }
  .sys-card-pannel .fc-content .sys-card-pannel-edit .notitleLine .fc-layoutcol {
    border:none;
  }
  .sys-icon-upload{
    display: block;
    height: 20px;
  }
  .sys-uploadall{
    margin-top:-18%;
  }
  `]
})
export class SysproducteditComponent extends ParentEditComponent {
  //依赖产品下拉属性
  relyProductList: any;
  //上传属性
  fcUploadOption: { FILETYPE: string; SOURCEID: any; SOURCEAID: string; SOURCEFIELD: string; RESTITLE: string; };
  //是否是只读状态
  read: string;
  staticMainObj: any = {};
  /**
   * 初始化模型，产品对应的内容
   */
  constructor() {
    super('SYSTEM', 'SYSPRODUCT');
  }
  init(): void {
    //上传图片资源和地址
    this.fcUploadOption = {
      FILETYPE: "PIC",
      SOURCEID: this.routerParam.ID,
      SOURCEAID: "SYSPRODUCT",
      SOURCEFIELD: "",
      RESTITLE: ""
    };
    this.handleRouterParam();
    //初始化下拉菜单的值
    this.getProduct();
  }
  addNew(mainObj: any): boolean {
    return true;
  }
  /**
     * 实现继承与父类的afterSave函数，对cardSave函数进行功能扩展;
     */
  afterSave(): void {
    SystemBusiness.appService.findWithQuery("PRODUCT",{WHERE:"{PNAME:{eq:'"+this.mainObj.PNAME+"'}}"}).subscribe(res => {
      if (res.CODE === '0') { 
        this.navigate(this.getRouteUrl('Edit'), { ID: res.DATA[0].ID });
      }
    });
  }
  event(eventName: string, param: any): void {
    switch (eventName) {
      //fc-upload上传事件
      case 'fileEvent':
        //调用上传方法
        this.fileEvent(param);
        break;
      //+数据源事件
      case 'cardSql':
        this.navigate('/system/sysdatasourceEdit', { refresh: 'Y', PID: this.mainObj.PID })
        break;
      //+服务按钮事件
      case 'cardService':
        this.navigate('/system/sysserviceEdit', { refresh: 'Y', PID: this.mainObj.PID })
        break;
      // 点击查看数据源跳转至数据源管理
      case 'sqllistEvent':
        this.navigate('/system/sysdatasourceList', { refresh: 'Y', PID: this.mainObj.PID })
        break;
      //点击服务事件跳转至服务首页务管理
      case 'servicelistEvent':
        this.navigate('/system/sysserviceList', { refresh: 'Y', PID: this.mainObj.PID })
        break;
      //点击模型数据源事件跳转至模型数据源列表页面
      case 'applistEvent':
        this.navigate('/system/sysappList', { refresh: 'Y', PID: this.mainObj.PID })
        break;
      //点击返回列表跳转至首页
      case 'backlistEvent':
        this.navigate('/system/sysproductList', { refresh: 'Y', PID: this.mainObj.PID })
        break;
    }
  }

  /**
  * 上传图片文档方法
  * @param event  
  */
  fileEvent(event): void {
    switch (event.eventName) {
      case "success":
        SysproductBusiness.msgService.message("上传成功");
        break;
      case "failure":
        SysproductBusiness.msgService.message("上传失败");
        break;
    }
  }
    /**
   * 获取下拉菜单的值
   */
  getProduct(){
    //过滤fcproduct ENABLE 把PID-PNAME
    SystemBusiness.appService.findWithQuery("SYSPRODUCT",{WHERE:"{ENABLE:{eq:'Y'},PID:{ne:'"+this.routerParam.PID+"'}}"}).subscribe(res => {
      this.relyProductList = [];       
      res.DATA.forEach(element => {
        //将获得的产品名称添加到下拉框中
        this.relyProductList.push({ icon: '', label: element.PNAME, value: element.PID });
      });
      return this.relyProductList;
    });
}
  /**
    *  点击图标弹出列表方法
    * @param event  
    */
   selectIcon(): void {
    let token = CommonService.guid();
    CommonService.subscribe('selectIcon', (result) => {
      this.mainObj.ICON=result.param;
    });
  }
/**
* 组件事件收集
* @param type 字符串命名
* @param ev 事件传过来的参数
*/
  componentEvents(type: string, ev: any): void {
    switch (type) {
      case 'ruleaddEvent':
        this.mainObj.PARENTPID = ev;
        break;
      case 'displaymode':
        this.mainObj.DISPLAYMODE = ev;
        break;
      case 'enableEvent':
        this.mainObj.ENABLE = ev;
        break;
    }
  }
  /** YM
      * 处理路由传参的情况
      * @param pid 
      */
  handleRouterParam() {
    if (this.routerParam.ID) {
      SystemBusiness.appService.findWithQuery("SYSPRODUCT",{WHERE:"{ID:{eq:'"+this.routerParam.ID+"'}}"}).subscribe(res => {
        if (res.CODE === '0' && res.DATA.length !== 0) {  
          for (let attr in res.DATA[0]) {
            this.mainObj[attr] = res.DATA[0][attr];
          }
          for (let attr in this.mainObj) {
            this.staticMainObj[attr] = this.mainObj[attr];
          }
        } else {
          SysproductBusiness.msgService.error('基本信息获取失败');
        }
      })
    }
  }
}