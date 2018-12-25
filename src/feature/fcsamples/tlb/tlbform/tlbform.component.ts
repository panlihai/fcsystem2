import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
import { FCEVENT } from 'fccomponent2/fc';

@Component({
  selector: 'tlbform',
  templateUrl: './tlbform.component.html',
  styles: [`
  :host ::ng-deep .tlbform .fc-full{
    height:auto;
  }
  `]
})
export class TlbformComponent extends ComponentParent {
  disableds = '{"BTNCARDSAVEBACK":true,"BTNCARDADD":true}';
  constructor(public mainService: ComponentService) {
    super('FCTLBFORM', mainService);
  }
  /**
   * 自定义工具栏事件
   * @param event 
   */
  ourtlbform(event: FCEVENT) {
    switch (event.eventName) {
      case 'me':
        // console.log("自定义工具栏事件");
        this.mainService.providers.msgService.message("自定义工具栏事件");
        break;
    }
  }
   
}