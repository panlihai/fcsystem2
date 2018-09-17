import { Component, OnInit, ViewChild } from "@angular/core";
import { FclistdataComponent, TimelineOptions } from "fccomponent2";
import { FCEVENT } from "fccomponent2/fc";
import { CommonService } from "fccore2/common/common";
import HomeBusiness from "../../../../app/business/home.business";
import SystemBusiness from "fccore2/classes/system.business";
import { environment } from "../../../../environments/environment";
@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styles: [
    `.messages-notices{
      position: absolute;
      right: 10px;
      top: 15px;
    }
    .all{
      display:flex;
      justify-content:between;
      align-item:center;
      height: 110px;
      padding: 20px 0px 0px 20px;
    }
    :host ::ng-deep .first-icon>i{
      font-size:40px;
      padding-left: 21%;
    }
    .tagselect{
      position: absolute;
      right: 10px;
      top: 15px;
    }
    :host ::ng-deep .viewdetail a{
      font-size:14px;
      width:100%;
    }
    .home-list{
      width:100%;
    }
    .home-list:hover{
      overflow-y:auto;
    }
    .contact li{
      height:40px;
      line-height:40px;
      border-bottom:1px solid #cccccc;
      display:flex;
      align-item:center;
      white-space:nowrap;
      overflow:hidden;
      position:relative;
      padding-left:20px;
    }
    .contact li span{
      font-size:14px;
    }
    .todo-taskslist li span{
      width: 97%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .contact_right{
      color:#399dfb;
      margin-left:10px;
    }
    .main_contact{
      position:relative;
    }
    .contact_icon{
      z-index:999;
    }
   :host ::ng-deep .home-calendar .ant-fullcalendar-header{
      position: absolute;
      top: 2px;
      right: -15px;
    }
    :host ::ng-deep .ant-fullcalendar-header .ant-radio-group{
      display:none;
    }
    :host ::ng-deep .contact_right a{
      font-size:14px;
    }
    .chat-wrap{
      width:50px;
      height:50px;
      overflow:hidden;
      position:fixed;
      right:25px;
      bottom:30px;
    }
    :host ::ng-deep .chat-show-wrap .fc-chatbox .fc-chatouter{
      visibility:visible;
      opacity: 1;
      cursor: move;
    }
    :host ::ng-deep .ant-btn-circle{
      width: 50px;
      border-radius: 50%;
      height: 50px;
      background-color:#5c92FF;
      border:none;
      font-size:0px;
    }
    :host ::ng-deep .ant-btn-circle i{
      font-size:18px;
    }
    :host ::ng-deep .fc-chatouter{
      position: fixed;
      bottom: 90px;
      right: 60px;
      opacity: 0;
      visibility:hidden;
      transition: all 0.3s;
      -moz-transition: all 0.3s;
      -webkit-transition: all 0.3s;
      -o-transition: all 0.3s;
    }
    .main_contain{
      margin-top: -10px;
      height: 250px;
      overflow: auto;
    }
    .contacticon{
      position: absolute;
      right: 0;
    }
    .contacticon:hover{
      cursor: pointer;
    }
    :host ::ng-deep .fc-title{
      padding-left: 20px;
    }
  :host ::ng-deep .fastcontent{
      padding-left: 20px;
      display: inline-block;
      padding: 5px;
  }
    :host ::ng-deep .fastcontenttext a{
    color:#333333;
    font-size:14px;
    height:40px;
    line-height:40px;
    display:inline-block;
    margin-right:20px;
  }
  :host ::ng-deep .add button{
    width:60px;
    height:28px;
    color:#5c92ff;
  }
  .system-version{
    padding-left:10px;
  }
  
  .system-version>div{
    width:100%;
    height:300px;
    padding-left:20px;
  }
  :host ::ng-deep .system-version .fc-timeline{
    height:240px;
    overflow:auto;
  }
  .add {
    display:inline-block;
  }
  .home-list-inlineblock{
    display:inline-block;
  }
  :host ::ng-deep .piechart>div{
    padding-top:40px;
  }
  .fc-chatouter{
    width:385px;
    border-radius: 6px;
    box-shadow: 0px 0px 10px #333333;
}
.fc-chattop{
    width:100%;
    height:50px;
    background-color: #5C92FF;
    padding: 0px 20px;
    line-height: 50px;
    border-radius: 6px 6px 0 0;
}
.fc-username{
   margin-left:20px;
   color:#ffffff;
   font-size:16px;
   float:left;
}
.fc-chatuser {
    float: left;
    height: 50px;
    padding-top: 9px;
}
.fc-userimg{
    float:left;
    color:#ffffff;
}
.fc-close{
    color:#ffffff;
    font-size:14px;
    float:right;
    cursor:pointer;
}
.fc-chatcontent{
    width:100%;
    height:220px;
    overflow: auto;
    background-color:white;
}
.fc-chattime{
    width:100%;
    height:22px;
    color:#666666;
    font-size:12px;
    text-align: center;
    line-height: 22px;
}
.fc-chatleft{
    position: relative;
    left: 33px;
    width: 260px;
    min-height: 40px;
    background: #f1f1f1;
    -moz-border-radius: 12px;
    -webkit-border-radius: 12px;
    border-radius: 6px;
    color: #333333;
    font-size: 14px;
    padding-left: 20px;
    line-height: 37px;
    margin-bottom:20px;
    }
.fc-chatleft:before{
    position: absolute;
    content: "";
    width: 0;
    height: 16px;
    right: 100%;
    top: 20px;
    border-top: 16px solid transparent;
    border-right: 23px solid #f1f1f1;
    }
.fc-chatinnerright{
    width:100%;
    margin-bottom:10px;
    min-height: 40px;
    line-height: 37px;
}
.fc-chatright{
    position: relative;
    width: 260px;
    height: 40px;
    background: #5c92ff;
    -moz-border-radius: 12px;
    -webkit-border-radius: 12px;
    border-radius: 6px;
    color: #ffffff;
    font-size: 14px;
    padding-left: 20px;
    line-height: 40px;
    float: right;
    margin-right: 33px;
    }
.fc-chatright:after{
    position: absolute;
    content: "";
    width: 0;
    height: 16px;
    left: 100%;
    top: 19px;
    border-top: 16px solid transparent;
    border-top: 16px solid transparent;
    border-left: 23px solid #5c92ff;
    }
.fc-chatname{
    text-align:right;
    padding-right:20px;
    color:#cccccc;
    font-size:12px;
}
.fc-chatbottom {
    width: 100%;
    height: 60px;
    background: #f1f1f1;
    border-radius: 0 0 6px 6px;
    padding:10px;
}
.fc-chatsend{
    background-color:#ffffff;
    border-radius:6px;
    width: 365px;
    height: 40px;
    padding-left:20px;
    line-height：40px;
}
.fc-chatlink{
    margin-right:13px;
    float:left;
    height: 40px;
    padding-top: 12px;
}
.fc-chattext{
    float:left;
    height:100%;
    width:260px;
    border:none;
    outline:none;
}
.fc-chattext .ant-input-wrapper{
    height:100%;
    width:240px;
}
:host ::ng-deep .fc-chatouter .ant-input {
    position: relative;
    display: inline-block;
    padding: 4px 7px;
    width: 100%;
    height:40px;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all .3s;
    border: none;
}
:host ::ng-deep .ant-input {
    height: 40px;
    outline:none;
}
.fc-chatsendbutton{
    height:18px;
    font-size:14px;
    color:#5c92ff;
    display: inline-block;
    margin-top: 10px;
    cursor: pointer;
}
:host ::ng-deep .ant-input:focus {
    box-shadow: none;
}
:host ::ng-deep .quick-navigation .fc-content{
  height:110px;
  overflow:auto;
}
:host ::ng-deep .templatehome .separated-lefttop .fc-layoutpanel,:host ::ng-deep .templatehome .separated-left .fc-layoutpanel,.templatehome .separated-righttop,:host ::ng-deep .templatehome .separated-rightcenter .fc-layoutpanel,:host ::ng-deep .templatehome .separated-left .fc-layoutpanel,.templatehome .separated-leftbottom,:host ::ng-deep .templatehome .separated-right .fc-layoutpanel,:host ::ng-deep .templatehome .separated-rightbottom .fc-layoutpanel,:host ::ng-deep .templatehome .separated-leftrightbottom .fc-layoutpanel {
  background:white;
  padding:5px;
  border-radius: 2px;
  box-shadow: 0 0 5px #ccc;
  width: auto;
}
:host ::ng-deep .templatehome .separated-lefttop .fc-layoutpanel,:host ::ng-deep .templatehome .separated-left .fc-layoutpanel,:host ::ng-deep .templatehome .separated-left .fc-layoutpanel,.templatehome .separated-leftbottom{
  margin: 0px 5px 5px 0px;
}
.templatehome .separated-righttop{
  margin: 0px 0px 5px 0px;
}
:host ::ng-deep .templatehome .separated-rightcenter .fc-layoutpanel{
  margin-bottom: 5px;
}
:host ::ng-deep .templatehome .separated-leftrightbottom .fc-layoutpanel {
  margin-right: 5px;
}
 .seeMore {
  text-align: center;
  color: #;
  color: #5C92FF;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
.seeMore span:hover{
  border-bottom: 1px solid #1890FF;
}
    `
  ]
})
export class HomeComponent implements OnInit {
  simpleDrop: any = null;
  //初始化分页大小
  pagesize: number = 2;
  //初始化每一页几个数据
  pagenum: number = 1;
  //当前用户
  currentUser: any;
  //聊天消息
  contactMessages: any[] = [];
  //联系人姓名
  contactname: any;
  //通讯录列表
  contacts: any[];
  //输入框内准备发送的消息
  sendMassage: any;
  navLinkListCondition: any;
  //消息公告
  notifys: any;
  waits: any;
  links: any;
  @ViewChild("navLink_listdata") navLink_listdata: FclistdataComponent;
  currentModal_navLink: any;
  //隐藏聊天面板
  showchat: boolean = false;
  //柱状图文字
  _barLabels: string[] = [
    "哈局",
    "沈阳局",
    "北京局",
    "太原局",
    "呼和局",
    "...",
    "乌鲁木齐"
  ];
  //饼状图大小
  pieView: any[] = [300, 300];
  //柱状图数据
  _barData: any[] = [
    {
      data: [73370315, 174698475, 87764250, 2250, 0, 250174, 9],
      label: "计提利息总额"
    },
    {
      data: [24823, 4310789, 790632, 23052, 668, 318150, 9],
      label: "累计已提折旧总额"
    }
  ];
  //待办任务
  waitWork = {
    field: { FIELDCODE: "FIELDNAME" },
    data: [
      {
        FIELDNAME:
          "2018.03.26-项目元数据框架构建；项目内容尽快完成项目元数据框架构建，尽快实施上线任务完成并实施"
      }
    ]
  };
  test = [
    {
      FIELDNAME:
        "2018.03.26-项目元数据框架构建；项目内容尽快完成项目元数据框架构建，尽快实施上线任务完成并实施"
    },
    {
      FIELDNAME: "2018.03.26-元数据组件开发；项目内容尽快完成数据组件开发"
    },
    {
      FIELDNAME: "2018.03.26-开始进行元数据方法的呈现方式"
    },
    {
      FIELDNAME: "2018.03.26-项目元数据框架构建"
    },
    {
      FIELDNAME: "2018.03.26-元数据组件开发"
    },
    {
      FIELDNAME: "2018.03.26-元数据组件开发；项目内容尽快完成数据组件开发"
    }
  ];
  //时间轴
  versionTimeline: TimelineOptions = {
    fcAppid: "",
    fcLabelCode: "label",
    fcTitleCode: "title",
    fcColorCode: "color",
    fcId: "ID"
  };
  //待办任务状态
  _waitWorkStatus: string;
  //navLink 标签
  navLinks: any;
  firstInit: boolean = true;
  constructor() { }
  ngOnInit(): void {
    this.pagenum = 1;
    this.currentUser = SystemBusiness.getUserinfo();
    SystemBusiness.appService
      .findWithQuery("SYSVERSION", { PAGENUM: 1, PAGESIZE: 6, ODER: "TS DESC" })
      .subscribe(result => {
        if (result.CODE === "0") {
          let version = (this.versionTimeline.fcValues = []);
          result.DATA.forEach(item => {
            let t = CommonService.timestampFormat(
              Number.parseInt(item.PUBLISHTIME) * 1000,
              "MM-dd"
            );
            version.push({
              label: t,
              title: environment.projectName + "发布" + item.LASTVERSION + "版",
              ID: item.ID,
              color: "normal"
            });
          });
        }
      });
    // 查询SYSNOTIFY所有元数据
    HomeBusiness.getannouncement().subscribe(result => {
      if (result.CODE === '0') {
        this.notifys = result.DATA;
        // 把时间转成时间戳
        this.notifys.forEach((item, index) => {
          this.notifys[index].PUBLISHTIME = CommonService.timestampFormat(
            Number.parseInt(item.PUBLISHTIME),
            "yyyy-MM-dd" + ""
          );
        });
      }
    })
    // 查询SYSASSIGNMENT所有元数据
    HomeBusiness.getassignment().subscribe(result => {
      if (result.CODE === '0') {
        this.waits = result.DATA;
        // 把时间转成时间戳
        this.waits.forEach((item, index) => {
          this.waits[index].CREATETIME = CommonService.timestampFormat(
            Number.parseInt(item.CREATETIME),
            "yyyy-MM-dd" + ""
          );
        });
      }
    })
    // 查询系统通讯录所有元数据
    SystemBusiness.appService
      .findWithQuery("SYSCONTACT", {})
      .subscribe(result => {
        if (result.CODE === "0") {
          this.contacts = result.DATA;
        }
      });

  }
  //垂直分组柱状图数据
  _groupBarData: any[] = [
    {
      "name": "哈局",
      "series": [
        {
          "name": "计提利息总额",
          "value": 7300000
        },
        {
          "name": "累计已折旧总额",
          "value": 8940000
        }
      ]
    },
    {
      "name": "沈阳局",
      "series": [
        {
          "name": "计提利息总额",
          "value": 7870000
        },
        {
          "name": "累计已折旧总额",
          "value": 8270000
        }
      ]
    },
    {
      "name": "北京局",
      "series": [
        {
          "name": "计提利息总额",
          "value": 4870000
        },
        {
          "name": "累计已折旧总额",
          "value": 2270000
        }
      ]
    }]
  //图表配色
  scheme: any = { domain: ['#A9C9FF', '#0080FF', '#52CC7A', '#FF4D55', '#FFD400'] };
  /**
   * 柱状图事件
   * @param event 
   */
  chartbarEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'activate'://选中
        break;
      case 'deactivate'://元素激活事件（鼠标输入）
        break;
      case 'select'://元素停用事件（鼠标离开）
        break;
    }
  }
  /**
    * 饼状图事件
    * @param event 
    */
  chartpieEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'activate'://选中
        break;
      case 'deactivate'://元素激活事件（鼠标输入）
        break;
      case 'select'://元素停用事件（鼠标离开）
        break;
    }
  }
  //基本图表数据
  _pieData: any[] = [
    {
      "name": "铁债",
      "value": 1692215654.69178
    },
    {
      "name": "国开行",
      "value": 293107561.643836
    },
    {
      "name": "优先股",
      "value": 933395486.794522
    }
  ]
  /**
   * 上传图片
   * @param event
   */
  fileEvent(event): any {
    switch (event.eventName) {
      case "success":
        break;
      case "failure":
        break;
    }
  }
  /**
  * 消息公告点击跳转路由事件
  * @param event 
  */
  announcementEvent(id, catagory, publishuser) {
    if (publishuser !== this.currentUser.USERCODE) {
      let obj: any = {
        TS: CommonService.getTimestamp(),
        SORT: CommonService.getTimestamp(),
        POSTTIME: CommonService.getTimestamp(),
        CONTENT: "消息公告" + id + "进行回执",
        ISREAD: "N",
        ID: id,
        TYPE: "",
        NOTIFICATIONUSERID: publishuser,
        TITLE: "回执信息",
        POSTUSERID: this.currentUser.USERCODE
        // POSTUSERID: this.providers.userService.getUserInfo().USERCODE
      };
      if (catagory === "error") {
        obj.TYPE = "danger";
      }
      if (catagory === "processing") {
        obj.TYPE = "normal"
      }
      if (catagory === "warning") {
        obj.TYPE = "waring"
      }
      HomeBusiness.announcementsave(obj)
    }
    HomeBusiness.sysannouncementrouter(id);
  }
  // 历史待办模块功能
  assignmentHistory(id) {
    HomeBusiness.sysassignmentrouter(id);
  }
  // 待办任务列表点击
  assignmentEvent(wait) {
    HomeBusiness.assignmentMessage(wait);
  }
  /* 时间轴事件
  * @param event
  */
  timelineEvent(event: FCEVENT) {
    switch (event.eventName) {
      case "selected": //选中
        CommonService.event('selectedMenu', {//跳转到版本控制详情界面
          ID: event.param.ID, MENUID: 'SYSVERSION', ROUTER: 'sysversionDetail',
          PID: environment.pid, MENUTYPE: 'INURL', MENUNAME: '版本控制', MENUICON: 'fc-icon-bgefficiency'
        });
        break;
    }
  }
  /**
   * 聊天面板
   * @param event
   */
  chatEvent(event: FCEVENT) {
    switch (event.eventName) {
      case "send": //发布聊天记录
        break;
      case "closed": //关闭聊天面板
        this.showchat = false;
        break;
    }
  }
  /**
   * 发送聊天记录
   */
  sendChat() {
    //获取消息，合成消息体
    let time;
    let obj = [{
      CONTENT: this.sendMassage,
      POSTUSERID: this.currentUser.USERCODE,
      NOTIFICATIONUSERID: this.contactname,
      POSTTIME: CommonService.getTimestamp(),
      TS: CommonService.getTimestamp(),
      ISSEND: 'N',
      ISREAD: 'N',
      SORT: CommonService.getTimestamp(),
      TITLE: '来自联系人的消息',
      TYPE: 'normal'
    }];
    //如果是当天时间，不显示年月日
    console.log(new Date(obj[0].TS * 1000).toLocaleDateString());
    if (new Date(obj[0].TS * 1000).toLocaleDateString() === new Date().toLocaleDateString()) {
      time = CommonService.timestampFormat(obj[0].TS * 1000, 'hh:mm:ss') + "";
    } else {
      //如果不是当天，年月日时分秒
      time = CommonService.timestampFormat(obj[0].TS * 1000, 'yyyy-MM-dd hh:mm:ss') + "";
    }
    obj[0].TS = time;
    //往集合顶部插入一条消息记录，并且清空输入框
    this.contactMessages = obj.concat(this.contactMessages);
    this.sendMassage = '';
    //将该条数据保存到数据库里面
    HomeBusiness.saveMessage_chat(obj);
  }
  /**
   * 关闭聊天面板
   */
  closeChat() {
    this.showchat = false;
  }
  /**
  * 点击消息按钮出现聊天面板
  */
  showcontact(userid) {
    this.pagenum = 1;
    this.showchat = true;
    this.contactname = userid;
    this.contactMessages = [];
    //首次加载聊天内容
    this.getChatmessage(userid);
    //远程消息接收
    SystemBusiness.daoService.connectionWs(this.contactname).subscribe(data => {
      if (data.length !== 0) {
        this.contactMessages = this.contactMessages.concat(JSON.parse(data));
      }
    });
  }
  /**
   *  查询指定联系人的聊天内容 
   */
  getChatmessage(userid) {
    HomeBusiness.getChatcontent(userid, this.pagesize, this.pagenum)
      .subscribe(result => {
        if (result.CODE === "0") {
          //时间的显示
          result.DATA.forEach(element => {
            if (element.TS !== null && element.TS !== '') {
              //如果是当天时间，不显示年月日
              if (new Date(element.POSTTIME * 1000).toLocaleDateString() === new Date().toLocaleDateString()) {
                element.TS = CommonService.timestampFormat(Number.parseInt(element.POSTTIME) * 1000, 'hh:mm:ss') + "";
              } else {
                //如果不是当天，年月日时分秒
                element.TS = CommonService.timestampFormat(Number.parseInt(element.POSTTIME) * 1000, 'yyyy-MM-dd hh:mm:ss') + "";
              }
            }
          })
          this.contactMessages = result.DATA.concat(this.contactMessages);
        }
      });
  }
  /* 点击查看更多 */
  seeMore() {
    this.pagenum++;
    //调用获取聊天消息
    this.getChatmessage(this.contactname);
  }
  // }
  //    * 图表事件
  //    */
  //   chatbarEvent() {

  //   }
}
