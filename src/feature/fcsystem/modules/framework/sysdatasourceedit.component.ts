import { Component } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import SysdatasourceBusiness from '../../business/sysdatasource.business';
import SystemBusiness from 'fccore2/classes/system.business';
import { CommonService } from 'fccore2/common/common';
@Component({
  selector: 'sysdatasource',
  templateUrl: './sysdatasourceedit.component.html',
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
  .sys-choose-icon fc-button{
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
    top: 15%;
    left: 25%;
    background: #fafafa;
    width: 15%;
    text-align: center;
    height: 29px;
    line-height: 23px;
    border-radius: 2px;
    border:1px solid #ebedf0;
  }
  :host ::ng-deep .sys-buttonpid .ant-form-item-control nz-input {
    width: 100%;
    padding-left: 22%;
  }
  .sys-deleticon{
    background: #108ee9;
    width: 14px;
    text-align: center;
    position: absolute;
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
    padding-top:20px;
    padding-bottom:40px;
  }
  .sys-card-pannel .fc-content .sys-card-pannel-edit .noBottomLine .fc-layoutcol {
    padding: 0px;
    border-bottom:none;
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
export class SysdatasourceeditComponent extends ParentEditComponent {
  //密码是否显示
  passwordVisable: boolean = true;
  //依赖产品下拉属性
  relyDatasourceList: any;
  // 存储数据源id，pid+id
  dsid:string;
  staticMainObj: any = {};
  /**
   * 初始化模型，产品对应的内容
   */
  constructor() {
    super('SYSTEM', 'SYSDATASOURCE');
  }
  /**
 * 继承父累addNew
 */
  addNew(mainObj: any): boolean {
    return true;
  }
  /**
  * 初始化模型，数据内容
  */
  init(): void {
    //下拉框显示自己想要动态传入的label和value值 
    this.getProduct();
    // 修改为默认的id
    this.dsid=this.mainObj.DSID.replace(this.mainObj.PID,'');
    
  }
  /**
      * 实现继承与父类的afterSave函数，对cardSave函数进行功能扩展;
      */
  afterSave(): void {
  }
  /**
  * 获取下拉菜单的值
  */
  getProduct():void {   
    //过滤fcproduct ENABLE 把PID-PNAME
    SystemBusiness.appService.findWithQuery("SYSPRODUCT", {WHERE:"{ENABLE:{eq:'Y'}}"}).subscribe(res => {
      this.relyDatasourceList = [];
      res.DATA.forEach(element => {
        //将获得的产品名称添加到下拉框中
        this.relyDatasourceList.push({ icon: '', label: element.PNAME, value: element.PID });
      });
      return this.relyDatasourceList;
    });
  }
  /**
   * 主对象的事件
   * @param eventName 事件名 
   * @param context 返回参数
   */
  event(eventName: string, param: any): void {
    switch (eventName) {
      //跳转至模型路由
      case 'btnCardAddModel':
        this.navigate('/system/sysappEdit', { refresh: 'Y', PID: this.mainObj.PID, DSID: this.mainObj.DSID })
        break;
      //返回列表
      case 'backToList':
        this.navigate('/system/sysdatasourceList');
        break;
      //点击服务事件跳转至服务首页务管理
      case 'servicelistEvent':
        this.navigate('/system/sysserviceList', { refresh: 'Y', PID: this.mainObj.PID, DSID: this.mainObj.DSID })
        break;
      //点击模型数据源事件跳转至模型数据源列表页面
      case 'applistEvent':
        this.navigate('/system/sysappList', { refresh: 'Y', PID: this.mainObj.PID, DSID: this.mainObj.DSID })
        break;
      case 'passwordEvent':
        this.passwordShow();
        break;
    }
  }
  beforeSave():boolean{
    this.mainObj.DSID = this.mainObj.PID+this.dsid;
    return true;
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
      //PID下拉框选中值
      case 'ruleaddEvent':
        this.mainObj.PID = ev;
        break;
      //数据源信息下拉框
      case 'ruletypeEvent':
        this.mainObj.DSTYPE = ev.DICVALUE;
        break;
      case 'enableEvent':
        this.mainObj.ENABLE = ev;
        break;
    }
  }
  /**
* @param type 
* @param ev  密码是否显示
*/
  passwordShow(): void {
    this.passwordVisable = !this.passwordVisable;
  }
  /** YM
   * 处理路由传参的情况
   * @param pid 
   */
  handleRouterParam(): void {
    if (this.routerParam.ID) {
      SystemBusiness.appService.findWithQuery("SYSDATASOURCE", {WHERE:"{ID:{eq:'"+this.routerParam.ID+"'}}"}).subscribe(res => {
        if (res.CODE === '0' && res.DATA.length !== 0) { 
          for (let attr in res.DATA[0]) {
            this.mainObj[attr] = res.DATA[0][attr];
          }
          for (let attr in this.mainObj) {
            this.staticMainObj[attr] = this.mainObj[attr];
          }
        } else {
          SysdatasourceBusiness.msgService.error('基本信息获取失败');
        }
      })
    }
  }
}