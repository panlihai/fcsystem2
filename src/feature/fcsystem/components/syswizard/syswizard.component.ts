import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import { FCEVENT } from 'fccomponent2/fc';
import { SysappBusiness } from '../../business/sysapp.business';
import { SyswizardBusiness } from '../../business/syswizard.business';
@Component({
  selector: 'syswizard',
  templateUrl: './syswizard.component.html',
  styles: [`
  .sys-wizard-card{
    position:relative;
    margin-bottom:10px;
  }
  .sys-card-footer{
    padding:5px 20px;
  }
  .sys-title-right{
    position:absolute;
    right:10px;
    top:5px;
  }
  .sys-basic-info{
    display:flex;
    justify-content:space-between;
    padding:20px;
    box-sizing:border-box;
    height:152px;
  }
  .sys-info-user{
    display:flex;
    justify-content:flex-start;
  }
  .sys-info-user img{
    width:60px;
    height:60px;
    border-radius:50%;
    margin-right: 20px;
  }
  .sys-info-text .sys-info-title{
    font-size:22px;
    color:#333333;
  }
  .sys-info-text .sys-info-smarks{
    color:#999999;
    font-size:16px;
    margin-top:15px;
  }
  .sys-info-count{
    display:flex;
    justify-content:flex-end;
    margin-right:40px;
    align-items: center;
  }
  .sys-info-count .sys-info-count-every{
    text-align:center;
    padding:0 20px;
  }
  .sys-info-count .sys-info-count-every .sys-count-text{
    display:block;
    font-size:16px;
    color:#999999;
  }
  .sys-info-count .sys-info-count-every .sys-count-number{
    display:block;
    font-size:30px;
    color:#333333;
  }
  .sys-team{
    display:flex;
    flex-wrap:wrap;
    padding-left:10px;
  }
  .sys-team>li{
    width:50%;
    height:40px;
    display:flex;
    justify-content:flex-start;
  }
  .sys-team img{
    width:30px;
    height:30px;
    border-radius:50%;
    margin-right:10px;
  }
  :host ::ng-deep .sys-wizard .fc-title{
    border-color: #ebedf0;
    margin-top: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom:0;
  }
  :host ::ng-deep .sys-wizard .sys-wizard-navlink .fc-subtitle{
   display:none;
  }
  :host ::ng-deep .fc-content2>.sys-wizard-content2 {
    padding-left:10px;
  }
  :host ::ng-deep  .sys-wizard-card>.ant-card>.ant-card-body{
    padding:0;
  }
  .ant-card-bordered{

  }
  :host ::ng-deep .fastnav-add .ant-btn-dashed {
    color: #1890ff;
    background-color: #fff;
    border-color: #1890ff;
    border-style: dashed;
  }
  .sys-wizard-card .sys-card .ant-card {
    box-shadow:none;
  }
  `]
})
export class SyswizardComponent extends ParentlistComponent {
  //链接
  links: any;
  //模态框快速导航
  currentModal_navLink: any;
  //navLink 标签
  navLinks: any;
  //产品数据
  serviceList: any[];
  //快速
  navLinkListCondition: any;
  constructor() {
    super();
  }
  init() {
    //初始化服务
    this.initService();
  }
  /**
   * 初始化服务
   */
  initService() {
    SyswizardBusiness.getService().subscribe(result => {
      if (result.CODE === '0') {
        this.serviceList = result.DATA;
      }
    })
  }
  /**
   * 
   */
  getDefaultQuery() {

  }
  /**
   * 
   * @param eventName 
   * @param context 
   */
  event(eventName: string, context: any): void {

  }
  // 访问指数
  public radarChartLabels: string[] = ['口碑', '引用', '产量', '贡献', '热度'];

  public radarChartData: any = [
    { data: [65, 59, 90, 81, 56], label: '个人' },
    { data: [28, 48, 40, 19, 96], label: '团队' },
    { data: [28, 48, 40, 19, 96], label: '部门' }
  ];
  public radarChartType: string = 'radar';
  /**
   * 访问指数点击
   * @param e 
   */
  public chartClicked(e: any): void {
  }
  /**
   * 访问指数鼠标滑过
   * @param e 
   */
  public chartHovered(e: any): void {
  }
  /**
   * 列表事件
   * @param event 
   */
  fclistEvent(event: FCEVENT) {

  }
}