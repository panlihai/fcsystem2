import { Component, Input } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import SystemBusiness from 'fccore2/classes/system.business';
import { CommonService } from 'fccore2/common/common';
@Component({
  selector: 'sysicondialog',
  template: `
    <div class="sys-allicon"> 
      <div class="sys-iconall">
          <div *ngFor="let icon of icons" [ngClass]="{'active':activeIcon===icon.DICVALUE}"
                class="sys-fciconlayout" (click)="iconsave(icon.DICVALUE)">
              <span><fc-icon [fcIcon]="icon.DICVALUE"></fc-icon></span>
              <span>{{icon.DICDESC}}</span>
          </div>  
      </div>
    </div>
    `,
  styles: [`
  .sys-allicon{
    z-index:999;
  }
  .sys-iconall{
    height: 300px;
    overflow: scroll;
    margin-left:5%;
  }
  .sys-fciconlayout{
    width: 12%;
    height: 89px;
    display: inline-flex; 
    align-items: center; 
    justify-content: center;
    flex-direction: column;
    cursor:pointer;
    background:#fff;
    transition:background 1s;
  }
  .sys-iconzi{
    display: inline-flex; 
    align-items: center; 
    justify-content: center;
  }
  .sys-fciconlayout:hover{
    background: #10a3e9;
    border-radius: 13px;
  }
  .active{
    background: #10a3e9;
    border-radius: 13px;

  }
  `]
})
export class SysicondialogComponent extends ParentEditComponent {
  //已选图标，默认激活
activeIcon:string;
  event(eventName: string, param: any): void {
  }
  init(): void {
    SystemBusiness.appService.findWithQuery("SYSICON", {}).subscribe(result => {
      this.icons = result.DATA;
    })
  
  }
  addNew(mainObj: any): boolean {
    return true;
  }
  /**
  * 初始化模型，产品对应的内容
  */
  constructor() {
    super('SYSTEM', 'SYSICON');
  }
  icons: any;
  DICVALUE: string = '';
  @Input()
  set options(option: any) {

  }


  /**
* 点击保存icon类名
* @param event  
*/
  iconsave(DICVALUE) {
    //普通模式弹窗,内容支持字符和模板
    this.activeIcon=DICVALUE;
    CommonService.event('selectIcon',DICVALUE);
  }
}

