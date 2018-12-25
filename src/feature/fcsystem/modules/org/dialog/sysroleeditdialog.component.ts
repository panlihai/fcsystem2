import { Component, Input, OnChanges } from '@angular/core';
import { CommonService } from 'fccore2/common/common';
import SystemBusiness from 'fccore2/classes/system.business';
import { SysroleBusiness } from '../../../business/sysrole.business';
@Component({
  selector: 'sysroleeidtdialog',
  template: `
    <div style="padding-bottom: 30px;">
      <div>
        <fc-text fcLabel="角色名称" [(ngModel)]="roleName" name="roleName"></fc-text>
        <fc-text fcLabel="备注" [(ngModel)]="remark" name="remark"></fc-text>
      </div>
      <div class="customize-footer">
        <fc-button  [fcType]="'primary'" fcLabel="确定" (click)="ok($event)">
        </fc-button>
        <fc-button [fcType]="'default'" fcLabel="取消"  (click)="cancel($event)">
        </fc-button>
      </div>
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
export class SysroleeditdialogComponent {
  roleName: string = '';
  remark: string = '';
  //弹窗唯一标识
  @Input()
  fcToken: string;
  //角色对象
  @Input()
  roleObj: any = {};
  //角色id
  @Input()
  roleId: string;
  //刷新fclist组件
  @Input()
  listCondition: string;
  /**
   * 确定
   */
  ok() {
    CommonService.event(this.fcToken + '-close', {});
    let roleObj: any = {
      ROLENAME: this.roleName,
      REMARK: this.remark
    };
    SysroleBusiness.saveOrUpdateRole(roleObj).subscribe(result => {
      if (result.CODE === '0') {
        SystemBusiness.msgService.message('操作成功！');
        //重新初始化list组件
        if (this.listCondition) {
          this.listCondition = this.listCondition.replace(/(\s*$)/g, " ");
        }
      } else {
        SystemBusiness.msgService.error(result.MSG);
      }
    });
  }
  /**
   * 取消
   */
  cancel() {
    CommonService.event(this.fcToken + '-close', {});
  }
}