
import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import SystemBusiness from 'fccore2/classes/system.business';
import { CommonService } from 'fccore2/common/common';
// import SysdepartmentBusiness from 'src/feature/fcsystem/business/sysdepartment.business';
// import SysdepartmentBusiness from 'src/feature/fcsystem/business/sysdepartment.business';
import { SysdepartmentBusiness } from '../../../business/sysdepartment.business';
import FccomponentEvent from 'fccomponent2/business/fccomponet.event';
@Component({
  selector: 'sysdepartment',
  templateUrl: './sysdepartment.component.html',
  styles: [`
  `]
})
export class SysdepartmentComponent extends ParentlistComponent {
  fcOption: any;
  fcRowData: any[];
  syscompanydimCondition: string;
  keyWords: any;
  nowdate: Date;
  validator: any;
  beforeSave: any;
  processValue: any;
  mainObj: any;
  constructor() {
    super('SYSTEM', 'SYSDEPARTMENT');
  }
  init(): void {
    this.enableAutoSearch = false;
    // this.fcOption.fcFields=SystemBusiness.appService.getListButtonsByAppid(this.appId);
    this.enableAutoSearch = false;
    this.fcRowData = [];
    let dimCondition = { WHERE: "{DICID:{eq: 'SYSCOMPANYDIN'}}" };
    this.syscompanydimCondition = JSON.stringify(dimCondition);

  }
  addNew(mainObj: any): boolean {
    return true;
    }
  getDefaultQuery(): any {
    return {};
  }
  event(eventName: string, context: any): void {
    switch (eventName) {
      case "SEARCH":
        let condition: any = {};
        condition.keyWords = this.keyWords;
        condition.NOWDATE = CommonService.dateFormat(this.nowdate, "yyyy-MM-dd");
        SysdepartmentBusiness.findDepartment(condition).subscribe(result => {
          if (result.CODE === '0') {
            this.fcRowData = result.DATA;
          }
        })
        break;
    }

  }

  /**
 * 列表批量删除
 * @param event 
 */
  listDelete(event): void {
    if (this.selectedObjects.length === 0) {
      SystemBusiness.msgService.warm('请选择至少一条记录！');
      return;
    }
    let canDo = true;
    for (let i = 0; i < this.selectedObjects.length; i++) {
      let mainObj = this.selectedObjects[i];
      if (!this.beforeDelete(mainObj)) {
        canDo = false;
        break;
      }
    }

    if (!canDo) {
      return;
    }
    let ids = [];
    this.selectedObjects.forEach(obj => {
      ids.push({ ID: obj.ID });
    });
    CommonService.event(FccomponentEvent.modal.confirm, {
      title: '确认删除记录吗？',
      okFunc: () => {
        SysdepartmentBusiness.deleteDepartments(this.mainApp.APPID, ids, 'SYSDEPARTMENT').subscribe(result => {
          if (result.CODE === '0') {
            this.afterDelete();
            this.selectedObjects.forEach(obj => {
              /** this.listWnd.deleteRowDataById([obj.ID]);*/
            })
            SystemBusiness.msgService.message('删除成功！');
          } else {
            SystemBusiness.msgService.message('删除失败！');
          }
        });
      },
      cancelFunc: () => { }
    });
  }
      /**
     * 保存返回
     * @param action 事件名称
     */
  cardSaveBack(event): void{  
    console.log(1) 
        if (!this.validator()) {
            return;
        }
        if (this.beforeSave()) {
          SysdepartmentBusiness.createDepartments(this.appId, this.mainObj,'SYSDEPARTMENT').subscribe(result=> {
                if (result.CODE === '0') {
                    SystemBusiness.msgService.message('保存成功！');
                    // _this.afterSave();
                    // _this.objStatus = ObjStatus.SAVED;
                    // _this.cardBack(action);
                }
                else {
                    SystemBusiness.msgService.message('保存失败！');
                }
            });
        }
    };
}