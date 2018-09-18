import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
import { FCEVENT } from 'fccomponent2/fc';

@Component({
  selector: 'chartbar',
  templateUrl: './chartbar.component.html',
  styles: [``]
})
export class ChartbarComponent extends ComponentParent {
  //basicview
  basicview: string = `
   <fc-chartbar [fcOption]="_barLabels" [fcData]="_barData" (fcEvent)="chartbarEvent($event)"></fc-chartbar>
   `
  //basicjs
  basicjs: string = `
   import { Component, OnInit } from '@angular/core';
   @Component({
     selector: 'chartbar',
     templateUrl: './chartbar.component.html',
     styleUrl:'./chartbar.component.css'
   })
      //柱状图文字
      _barLabels: string[] = ['哈局', '沈阳局', '北京局', '太原局', '呼和局', '...', '乌鲁木齐'];
      //柱状图数据
      _barData: any[] = [
        { data: [73370315, 174698475, 87764250, 2250, 0, 250174, 9], label: '计提利息总额' },
        { data: [24823, 4310789, 790632, 23052, 668, 318150, 9], label: '累计已提折旧总额' }
      ];
      /**
       * 柱状图事件
       * @param event 
       */
      chartbarEvent(event: FCEVENT) {
        switch (event.eventName) {
          case 'hover':
            break;
          case 'click':
            break;
        }
      }
   }
   `
  //柱状图数据
  _verticalBarData: any[] = [
    {
      "name": "哈局",
      "value": 8940000
    },
    {
      "name": "沈阳局",
      "value": 5000000
    },
    {
      "name": "北京局",
      "value": 7200000
    }
  ];
  //自定义图表颜色
  _verticalScheme: any = { domain: ['#5AA454', '#A10A28', '#C7B42C'] };
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
  //垂直分组柱状图数据
  _groupScheme: any = { domain: ['#5AA454', '#A10A28'] };
  /**
   * 柱状图事件
   * @param event 
   */
  chartbarEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'activate'://选中
        this.mainService.providers.msgService.message("选中事件");
        break;
      case 'deactivate'://元素激活事件（鼠标输入）
        this.mainService.providers.msgService.message("元素激活事件");
        break;
      case 'select'://元素停用事件（鼠标离开）
        this.mainService.providers.msgService.message("元素停用事件");
        break;
    }
  }
  constructor(public mainService: ComponentService) {
    super('FCCHARTBAR', mainService);
  }
}           