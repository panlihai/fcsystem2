import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
import { CommonService } from 'fccore2/common/common';
import FccomponentEvent from 'fccomponent2/business/fccomponet.event';
import { ModaltemplateComponent } from '../dialog/modaltemplate.component';
import { FcModalConfig } from 'fccomponent2/business/fcmodel.business';
import { FCEVENT } from 'fccomponent2/fc';
@Component({
  selector: 'modalcard',
  templateUrl: './modalcard.component.html',
  styles: [``]
})
export class ModalcardComponent extends ComponentParent {
  constructor(public mainService: ComponentService) {
    super('FCMODALCARD', mainService);
  }
  /**
   * 打开弹窗
   */
  openDialog() {
    let token = CommonService.guid();
    let modal: FcModalConfig = {
      title: '1',
      content: '1',
      okFunc: (result) => {
        this.mainService.providers.logService.debug("ok");

      },
      cancelFunc: (result) => {
        this.mainService.providers.logService.debug("ok");
      },
      // footer?: any;
      token: token,
    }
    CommonService.event(FccomponentEvent.modal.dialog, modal);
  }
  openInputDialog() {
    let token = CommonService.guid();
    let modal: FcModalConfig = {
      title: '修改用户名',
      // content: '1',
      okFunc: (result) => {
        this.mainService.providers.logService.debug("ok");

      },
      cancelFunc: (result) => {
        this.mainService.providers.logService.debug("ok");
      },
      // footer?: any;
      token: token
    }
    CommonService.event(FccomponentEvent.modal.input, modal);
  }
  /**
   * 弹窗事件
   * @param event 
   */
  modalEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'okFunc'://确认
        this.mainService.providers.msgService.message("弹窗确认事件");
        break;
      case 'cancelFunc'://取消
        this.mainService.providers.msgService.message("弹窗取消事件");
        break;
    }
  }
}