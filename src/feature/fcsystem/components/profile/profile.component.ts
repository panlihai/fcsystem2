import { Component, ViewChild } from '@angular/core';
import { ParentlistComponent, FclistdataComponent } from 'fccomponent2';
import SysprofileBusiness from '../../business/sysprofile.business';
import SystemBusiness from 'fccore2/classes/system.business';
import { FCEVENT } from 'fccomponent2/fc';
import { CommonService } from 'fccore2/common/common';
import { environment } from '../../../../environments/environment';
@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styles: [`
    .personel{
        height:100%;
      }
      .personel-avatar{
        text-align:center;
      }
      :host ::ng-deep .personel-avatar .fc-avatar{
        width: 100px;
        height: 100px;
        margin-top:20px;
        border-radius: 50%;
        cursor:pointer;
        position:relative;
      }
      :host ::ng-deep .personel-avatar .fc-avatar:after{
        content: '点击上传';
        width: 100%;
        display: block;
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -16px;
        display:none;
      }
      :host ::ng-deep .upload-avatar .fc-avatar:after{
        content: '点击上传';
      }
      :host ::ng-deep .edit-avatar .fc-avatar:after{
        content: '点击修改';
      }
      :host ::ng-deep .personel-avatar .fc-avatar:before{
        content: '';
        width: 100%;
        height:100%;
        display: block;
        background-color:#000;
        opacity:0.18;
        position: absolute;
        top: 0;
        left:0;
        display:none;
      }
      :host ::ng-deep .personel-avatar .fc-avatar:hover::before,
      :host ::ng-deep .personel-avatar .fc-avatar:hover::after{
        display:block;
      }
      .text-center{
        text-align:center;
      }
      .personel-user{
        color:#000000;
        font-size:20px;
      }
      .personel-account{
        font-size:20px;
        font-weight: 300;
        color: #526069;
        display:block;
      }
      .account-stat-count+span {
        color: #a3afb7;
      }
      .personel-title span{
        font-size: 18px;
        font-weight: 700;
      }
      .sys-card{
        background-color:#fff;
        padding:0 10px 10px;
        border-radius:4px;
        box-shadow:0 1px 6px rgba(0,0,0,.2);
        position:relative;
      }
      .widget{
        width:100%;
        height:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
      }
      .widget-text{
        text-align:right;
        margin-right:20px;
      }
      .widget-text-title{
        font-size:20px;
      }
      .widget-circle{
        width:56px;
        height:56px;
        line-height:56px;
        border-radius:50%;
        text-align:center;
        margin-left:20px;
      }
      .widget-text-number{
        font-size:22px;
        cursor:pointer;
      }
      .widget-circle1{
        background-color:#FF4D55;
      }
      .widget-circle2{
        background-color:#007EFF;
      }
      .widget-circle3{
        background-color:#52CC7A;
      }
      .widget1 .widget-text-number{
        color:#FF4D55;
      }
      .widget2 .widget-text-number{
        color:#007EFF;
      }
      .widget3 .widget-text-number{
        color:#52CC7A;
      }
      :host ::ng-deep .fc-full>.fc-content>fc-layoutcol>.fc-layoutcol, 
      :host ::ng-deep .fc-full>.fc-content>fc-layoutcol>.fc-layoutcol>.fc-content1,  
      :host ::ng-deep .fc-full>.fc-content>fc-layoutcol>.fc-layoutcol>.fc-content2,
      :host ::ng-deep .left>.fc-layoutrow>div>div{
        height: 100%;
      }
      :host ::ng-deep .sysprofile-tab nz-tabset{
        height:100%;
      }
      :host ::ng-deep .sysprofile-tab .ant-tabs-content{
        height: calc(100% - 40px);
      }
      :host ::ng-deep .sysprofile-tab .ant-tabs-tabpane,
      :host ::ng-deep .sysprofile-tab .ant-tabs-tabpane>div,
      .sysprofile-list, .personelinfo{
        width:100%;
        height:100%;
      }
      .view-personelinfo,.edit-personelinfo{
        height: 100%;
        overflow:hidden;
      }
      :host ::ng-deep .sysprofile-list .fc-list,
      :host ::ng-deep .personelinfo .personelinfo-content{
        width: 100%;
        height: calc(100% - 40px);
        overflow-y: auto;
        overflow-x: hidden;
      }
      .footer-btn{
        width: 100%;
        text-align: center;
      }
  `]
})
export class ProfileComponent extends ParentlistComponent {
    constructor() {
        super("SYSTEM", "SYSUSER");
    }
   //选项卡
  tabmain = [
    { name: '待办任务', disabled: false, icon: 'fc-icon-picture' },
    { name: '消息', disabled: false, icon: 'fc-icon-information' },
    { name: '个人信息', disabled: false, icon: 'fc-icon-users' },
    { name: '常用功能', disabled: false, icon: 'fc-icon-repository' },
    { name: '修改密码', disabled: false, icon: 'fc-icon-reset' },
    { name: '日志', disabled: false, icon: 'fc-icon-log' }
  ];
  //密码重置
  lastPwd: string;
  newPwd: string;
  mainValid: any = {};
  //快速导航，过滤 
  navLinkListCondition: any;
  links: any;
  @ViewChild("navLink_listdata") navLink_listdata: FclistdataComponent;
  currentModal_navLink: any;
  //navLink 标签
  navLinks: any;
  //个人信息修改
  personelEdit: boolean = false;
  //用户信息
  userInfo: any;
  //在线用户
  signinTime: string;
  //人员
  sysemployeeObj: any;
  //用户
  sysuserObj: any;
  //部门
  //单位
  syscompanyObj: any;
  //消息分页总数
  msgPageTotal: number;
  //消息分页索引
  msgPageNum: number;
  //消息分页大小
  msgPageSize: number;
  //待办任务分页总数
  taskPageTotal: number;
  //待办任务分页索引
  taskPageNum: number;
  //待办任务分页大小
  taskPageSize: number;
  //日志分页总数
  logPageTotal: number;
  //日志分页索引
  logPageNum: number;
  //日志分页大小
  logPageSize: number;
  //消息过滤
  msglistCondition: string;
  //待办过滤
  tasklistCondition: string;
  //日志过滤
  loglistCondition: string;
  //重置密码对象
  passwordObj: any;
  //头像区域的用户名
  avaterUserName: string;
  //头像区域的备注
  avaterUserRemark: string;
  //用户头像
  userAvatar: string;
  init(): void {
    if (this.userAvatar === undefined) {
      this.userAvatar = '';
    }
    //获取登录时间
    SysprofileBusiness.getSigninTime().subscribe(result => {
      if (result.CODE === '0') {
        this.signinTime = result.DATA.LOGTIME;
      }
    })
    //快速导航
    // this.initNavLink();
    //消息
    this.msgPageNum = 1;
    this.msgPageSize = 20;
    this.msgPageTotal = 0;
    this.initMsg();
    //待办
    this.taskPageNum = 1;
    this.taskPageSize = 20;
    this.taskPageTotal = 0;
    this.initTask();
    //日志
    this.logPageNum = 1;
    this.logPageSize = 20;
    this.logPageTotal = 0;
    this.initLog();
    //人员信息
    SysprofileBusiness.getSysemployee().subscribe(result => {
      if (result.CODE === '0') {

      }
    })
    //用户表
    this.sysuserObj = this.userInfo;
    //头像区域的用户名
    this.avaterUserName = this.userInfo.NAME;
    //头像区域的备注
    this.avaterUserRemark = this.userInfo.REMARK;
  }

  getDefaultQuery() {
  }
  event(eventName: string, context: any): void {
  }
  /**
   * 初始化消息
   */
  initMsg() {
    SysprofileBusiness.getSysmsg(this.msgPageNum, this.msgPageSize).subscribe(result => {
      if (result.CODE === '0') {
        this.msgPageTotal = result.TOTALSIZE;
      }
    })
    this.msglistCondition = '{"PAGESIZE":"' + this.msgPageSize + '","PAGENUM":"' + this.msgPageNum + '"}';
  }
  /**
   * 初始化待办任务
   */
  initTask() {
    SysprofileBusiness.getSystask(this.taskPageNum, this.taskPageSize).subscribe(result => {
      if (result.CODE === '0') {
        this.taskPageTotal = result.TOTALSIZE;
      }
    })
    this.tasklistCondition = '{"PAGESIZE":"' + this.taskPageSize + '","PAGENUM":"' + this.taskPageNum + '"}';
  }
  /**
   * 初始化日志
   */
  initLog() {
    SysprofileBusiness.getSyslog(this.logPageNum, this.logPageSize).subscribe(result => {
      if (result.CODE === '0') {
        this.logPageTotal = result.TOTALSIZE;
      }
    })
    this.loglistCondition = '{"PAGESIZE":"' + this.logPageSize + '","PAGENUM":"' + this.logPageNum + '"}';
  }
  /**
   * 重置密码
   */
  resetPwd() {
    SysprofileBusiness.doReset({ lastPwd: this.lastPwd, newPwd: this.newPwd });
  }
  /**
   * 修改个人信息
   */
  editPersonelinfo() {
    this.personelEdit = true;
  }
  /**
   * 保存个人信息
   */
  savePersonelinfo() {
    //预览个人信息
    this.personelEdit = false;
    let sysuserObj: any = {
      ID: this.sysuserObj.ID,
      NAME: this.sysuserObj.NAME,
      USERCODE: this.sysuserObj.USERCODE,
      PASSWORD: this.userInfo.PASSWORD,
      PERSONID: this.userInfo.PERSONID
    }
    SysprofileBusiness.editPersonelInfo(sysuserObj).subscribe(res => {
      if (res[0].CODE === '0') {
        this.avaterUserName = sysuserObj.NAME;
        SystemBusiness.msgService.message("修改成功");
      } else {
        SystemBusiness.msgService.error(res[0].MSG);
      }
    })
  }
  /**
   * 上传个人头像
   */
  uploadAvatar() {
    // this.modal.open({
    //   title: '上传个人头像',
    //   content: UploadavatardialogComponent,
    //   onOk() { },
    //   onCancel() { },
    //   footer: false,
    //   componentParams: {
    //     options: { userId: this.sysuserObj.ID }
    //   }
    // }).subscribe(result => {

    // });
  }
  /**
   * 修改个人头像
   */
  editAvatar() {

  }
  /**
   * 待办任务事件
   * @param param
   */
  tasklistEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'select'://选中一条
       CommonService.event('selectedMenu', {
          ID: event.param.ID, MENUID: 'SYSASSIGNMENT', ROUTER: 'sysassignmentList',
          PID: environment.pid, MENUTYPE: 'INURL', MENUNAME: '待办任务', MENUICON: 'fc-icon-bgefficiency'
        });
        break;
      case 'listOneHandle'://立即处理
        // SystemBusiness.appService.confirm("确认处理这项任务吗?", () => {
        //   SysprofileBusiness.handleTask(event.param.ID).subscribe(result => {
        //     if (result.CODE === '0') {
        //       event.param.STATUS = 'default';
        //       //刷新任务
        //       this.initTask();
        //       SystemBusiness.msgService.message('任务已处理!');
        //     } else {
        //       SystemBusiness.msgService.error(result.MSG);
        //     }
        //   });
        // }, () => { });
        break;
      case 'listOneDelete'://删除
        // this.messageService.confirm("确认删除记录吗?", () => {
        //   SysprofileBusiness.deleteSystask(event.param.ID).subscribe(result => {
        //     if (result.CODE === '0') {
        //      SystemBusiness.msgService.message("删除成功");
        //       //刷新消息
        //       this.initTask();
        //     } else {
        //       SystemBusiness.msgService.error(result.MSG);
        //     }
        //   })
        // }, () => { });
        break;
      case 'listSearch'://立即查询
        CommonService.event('selectedMenu', {
          ID: event.param.ID, MENUID: 'SYSASSIGNMENT', ROUTER: 'sysassignmentList',
          PID: environment.pid, MENUTYPE: 'INURL', MENUNAME: '待办任务', MENUICON: 'fc-icon-bgefficiency'
        });
        break;
    }
  }
  /**
   * 访问日志事件
   * @param event 
   */
  sysloglistEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'select'://选中一条
        CommonService.event('selectedMenu', {
          ID: event.param.ID, MENUID: 'SYSLOG', ROUTER: 'syslogList',
          PID: environment.pid, MENUTYPE: 'INURL', MENUNAME: '访问日志', MENUICON: 'fc-icon-bgefficiency'
        });
        break;
    }
  }
  /**
   * 消息事件
   * @param event 
   */
  msglistEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'select'://选中一条
        CommonService.event('selectedMenu', {
          ID: event.param.ID, MENUID: 'SYSMESSAGE', ROUTER: 'sysmessageDetail',
          PID: environment.pid, MENUTYPE: 'INURL', MENUNAME: '消息详情', MENUICON: 'fc-icon-bgefficiency'
        });
        SysprofileBusiness.msgIsRead(event.param).subscribe(result => {
          if (result.CODE === '0') {
            SystemBusiness.msgService.message('我已阅读这条消息！');
          }
        })
        break;
      case 'listOneView'://预览
        CommonService.event('selectedMenu', {
          ID: event.param.ID, MENUID: 'SYSMESSAGE', ROUTER: 'sysmessageDetail',
          PID: environment.pid, MENUTYPE: 'INURL', MENUNAME: '消息详情', MENUICON: 'fc-icon-bgefficiency'
        });
        break;
      case 'listOneDelete'://删除
        // this.messageService.confirm("确认删除记录吗?", () => {
        //   SysprofileBusiness.deleteSysmsg(event.param.ID).subscribe(result => {
        //     if (result.CODE === '0') {
        //       SystemBusiness.msgService.message("删除成功");
        //       //刷新消息
        //       this.initMsg();
        //     } else {
        //       SystemBusiness.msgService.error(result.MSG);
        //     }
        //   })
        // }, () => { });
        break;
    }
  }
  /**
   * 消息分页事件
   */
  msgpaginationEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'pageSizeChange'://每页显示多少条
        this.msglistCondition = '{"PAGESIZE":"' + event.param + '","PAGENUM":"' + this.msgPageNum + '"}';
        break;
      case 'jumpPage':
        this.msglistCondition = '{"PAGESIZE":"' + this.msgPageSize + '","PAGENUM":"' + event.param + '"}';
        break;
    }
  }
  /**
   * 任务分页事件
   * @param event 
   */
  taskpaginationEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'pageSizeChange'://每页显示多少条
        this.tasklistCondition = '{"PAGESIZE":"' + event.param + '","PAGENUM":"' + this.taskPageNum + '"}';
        break;
      case 'jumpPage':
        this.tasklistCondition = '{"PAGESIZE":"' + this.taskPageSize + '","PAGENUM":"' + event.param + '"}';
        break;
    }
  }

  /**
   * 跳转到待办
   */
  navToAssignment() {
    CommonService.event('selectedMenu', {
      MENUID: 'ASSIGNMENT', ROUTER: 'sysassignmentList',
      PID: environment.pid, MENUTYPE: 'INURL', MENUNAME: '待办任务', MENUICON: 'fc-icon-bgefficiency'
    });
  }
  /**
   * 跳转到消息
   */
  navToMessage() {
    CommonService.event('selectedMenu', {
      MENUID: 'SYSMESSAGE', ROUTER: 'sysmessageDetail',
      PID: environment.pid, MENUTYPE: 'INURL', MENUNAME: '消息详情', MENUICON: 'fc-icon-bgefficiency'
    });
  }
  /**
   * 跳转到系统日志
   */
  navToSyslog() {
   CommonService.event('selectedMenu', {
      MENUID: 'SYSLOG', ROUTER: 'syslogList',
      PID: environment.pid, MENUTYPE: 'INURL', MENUNAME: '访问日志', MENUICON: 'fc-icon-bgefficiency'
    });
  }
  /**
  * YM
  *动态加载快速导航标签数据;
  */
  // initNavLink() {
  //   SysprofileBusiness.NavLinkFunction(NavLinkFunctionName.getNavLinks).subscribe(res => {
  //     if (res.CODE === "0") this.navLinks = res.DATA;
  //     let args: Args_NavLink = { navlinks: this.navLinks }
  //     this.navLinkListCondition = this.mainService.NavLinkFunction(NavLinkFunctionName.rebuildList_NavLink, args);
  //     this.mainService.NavLinkFunction(NavLinkFunctionName.refreshNavLink, args);
  //   });
  // }
  /** YM
   * 新增快速导航标签
   */
  // addNavLinkTag(contentTpl, footerTpl) {
  //   let args: Args_NavLink = { navlinks: this.navLinks, contentTpl: contentTpl, footerTpl: footerTpl, listdata: this.navLink_listdata }
  //   if (this.mainService.NavLinkFunction(NavLinkFunctionName.addNavLinkTag, args)) {
  //     setTimeout(() => {
  //       let column: ColumnApi = this.navLink_listdata._gridColumnApi;
  //       if (column) column.autoSizeAllColumns();
  //     });
  //   }
  // }
  /** YM
   * 处理新增快速导航标签——确定
   */
  // handleAddNavLink_ok(ev: any) {
  //   let args: Args_NavLink = { navlinks: this.navLinks, listdata: this.navLink_listdata, condition: this.navLinkListCondition }
  //   if (
  //     this.mainService.NavLinkFunction(NavLinkFunctionName.handleAddNavLink_ok, args)
  //   ) {
  //     setTimeout(() => {
  //       this.initNavLink();
  //     });
  //   }
  // }
  /** YM
   * 处理新增快速导航标签——取消
   */
  // handleAddNavLink_cancel(ev: any) {
  //   this.mainService.NavLinkFunction(NavLinkFunctionName.handleAddNavLink_cancel)
  // }
  /** YM
   * 快速导航标签事件
   */
  navLinkEvent(ev: FCEVENT, link: any) {
    switch (ev.eventName) {
      case "close":
        break;
      case "beforeClose":
        event.stopPropagation();
        event.preventDefault();
        // SysprofileBusiness.NavLinkFunction(NavLinkFunctionName.deleteSubject).subscribe(res => {
        //   if (res) this.initNavLink();
        // });
        // SysprofileBusiness.NavLinkFunction(NavLinkFunctionName.navLinkBeforeClose, { link: link });
        break;
      case "click":
        event.stopPropagation();
        event.preventDefault();
        // this.logService.debug('路由' + ev.param);
        CommonService.event('selectedMenu', {
          ID: '', MENUID: 'SYSNAVLINK', ROUTER: 'sysassignmentList',
          PID: environment.pid, MENUTYPE: 'INURL', MENUNAME: '待办任务', MENUICON: 'fc-icon-bgefficiency'
        });
        break;
      default:
        break;
    }
  }
  
}
