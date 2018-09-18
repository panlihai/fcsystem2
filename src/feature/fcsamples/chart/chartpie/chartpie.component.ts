import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
import { FCEVENT } from 'fccomponent2/fc';

@Component({
  selector: 'chartpie',
  templateUrl: './chartpie.component.html',
  styles: [``]
})
export class ChartpieComponent extends ComponentParent {
  //饼状图文字
  _pieLabels: string[] = ['铁债', '国开行', '优先股']
  //饼状图数据
  /**
   * 饼状图事件
   * @param event 
   */
  chartpieEvent(event: FCEVENT) {
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
  //基本图表数据
  _pieData: any[] = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    }
  ]
  //高级图表数据
  _advancedData: any[] = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },

    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },

    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        }
      ]
    }
  ];
  //自定义图表颜色
  scheme: any = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
  constructor(public mainService: ComponentService) {
    super('FCCHARTPIE', mainService);
  }
}