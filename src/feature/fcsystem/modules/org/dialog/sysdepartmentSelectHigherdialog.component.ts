import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonService } from 'fccore2/common/common';
import SystemBusiness from 'fccore2/classes/system.business';
import SysdepartmentBusiness from '../../../business/sysdepartment.business';
import { FCEVENT } from 'fccomponent2/fc';
import { FctreeComponent, ParentEditComponent } from 'fccomponent2';

@Component({
  selector: 'sysdepartmentSelectHigherdialog',
  template: `
    <div style="padding-bottom: 30px;">
      <fc-tree #tree [(ngModel)]="treeSelectObj" [fcOption]="departmentTreeOptions" (fcEvent)=" treeEvent($event);" name='treeSelectObj1'></fc-tree>
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
export class SysdepartmentSelectHigherdialogComponent  extends ParentEditComponent {
  roleName: string = '';
  remark: string = '';
  //弹窗唯一标识
  @Input()
  fcToken: string;
  @Input()
  depObj: any = {};
  @Input()
  depId: string;

  //树选中节点
  selectedTreeObj: any;

  @ViewChild('tree')
  tree: FctreeComponent;

  //部门树的配置
  departmentTreeOptions: any;

  constructor() {
    super('SYSTEM', 'SYSDEPARTMENTRELATION');
  }

  init() {
    this.departmentTreeOptions = SysdepartmentBusiness.departmentTreeOptions;
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
        //选中树节点后关联列表,再次选中置空树节点
        this.selectedTreeObj = event.param.node.origin.DATA;
        // this.checkTree(this.selectedTreeObj);
        break;
      case 'initialized'://初始化
        if (this.tree.fcTree.treeModel.roots && this.tree.fcTree.treeModel.roots.length !== 0) {
          //如果树结构不为空时,初始化树结构和列表
          let initData = this.tree.fcTree.treeModel.roots[0].data.DATA;
          if (initData !== undefined) {
            // this.checkTree(initData);
          }
        } else {
          //如数结构数据为空时，置空列表数据
          // this.checkTree(null);
        }
        break;
    }
  }
  /**
   * 确定
   */
  ok() {
    CommonService.event(this.fcToken + '-close', {});     
    this.depObj.SDEPT_NAME = this.selectedTreeObj.SDEPT_NAME;
    this.depObj.SDEPT_CODE = this.selectedTreeObj.SDEPT_CODE;

  }
  /**
   * 取消
   */
  cancel() {
    CommonService.event(this.fcToken + '-close', {});
  }
}