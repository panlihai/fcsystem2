import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'navside',
  templateUrl: './navside.component.html',
  styles: [``]
})
export class NavsideComponent extends ComponentParent {
  //初始化消息配置
  _navSideOption = {
    fcAppid: '',
    fcLabelCode1: '未读消息',
    fcLabelCode2: '全部消息',
    fcTitleCode: '',
    fcSmarkCode: '',
    fcColorCode: '',//消息等级分为一般(normal)、紧急(waring)、危险(danger)
    fcReadCode: '',
    fcTimeCode: ''
  }
  constructor(public mainService: ComponentService) {
    super('FCNAVSIDE', mainService);
  }
}