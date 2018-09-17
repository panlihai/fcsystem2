import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
import { CommonService } from 'fccore2/common/common';
import { FcModalConfig } from 'fccomponent2/business/fcmodel.business';
import FccomponentEvent from 'fccomponent2/business/fccomponet.event';

@Component({
  selector: 'modaldanger',
  templateUrl: './modaldanger.component.html',
  styles: [`
  .all{
    margin-bottom:10px;
  }
   `]
})
export class ModaldangerComponent extends ComponentParent {
  //basicview
  basicview : string = `
  <fc-button fcLabel="打开错误弹窗" fcType="primary" (click)="modaldanger.showModal()"></fc-button>
  <fc-modaldanger #modaldanger fcTitle="这是一条失败信息" fcContent="一些附加信息一些附加信息一些附加信息"></fc-modaldanger>
  `
  //contentview
  contentview : string = `
  <fc-button fcLabel="打开错误弹窗" fcType="primary" (click)="modaldanger.showModal()"></fc-button>
  <fc-modaldanger #modaldanger fcTitle="这是一条失败信息" fcContent="一些附加信息一些附加信息一些附加信息"></fc-modaldanger>
  `
   //基础js
   basicjs: string = `
   import { Component, OnInit } from '@angular/core';
   @Component({
     selector: 'modaldanger',
     templateUrl: './modaldanger.component.html',
     styleUrl:'./modaldanger.component.css'
   })
   export class ModaldangerComponent{
    
   }
   `
  constructor(public mainService: ComponentService) {
    super('FCMODALDANGER', mainService);
  }
   /**
   * 打开弹窗
   */
  openDialog() {
    let token = CommonService.guid();
    let modal: FcModalConfig = {
      title: '错误提示',
      content: '这是一个错误',
      okFunc: (result) => {
        this.mainService.providers.logService.debug("ok");

      },
      cancelFunc: (result) => {
        this.mainService.providers.logService.debug("ok");
      },
      // footer?: any;
      token: token
    }
    CommonService.event(FccomponentEvent.modal.error, modal);
  }
}