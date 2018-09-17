import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
import { FCEVENT } from 'fccomponent2/fc';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styles: [`
  :host ::ng-deep .list .fc-full{
       height:auto;
  }
  `]
})
export class ListComponent extends ComponentParent {
  constructor(public mainService: ComponentService) {
    super('FCLIST', mainService);
  }
  listData = {
    field: {

    },
    data: [
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: '1',
        description: 'a',
        content: 'contet1',
      }, {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: '2',
        description: 'b',
        content: 'contet2',
      }, {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: '3',
        description: 'c',
        content: 'contet3',
      }
    ],
    buttons: [
      {
        BTNNAME: '修改',
        ACTCODE: 'listOneEdit'
      }, {

        BTNNAME: '删除',
        ACTCODE: 'listOneDelete'
      }
    ]
  };
  /**
 * 
 */
  listEvent(event: FCEVENT) {
    switch (event.eventName) {
      case "select":
        break;
    }
  }
  attributeEditEvent(ev?: FCEVENT, str?: string):void {
    switch (ev.eventName) {
      case "listEdit":
      this.mainService.providers.msgService.message("点击列表");       
        break;
    }
  }
  //basicview
  basicview: string = `
    <fc-list [fcAppid]="'SYSCOMPONENT'" fccontent fcFieldCode="APPNAME"></fc-list>
    `
  //listview
  listview: string = `
    <fc-list [fcAppid]="'SYSCOMPONENT'" fccontent fcFieldCode="APPNAME"  (fcEvent)="listEvent($event)"></fc-list>
    `
  //基础js
  basicjs: string = `
    import { Component, OnInit } from '@angular/core';
    @Component({
      selector: 'list',
      templateUrl: './list.component.html',
      styleUrl:'./list.component.css'
    })
    export class ListComponent{
      }
    `
  //基础listjs
  listjs: string = `
    import { Component, OnInit } from '@angular/core';
    @Component({
      selector: 'list',
      templateUrl: './list.component.html',
      styleUrl:'./list.component.css'
    })
    export class ListComponent{
      listEvent(event: FCEVENT) {
        switch (event.eventName) {
          case "select":
            this.mainService.providers.msgService.message("点击列表");
            break;
        }
      }
    }
    `
}