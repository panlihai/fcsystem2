import { Component, OnInit } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SysappBusiness } from '../../business/sysapp.business';
import { FCEVENT } from 'fccomponent2/fc';
import CacheService from 'fccore2/common/cache';
import { CommonService } from 'fccore2/common/common';
import { Sysappbuttons } from 'fccore2/common/beanclass';
import SystemBusiness from 'fccore2/classes/system.business';
@Component({
  selector: 'sysappedit',
  templateUrl: `sysappedit.component.html`,
  styles: [`
  .sys-card-btn{
    width:50%;
  }
  :host ::ng-deep .fc-layoutpanel {
      padding:10px;
  }
  .place-div{
      height:42px;
  }
  .last-btn{
      height:42px;
      position:relative;
      right:95%;
  }
  .instructions{
    width:100%;
    margin-left:25%;
    display:block;
    color:#938e8e;
  }
  .instruction{
    width:100%;
    margin-left:50%;
    display:block;
    color:#938e8e;
  }
  .instruction-psize{
    margin-left:40%;
  }
  :host ::ng-deep .basicTlb .fc-tlbform{
    margin-top:20px;
  }
  :host ::ng-deep .noinstructions .ant-form-item-control {
    padding-bottom: 10px;
  }
  .sys-card-pannel .fc-content .sys-card-pannel-edit .noBottomLine .fc-layoutcol {
    padding: 0px;
    border-bottom:none;
  }
  .sys-card-pannel .fc-content .sys-card-pannel-edit .noBorder .fc-layoutcol {
    border:none;
  }
  .butType{
    font-size:16px;
    font-weigth:700;
  }
  .clearFloat{
    overflow:hidden;
    padding: 20px;
    background-color: #fff;
  }
  .attributeLeft{
    float:left;
    width:25%;
    padding: 0px 10px 0px 0px;
  }
  .widthCovered{
    width:100%;
  }
  .attributeRight{
    float:left;
    width:75%;
    border-left:1px solid #ebedf0;
    padding-left:10px;
    height: 300px;
    overflow: auto;
  }
  .addAttribute {
    width: 100%;
    height: 30px;    
    border: 1px dashed #d9d9d9;
    color:#d9d9d9;
    border-radius: 5px;
    line-height: 25px;
    padding-left: 10px;
    margin-bottom:10px;
}
  .sys-fast-list {
    cursor: pointer;
  }
  :host ::ng-deep .angular-tree-component {
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 79%;
  }
  .showSelectModel {
    height: 246px;
  }
  .SelectModelTop {
    height: 28px;
    line-height: 28px;
    text-align: left;
    color: #333;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
  }
  .showSelectModel .sys-modellist{
    height:calc(100% - 28px);
    overflow:auto;
  }
  .showSelectModel .sys-modellist>li:hover,.showSelectModel .sys-modellist>li:active{
    background-color:#e6f7ff;
    cursor:move;
  }

  :host ::ng-deep .widthCovered .fc-list{
    height:250px;
    overflow:auto;
  }
  :host ::ng-deep .sys-app .fc-title-in {
    margin-right: 40%;
  }
  :host ::ng-deep .fc-list-actions {
    color: #009DFF;
  }
  .widthCovered .demo-loadmore-list { 
    overflow: auto;
    height: 200px;
}
  `]
})
export class SysappeditComponent extends ParentEditComponent {
  // 字段弹窗token
  appFieldDailogToken = CommonService.guid();
  //产品下拉选项
  productOption: any[];
  //数据源下拉选项
  datasourceOption: any[];
  //模型事件
  sysEvents: any;
  //模型接口
  sysInterfaces: any;
  //模型关系
  sysLinks: any;
  //属性列表过滤
  condition: any;
  //模型配置
  modelOption: any = [];
  //表配置
  tableOption: any = [];
  //DSID
  DSID: string;
  //从模型中导入
  displayModel: boolean = false;
  //从表中导入
  displayTable: boolean = false;
  //物理表以及属性、事件、接口、关系显示
  isShow: boolean;
  //自定义下拉中选中的模型
  models: any = [];
  //自定义下拉数据的字段
  items: any = [];
  //选中的下拉数据对应的表
  tables: any = [];
  //模型关系按钮
  linkListButtons: Sysappbuttons[];
  //模型接口按钮
  interfaceListButtons: Sysappbuttons[];
  //模型事件按钮
  eventListButtons: Sysappbuttons[];
  //dialog对象
  dialogObj: any;
  //
  tableValue:any;
  /**
   * 初始化模型，产品对应的内容
   */
  constructor() {
    super('SYSTEM', 'SYSAPP');
  }
  init(): void {
    //初始化产品
    this.getproduct();
    //初始化数据源
    this.getdatasource();
    //当为编辑页面时初始化模型事件、接口、模型关系
    if (this.mainObj.APPID !== "") {
      this.show();
      this.getSysEvents(this.mainObj.APPID);
      this.getSysInterfaces(this.mainObj.APPID);
      this.getSysLinks(this.mainObj.APPID)
    }
    //根据条件过滤出对应的属性列表
    let con: any = {
      WHERE: "{APPID:{eq:'" + this.mainObj.APPID + "'}}",
      PAGESIZE: 9999,
      PAGENUM: 1
    }
    this.condition = JSON.stringify(con);
    //获取模型关系、模型事件、模型接口按钮
    this.linkListButtons = this.mainApp.P_APPLINKS ? SystemBusiness.appService.getListButtonsByAppid("SYSAPPLINKS") : [];
    this.interfaceListButtons = this.mainApp.P_APPLINKS ? SystemBusiness.appService.getListButtonsByAppid("SYSINTERFACE") : [];
    this.eventListButtons = this.mainApp.P_APPLINKS ? SystemBusiness.appService.getListButtonsByAppid("SYSAPPBUTTONS") : [];
  }
  addNew(mainObj: any): boolean {
    return true;
  }
  event(eventName: string, param: any): void {
    switch (eventName) {
      case 'addList':
        break;
    }
  }
  /**
  * 获取软件产品的产品名称
  */
  getproduct():void {
    SysappBusiness.getproduct().subscribe(res => {
      this.productOption = [];
      res.DATA.forEach(element => {
        //将获得的产品名称添加到下拉框中
        this.productOption.push({ icon: '', label: element.PNAME, value: element.PID });
      });
      return this.productOption;
    })
  }
  /**
  * 获取数据源
  */
  getdatasource():void {
    SysappBusiness.getdatasource().subscribe(result => {
      this.datasourceOption = [];
      result.DATA.forEach(element => {
        //将获得的数据源名称添加到下拉框中
        this.datasourceOption.push({ icon: '', label: element.DSNAME, value: element.DSID });
      });
      return this.datasourceOption;
    })
  }
  /**
  * 保存之后
  */
  afterSave():void {
    //保存之后获取本信息ID,并且进入对应ID页面
    SysappBusiness.getID(this.mainObj.APPID, this.mainObj.APPNAME).subscribe(res => {
      if (res.CODE === '0') {
        this.navigate(this.getRouteUrl('Edit'), { ID: res.DATA[0].ID, refresh: 'Y' });
      }
    })
    //新增页面保存之后物理表以及属性、事件、接口、关系显示
    this.show();
  }
  /**
  * 物理表以及属性、事件、接口、关系显示
  */
  show():void {
    this.isShow = true;
  }
  /**
  * 返回列表
  * @param event
  */
  backList(event:any):void {
    this.navigate(this.getRouteUrl('List'), event.param);
  }
  /** 
  * 处理路由传参的情况
  * @param pid 
  */
  handleRouterParam():void {
    if (this.routerParam.ID) {
      SystemBusiness.appService.findWithQuery('SYSAPP', { WHERE: "{ID:{eq:'" + this.routerParam.ID + "'}}" }).subscribe(res => {
        if (res.CODE === '0') {
          this.mainObj = res.DATA[0];
        } else {
          SysappBusiness.msgService.error('基本信息获取失败');
        }
      })
    }
  }
  /**模型-属性
   * 从模型中导入
   * @param  DATASOURCE(数据源)
   */
  selectAttributeByModel(param:any):void {
    //左侧显示内容
    this.displayModel = true;
    this.displayTable = false;
    //获取自定义下拉中的数据
    SystemBusiness.appService.findWithQuery("SYSAPP", { WHERE: "{DATASOURCE:{eq:'" + this.mainObj.DATASOURCE + "'}}" }).subscribe(res => {
      if (res.CODE === '0') {
        this.modelOption = res.DATA;
      }
    });
  }
  /**
   * 自定义下拉选择模型
   * @param  modelObjs
   */
  modelEvents(modelObj: any) {
    this.models = [];
    if (modelObj) {
      //通过appid获取appfield
      SysappBusiness.findAppFieldsByAppid(modelObj.APPID).subscribe(res => {
        if (res.CODE === '0') {
          this.models = res.DATA;
        }
      });
    }
  }
  /**模型-属性
   * 从表中导入
   * @param  DATASOURCE(数据源)
   */
  selectAttributeByTable() {
    //左侧显示模型
    this.displayTable = true;
    this.displayModel = false;
    //获取自定义下拉数据
    SysappBusiness.getTableOption(this.mainObj.DATASOURCE, this.mainObj.APPMODEL).subscribe(res => {
      if (res.CODE === '0') {
        this.tableOption = res.DATA;
      }
    });
  }
  /**
   * 选择自定义下拉模型
   * @param  tableObjs
   */
  tableEvents(tableObj: any):void {
    this.tables = [];
    if (tableObj) { 
      //获取模型字段
      SysappBusiness.getModelField(tableObj.MAINTABLE, this.mainObj.DATASOURCE, this.mainObj.APPMODEL).subscribe(res => {
        if (res.CODE === '0') {
          this.tables = res.DATA[tableObj.MAINTABLE];
        }
      });
    }
  }
  /** 
   * 模型-属性
   *列表里面编辑属性-弹窗
   *@param  ev
   *@param  str
   */
  listEvent(ev?: FCEVENT, str?: string):void {
    switch (ev.eventName) {
      case "listEdit":
        CommonService.event(this.appFieldDailogToken,{mainObj:ev.param,param:ev});
        break;
      case "listDelete":
      this.confirm('确定删除当前记录吗？',()=>{
        SystemBusiness.appService.deleteObject("SYSAPPFIELDS",ev.param.ID).subscribe(result=>{
          if(result.CODE==='0'){
            SystemBusiness.msgService.success("删除成功！");
          }else{
            SystemBusiness.msgService.error(result.MSG);
          }
        });
      },()=>{});
      break;
    }
  }
  /**
   * 获取模型事件-数据
   * @param appid APPID
   */
  getSysEvents(appid):void {
    SysappBusiness.getSysEvents(appid).subscribe(res => {
      if (res.CODE === '0') {
        this.sysEvents = res.DATA;
      } else {
        SysappBusiness.msgService.error('模型事件获取失败');
      }
    });
  }
  /** 
   *新增或编辑模型-事件卡片的弹窗
   *@param event 
   *@param str 
   */
  editModelEvent(event?: Object, str?: string):void {
    let obj = {
      event: event,
      str: str
    }
    //给弹窗里面的dialog对象赋值
    this.dialogObj = Object.assign({}, obj);
  }
  /**
   * 生成当前模型的标准事件
   */
  createStandardEvent(): void {
    SysappBusiness.createStandardEvent(this.appId).subscribe(result => {
      if (result.CODE === '0') {
        SystemBusiness.msgService.success('成功生成标准的事件');
        // 重新获取
        this.getSysEvents(this.appId);
      }
    });
  }
  /**
   * 获取模型接口-数据
   * @param appid APPID
   */
  getSysInterfaces(appid):void {
    SysappBusiness.getSysInterfaces(appid).subscribe(res => {
      if (res.CODE === '0') {
        this.sysInterfaces = res.DATA;
      } else {
        SysappBusiness.msgService.error('模型接口获取失败');
      }
    });
  }

  /** 
   *新增模型接口卡片
   */
  addModelInterface():void {
    this.navigate(this.getUrl(this.moduleId, 'SYSINTERFACE', 'Edit'), { refresh: 'Y', from: this.appId })
  }
  /** 
   *编辑模型接口卡片
   *@param event 
   */
  editModelInterface(event: any):void {
    //选中的对象
    let selectedObj: any = event;
    if (selectedObj && selectedObj !== null) {
      //把卡片的数据放入缓存中
      CacheService.setS('SYSINTERFACE' + "DATA", CommonService.cloneArray(this.sysInterfaces));
      //把id带入到编辑页面
      this.navigate(this.getUrl(this.moduleId, 'SYSINTERFACE', 'Edit'), { ID:event.ID, interfaceId: event.ID, from: this.appId, refresh: 'Y' });
    }
  }
  /**
   * 获取模型关系-数据
   * @param appid 对应的APPID
   */
  getSysLinks(appid):void {
    SysappBusiness.getSysLinks(appid).subscribe(res => {
      if (res.CODE === '0') {
        this.sysLinks = res.DATA;
      } else {
        SysappBusiness.msgService.error('模型关系获取失败');
      }
    });
  }
  /** 
   *新增或编辑模型关系卡片
   *@param event 
   *@param str 
   */
  editModelRelation(event?: Object, str?: string):void {
    let obj = {
      event: event,
      str: str
    }
    //给弹窗里面的dialog对象赋值
    this.dialogObj = Object.assign({}, obj);
  }
}
