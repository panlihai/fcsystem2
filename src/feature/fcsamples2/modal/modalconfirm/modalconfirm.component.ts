import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
import { FCEVENT } from 'fccomponent2/fc';
import FcsampleEvent from '../../business/fcsample.business';
import FccomponentEvent from 'fccomponent2/business/fccomponet.event';
import { CommonService } from 'fccore2/common/common';
import { FcModalConfig } from 'fccomponent2/business/fcmodel.business';

@Component({
  selector: 'modalconfirm',
  templateUrl: './modalconfirm.component.html',
  styles: [`
  .all{
    margin-bottom:10px;
  }
  `]
})
export class ModalconfirmComponent extends ComponentParent {
  /**
   * 
   */
  confirm(){
    let token=CommonService.guid()
    let modal:FcModalConfig={
      title: '是否确认删除本数据',
      content: '删除后将不能恢复',
      okFunc: (result) => {
        this.mainService.providers.msgService.message("删除成功");
      },
      cancelFunc: (result) => { 
        this.mainService.providers.msgService.message("删除失败");
      },
      // footer?: any;
      token: token
    }
    CommonService.event(FccomponentEvent.modal.confirm,modal);
  }
  //基本basicview
  basicview : string = `
  <fc-button fcLabel="打开询问弹窗" fcType="primary" (click)="modalconfirm.showModal()"></fc-button>
  <fc-modalconfirm #modalconfirm fcContent="您确定要执行此操作吗？"></fc-modalconfirm>
  `
   //基础js
   basicjs: string = `
   import { Component, OnInit } from '@angular/core';
   @Component({
     selector: 'modalconfirm',
     templateUrl: './modalconfirm.component.html',
     styleUrl:'./modalconfirm.component.css'
   })
   export class ModalconfirmComponent{
    
   }
   `
   modalEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'success'://单元格事件
        this.mainService.providers.msgService.message("确定");
        break;
      case 'cancel':
        this.mainService.providers.msgService.message("取消");
        break;
    }
  }
  constructor(public mainService: ComponentService) {
    super('FCMODALCONFIRM', mainService);
  }
}