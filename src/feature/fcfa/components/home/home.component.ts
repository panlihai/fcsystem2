import { Component, OnInit } from "@angular/core";
import { FCEVENT } from "fccomponent2/fc";
import SystemBusiness from "fccore2/classes/system.business";
import { FaHomeBusiness } from "../../business/fahome.business";
@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styles: [
    `
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
      height:100px;
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
   :host ::ng-deep .sys-wizard-card .ant-card,:host ::ng-deep .sys-wizard-card .ant-card .ant-card-body{
      width:100%;
    }
  :host ::ng-deep .chartpie .ngx-charts-outer{
    position:relation;
  }
  :host ::ng-deep .chartpie .legend-labels{
    position: absolute;
    left: 3px;
    width: 78px;
  }
  :host ::ng-deep .chartline .legend-labels{
    width:90px;
  }
  :host ::ng-deep .chartline .legend-title{
    width:90px;
  }
  
    `
  ]
})
export class FahomeComponent implements OnInit {
  //项目数据集合
  projectList: any[];
  //用户
  userInfo: any;
  //州别国家
  bcareaList: any;
  //饼图配色方案
  pieScheme: any = { domain: ['#52CC7A', '#827DB3', '#FFD400', '#FF4D55'] };
  //柱状图配色方案
  barScheme: any = { domain: ['#0081FF', '#A9C9FF','#FFD400'] };
  //线形图配色方案
  lineScheme: any = { domain: ['#827DB3', '#52CC7A', '#FFD400', '#FF4D55'] };
  //饼状图文字
  _pieLabels: string[] = ['铁债', '国开行', '优先股'];
  //饼状图宽高
  pieView: any[] = [500, 300];
  //柱状图宽高
  barView: any[] = [820, 300];
  //线形图宽高
  lineView: any[] = [400,300];
  constructor() {

  }
  ngOnInit(): void {
    //初始化项目
    this.getProject();
    //获取用户信息
    this.userInfo = SystemBusiness.getUserinfo();
    //州别国家
    FaHomeBusiness.appService.findWithQuery("BCAREA", {}).subscribe(result => {
      if (result.CODE === '0') {
        this.bcareaList = result.DATA;
      }
    })

  }
  /**
   * 初始化项目
   */
  getProject() {
    FaHomeBusiness.appService.findWithQuery("BCPROJECT", {}).subscribe(result => {
      if (result.CODE === '0') {
        this.projectList = result.DATA;
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
  //饼状图数据
  _pieData: any[] = [
    {'name':"海军",value:745022.712},
    {'name':"陆军",value:1997206.72},
    {'name':"空军",value:137671.876}
  ]
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
  //垂直分组柱状图数据
  _groupBarData: any[] = [
    {
      "name": "空军",
      "series": [
        {
          "name": "2016年",
          "value": 21179.752
        },
        {
          "name": "2017年",
          "value": 32086.876
        },
        {
          "name": "2018年",
          "value": 84405.248
        }
      ]
    },
    {
      "name": "海军",
      "series": [
        {
          "name": "2016年",
          "value": 344210.672
        },
        {
          "name": "2017年",
          "value": 14000.952
        },
        {
          "name": "2018年",
          "value": 399411.088
        }
      ]
    },
    {
      "name": "陆军",
      "series": [
        {
          "name": "2016年",
          "value": 539670.912
        },
        {
          "name": "2017年",
          "value": 145393.8
        },
        {
          "name": "2018年",
          "value": 212142.008
        }
      ]
    }]
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
  //线形图数据
  _lineData = [
    {
      "name": "军械",
      "series": [
        {
          "value": 1182,
          "name": "2016年"
        },
        {
          "value": 2252,
          "name": "2017年"
        },
        {
          "value": 3649,
          "name": "2018年"
        }
      ]
    },
    {
      "name": "车辆",
      "series": [
        {
          "value": 2506,
          "name": "2016年"
        },
        {
          "value": 4329,
          "name": "2017年"
        },
        {
          "value": 5928,
          "name": "2018年"
        }
      ]
    },
    {
      "name": "护卫舰",
      "series": [
        {
          "value": 6506,
          "name": "2016年"
        },
        {
          "value": 7329,
          "name": "2017年"
        },
        {
          "value": 8928,
          "name": "2018年"
        }
      ]
    },
    {
      "name": "运输机",
      "series": [
        {
          "value": 2506,
          "name": "2016年"
        },
        {
          "value": 5329,
          "name": "2017年"
        },
        {
          "value": 6928,
          "name": "2018年"
        }
      ]
    }
  ];
  /**
   * 线性图事件
   * @param event 
   */
  chartlineEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'activate'://选中

        break;
      case 'deactivate'://元素激活事件（鼠标输入）

        break;
      case 'select'://元素停用事件（鼠标离开）

        break;
    }
  }
}
