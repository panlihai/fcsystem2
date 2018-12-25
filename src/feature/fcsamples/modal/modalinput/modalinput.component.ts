import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
import { CommonService } from 'fccore2/common/common';
import FccomponentEvent from 'fccomponent2/business/fccomponet.event';
import { FcModalConfig } from 'fccomponent2/business/fcmodel.business';
@Component({
  selector: 'modalinput',
  templateUrl: './modalinput.component.html',
  styles: [``]
})
export class ModalinputComponent extends ComponentParent {
  constructor(public mainService: ComponentService) {
    super('FCMODALINPUT', mainService);
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
      token: token
    }
    CommonService.event(FccomponentEvent.modal.dialog, modal);
  }

}