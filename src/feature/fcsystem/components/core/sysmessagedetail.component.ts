import { Component } from '@angular/core'; 
import { FCEVENT } from 'fccomponent2/fc';
import { ParentDetailComponent } from 'fccomponent2'; 
import { SysmessageService, Sysmessage } from '../../services/sysmessage.service'; 
import { CommonService } from 'fccore2/common/common'; 
import SystemBusiness from 'fccore2/classes/system.business';
@Component({
  selector: 'sysmessagedetail',
  template: `

  `,
  styles: [`
 :host ::ng-deep .fc-layoutcol {
    height:100%;
  }
  :host ::ng-deep .fc-layoutgroup{
    height: calc(100% - 40px);    
  }
  :host ::ng-deep .fc-layoutgroup .fc-content {
    height:100%;
  }
  :host ::ng-deep .fc-layoutpanel .fc-content {
    height:100%;
  }
  :host ::ng-deep .fc-layoutpanel .fc-content .fc-content1{
    height:100%;
  }
  :host ::ng-deep .fc-layoutpanel .fc-content .fc-content1>fc-timeline>div{
    height:calc(100% - 44px);
    overflow:auto;
  }
  :host ::ng-deep .fc-layoutpanel .fc-content .fc-content1 nz-tabset{
    height:100%;
  }
  :host ::ng-deep .fc-layoutpanel .fc-content .fc-content2{
    height:100%;
    overflow:auto;
    padding-left: 20px;
    border-left:5px solid #ffffff;
  }
  :host ::ng-deep .ant-tabs-content{
    height: calc(100% - 60px);
    overflow: auto;
    margin-top: 30px;
  }
  .list-search {
    width:100%;
  }
  .list-search:after{
    content:'';
    display:block;
    clear:both;
  }
  .list-search-every{
    width:24%;
    float:left;
  }
  :host ::ng-deep .messagedetail>.fc-layoutpanel{
    height:100%;
  }
  :host ::ng-deep .margin-top15>button{
    margin-top:15px;
  }
  :host ::ng-deep .messagedetail .fc-title{
    margin-left:0px;
  }
  :host ::ng-deep .ant-tabs-nav{
    width:100%;
  }
  :host ::ng-deep .ant-tabs-nav>.ant-tabs-tab{
    width:50%;
    text-align:center;
    margin-right:0px;
  }
  .tagselect{
    position: absolute;
    right: 10px;
    top: 15px;
  }
  .messagedetail .main-title{
    min-height:30px;
    font-size:14px;
    font-weight:bold;
  }
  .messagedetail .main-content{
    min-height:30px;
  }
  .mesagge-time{
    margin-left: 10px;
    font-size: 14px;
  }
  .messagelist{
    margin-top:10px;
  }
  .messagecontent{
    font-size: 13px;
    color: #333;
  }
  `]
})
export class SysmessagedetailComponent extends ParentDetailComponent {
  selectedId: any;
  sysmessageList: Sysmessage[];
  //消息过滤标签
  tagMessage: any[] = [
    { id: 1, label: '全部', color: 'white' },
    { id: 2, label: '已读', color: 'blue' },
    { id: 3, label: '未读', color: 'red' },
  ]
  //回复的消息
  feedBackObj: Sysmessage;
  //消息配置
  timelineOption:any = {
    fcAppid: '',
    fcLabelCode: 'TS',
    fcTitleCode: 'TITLE',
    fcSmarkCode: 'CONTENT',
    fcColorCode: 'TYPE',
    fcReadCode: 'ISREAD',
    fcValues:[],
    fcId: 'ID'
  }
  //全部消息标签颜色
  allmessageColor: string;
  //全部消息标签颜色
  isreadColor: string;
  //全部消息标签颜色
  noreadColor: string;
  constructor(public mainService:SysmessageService) {
    super();
  }
  init(): void {
    //初始化时间轴的消息
    this.mainService.getMessageBy({}).subscribe(result => {
      if (result.CODE === '0') {
        this.timelineOption.fcValues = result.DATA;
        this.timelineOption.fcValues.forEach(element => {
          if (element.TS !== null && element.TS !== '') {
            element.TS = CommonService.timestampFormat(Number.parseInt(element.TS) * 1000, 'yyyy-MM-dd hh:mm:ss') + "";
          }
        })
      }
    });
    //初始化消息详情
    this.mainService.initMainObj("SYSMESSAGE",this.routerParam.PARAM)
      .subscribe(result => {
        if (result.CODE === '0') {
          this.mainObj = result.DATA;
          if (this.mainObj.TS !== null && this.mainObj.TS !== '') {
            this.mainObj.TS = CommonService.timestampFormat(Number.parseInt(this.mainObj.TS) * 1000, 'yyyy-MM-dd hh:mm:ss') + "";
          }
          this.initFeedBack();
        }
      });
    this.feedBackObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
    this.allmessageColor = "#108ee9";
    this.isreadColor = "blue";
    this.noreadColor = "blue";
  }
  /**
   * 事件
   * @param eventName 
   * @param param 
   */
  event(eventName: string, param: any): void {

  }
  /**
   * 点击回复内容
   */
  postFeedback():void {
    this.sysmessageList.push(this.feedBackObj);
    this.mainService.feedBack(this.feedBackObj, this.mainObj).subscribe(result => {
      if (result.CODE === '0') {
        SystemBusiness.msgService.message("回复成功");
      } else {
        SystemBusiness.msgService.error("回复失败");
      }
    });
  }
  /**
   * 初始化已回复内容
   */
  initFeedBack() {
    this.selectedId = this.mainObj.ID;
    SystemBusiness.appService.findWithQuery("SYSMESSAGE",{ SOURCEAID: 'SYSMESSAGE', SOURCEID: this.mainObj.ID, ORDER: 'TS DESC' }).subscribe(result => {
      if (result.CODE === '0') {
        this.sysmessageList = result.DATA;
        this.sysmessageList.forEach(element => {
          if (element.POSTTIME !== null && element.POSTTIME !== '') {
            element.POSTTIME = CommonService.timestampFormat(Number.parseInt(element.TS) * 1000, 'yyyy-MM-dd hh:mm:ss') + "";
          }
        })
      }
    });
  }
  /**
   * 时间轴事件
   * @param event 
   */
  timelineEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'selected'://选中
        this.mainObj = event.param;
        this.initFeedBack();
        break;
    }
  }
  /**
   * 全部消息
   */
  allmassageCondition() {
    this.mainService.getMessageBy({}).subscribe(result => {
      if (result.CODE === '0') {
        this.timelineOption.fcValues = result.DATA;
        this.timelineOption.fcValues.forEach(element => {
          if (element.TS !== null && element !== '') {
            element.TS = CommonService.timestampFormat(Number.parseInt(element.TS) * 1000, 'yyyy-MM-dd hh:mm:ss') + "";
          }
        })
      }
    });
    this.allmessageColor = "#108ee9";
    this.isreadColor = "blue";
    this.noreadColor = "blue";
  }
  /**
   * 过滤已读消息
   */
  isreadCondition() {
    this.mainService.getMessageBy({ ISREAD: 'Y' }).subscribe(result => {
      if (result.CODE === '0') {
        this.timelineOption.fcValues = result.DATA;
        this.timelineOption.fcValues.forEach(element => {
          if (element.TS !== null && element !== '') {
            element.TS = CommonService.timestampFormat(Number.parseInt(element.TS) * 1000, 'yyyy-MM-dd hh:mm:ss') + "";
          }
        })
      }
    });
    this.allmessageColor = "blue";
    this.isreadColor = "#108ee9";
    this.noreadColor = "blue";
  }
  /**
   * 过滤未读消息
   */
  noreadCondition() {
    this.mainService.getMessageBy({ ISREAD: 'N' }).subscribe(result => {
      if (result.CODE === '0') {
        this.timelineOption.fcValues = result.DATA;
        this.timelineOption.fcValues.forEach(element => {
          if (element.TS !== null && element !== '') {
            element.TS = CommonService.timestampFormat(Number.parseInt(element.TS) * 1000, 'yyyy-MM-dd hh:mm:ss') + "";
          }
        })
      }
    });
    this.allmessageColor = "blue";
    this.isreadColor = "blue";
    this.noreadColor = "#108ee9";
  }
}
