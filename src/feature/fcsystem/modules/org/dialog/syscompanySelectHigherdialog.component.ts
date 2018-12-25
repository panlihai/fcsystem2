import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonService } from 'fccore2/common/common';
import { FCEVENT } from 'fccomponent2/fc';
import { FctreeComponent, ParentEditComponent } from 'fccomponent2';
import CacheService from 'fccore2/common/cache';
import { SyscompanyBusiness } from '../../../business/syscompany.business';

@Component({
  selector: 'syscompanySelectHigherdialog',
  template: `
    <div style="padding-bottom: 30px;">
      <fc-tree #tree [(ngModel)]="treeSelectObj" [fcOption]="treeOptions" (fcEvent)=" treeEvent($event);" name='treeSelectObj1'></fc-tree>
    </div>
    <div class="customize-footer">
      <fc-button  [fcType]="'primary'" fcLabel="确定" (click)="ok($event)">
      </fc-button>
      <fc-button [fcType]="'default'" fcLabel="取消"  (click)="cancel($event)">
      </fc-button>
    </div>
    `,
  styles: [`
   .customize-footer{
    border-top: 1px solid #e8e8e8;
    padding: 10px 20px;
    text-align: right;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
   }
   .customize-footer fc-button{
    margin-left:8px;
   }
  `]
})
export class SyscompanySelectHigherdialogComponent extends ParentEditComponent {

  //弹窗唯一标识
  @Input()
  fcToken: string;
  @Input()
  compObj: any = {};
  @Input()
  compId: string;
  @Input()
  senDate: string;
  @Input()
  dimID: string;

  //树选中节点
  selectedTreeObj: any;

  @ViewChild('tree')
  tree: FctreeComponent;

  //部门树的配置
  treeOptions: any;
  compabyDimObj: any;
  //数据库存的失效时间格式
  senDateToString: string;

  constructor() {
    super('SYSTEM', 'SYSDEPARTMENTRELATION');
    this.initOrgData();
  }

  init() {
    // this.initOrgData();
  }
  /**
     * 初始化组织机构数据
     */
  initOrgData() {
    //TODO
    //这个执行顺序不知道如何控制
    //未对senDate赋值的时候已经执行了该方法
    //后续对senDate进行了修改，已经不起作用
    if (this.senDate == undefined)
      this.senDate = CacheService.getS("DefaultCompanySenDate");
    if (this.dimID == undefined)
      this.dimID = CacheService.getS("higherCompanyDialogDim");
    this.treeOptions = SyscompanyBusiness.cloneTreeObj(this.dimID, this.senDate);
  }

  /**
       * 点击保存icon类名
       * @param event  
       */
  event(eventName: string) {
  }

  addNew(mainObj: any): boolean {
    return true
  }

  /**
* 事件处理
* @param event 树发生的事件
*/
  treeEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'click'://离开节点
        //选中树节点的数据
        this.selectedTreeObj = event.param.node.origin.DATA;
        break;
      case 'initialized'://初始化        
        break;
    }
  }
  /**
   * 确定
   */
  ok() {
    CommonService.event(this.fcToken + '-close', {});
    this.compObj.SDEPT_NAME = this.selectedTreeObj.SCOMPANY_NAME;
    this.compObj.SDEPT_CODE = this.selectedTreeObj.SCOMPANY_CODE;
  }
  /**
   * 取消
   */
  cancel() {
    CommonService.event(this.fcToken + '-close', {});
  }
}