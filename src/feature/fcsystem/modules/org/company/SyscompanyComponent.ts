import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import { CommonService } from 'fccore2/common/common';
import FccomponentEvent from "fccomponent2/business/fccomponet.event";
import { SyscompanyBusiness } from '../../../business/syscompany.business';
import FclistdataBusiness, { GRIDOPTIONS } from 'fccomponent2/business/fclistdata.business';
import SystemBusiness from 'fccore2/classes/system.business';
@Component({
  selector: 'syscompany',
  templateUrl: './syscompany.component.html',
  styles: [`

  `]
})
export class SyscompanyComponent extends ParentlistComponent {
  nowdate: any;
  keyWords: any;
  fcOption: GRIDOPTIONS;
  fcRowData: any[];
  syscompanydimCondition: string;
  mainObj: any;
  constructor() {
    super('SYSTEM', 'SYSCOMPANY');
  }
  init(): void {
    this.fcOption = Object.assign({}, FclistdataBusiness.fcOption);
    this.fcOption.fcFields = SystemBusiness.appService.getListFieldsByAppid(this.appId);
    this.enableAutoSearch = false;
    this.fcRowData = [];
    this.nowdate = new Date();
    let dimCondition = { WHERE: "{DICID: {eq: 'SYSCOMPANYDIM'}}" };
    this.syscompanydimCondition = JSON.stringify(dimCondition);
  }
  getDefaultQuery(): any {
    return {}
  }
  /**
 * 删除一条记录
 * @param context 
 */
  // listDelete(context: any): void {
  //   console.log(13)
  //   console.log(this.mainObj)
  //   CommonService.event(FccomponentEvent.modal.confirm, {
  //     title: '确认删除记录吗？',
  //     okFunc: () => {
  //       let mainObj = context.param;
  //       if (this.beforeDelete(mainObj)) {
  //         SyscompanyBusiness.deleteComapny(this.mainApp.APPID, mainObj.ID, 'SYSCOMPANY').subscribe(result => {
  //           if (result.CODE === '0') {
  //             this.afterDelete();
  //             SystemBusiness.msgService.message('删除成功！');
  //             this.search();
  //           } else {
  //             SystemBusiness.msgService.message('删除失败！');
  //           }
  //         });
  //       }
  //     },
  //     cancelFunc: () => { }
  //   });
  //   /**阻止冒泡*/
  //   event.stopPropagation();
  //   event.preventDefault();
  // }


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
            SyscompanyBusiness.deleteComapnys(this.mainApp.APPID, ids,'SYSCOMPANY').subscribe(result => {
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
  event(eventName: string, context: any): void {
    switch (eventName) {
      case "SEARCH":
        let condition: any = {};
        condition.keyWords = this.keyWords; //关键字
        condition.NOWDATE = CommonService.dateFormat(this.nowdate, "yyyy-MM-dd");
        SyscompanyBusiness.findCompany(condition).subscribe(result => {
          if (result.CODE === '0') {
            this.fcRowData = result.DATA;
          }
        })
        break;
    }
  }
}




/*        and: {and:[{a: 5}, {a: 6}]}, //(a = 5 AND a=6 )
           or: {or：[{a: 5}, {a: 6}]}, (a = 5 OR a = 6)
           gt: {a:{gt:6}}, // > 6
          gte: {a:{gte:6}}, // >= 6
           lt: {a:{lt:10}}, // < 10
          lte: {a:{lte:10}},// <= 10
           ne: {a:{ne:20}}, // != 20
           eq: {a:{eq:3}}, // = 3
   *      not: {a:{not:true}}, // IS NOT TRUE
      between: {a:{between:[6,10]}}, //a BETWEEN 6 AND 10
   notBetween: {a:{notBetween:[11, 15]}}, // NOT BETWEEN 11 AND 15
           in: {a:{in:[1, 2]}}, // IN 1, 2]
        notIn: {a:{notIn:[1, 2]}}, // NOT IN [1, 2]
         like: {a:{like:'%hat'}}, // LIKE '%hat'
      notLike: {a:{notLike:'%hat'}} // NOT LIKE '%hat'
           is: {a:{is:'null'}} // is null
        isnot: {a:{isnot:'null'}} // is not null
   **/