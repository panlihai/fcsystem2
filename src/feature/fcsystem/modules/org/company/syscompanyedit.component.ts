// import { Component } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SyscompanyBusiness } from '../../../business/syscompany.business';
import SystemBusiness from 'fccore2/classes/system.business';
import { CommonService } from 'fccore2/common/common';
import { Component, OnInit } from '@angular/core';
import { ObjStatus } from "fccore2/common/constant";
@Component({
  selector: 'nz-demo-table-edit-cell',
  templateUrl: './syscompanyedit.component.html',
  styles: [`
    :host ::ng-deep .detailTitlle{
        margin-top: 30px;
      }
    :host ::ng-deep .fc-layoutpanel {
        background-color: #f0f2f5;
    }
    `]
})
export class SyscompanyeditComponent extends ParentEditComponent {
  i = 1;
  editCache = {};
  dataSet = [
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0'
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1'
    }
  ];
  superiorUnit: any;
  levelCondition: string;
  cityConditon: string = "";
  isChange: boolean = false;
  constructor() {
    super(SyscompanyBusiness.pid, SyscompanyBusiness.appId);
  }
  init(): void {
    let lCondition = { WHERE: "{DICID:{eq:'SYSCOMPANYILEVEL'}}" };
    this.levelCondition = JSON.stringify(lCondition);
    this.mainObj.SCREATE_TIME = new Date();
    // if(this.mainObj.SBEGIN_DATE || this.mainObj.SEST_DATE) {
    //     this.mainObj.SBEGIN_DATE = CommonService.dateFormat(this.mainObj.SBEGIN_DATE, "yyyy-MM-dd");
    //     this.mainObj.SEST_DATE = CommonService.dateFormat(this.mainObj.SEST_DATE, "yyyy-MM-dd");
    // }
  }
  addNew(mainObj: any): boolean {
    return true;
  }
  event(eventName: string, param: any): void {
    switch (eventName) {
      case 'provinceChange':
        let lCondition = { "ORDER": "SORT", WHERE: "{PARENT:{eq:'" + param + "'}}" };
        this.cityConditon = JSON.stringify(lCondition);
        break;
    }
  }
  beforeSave(): boolean {
    if (this.mainObj.SBEGIN_DATE || this.mainObj.SCREATE_TIME || this.mainObj.SEST_DATE) {
      this.mainObj.SBEGIN_DATE = CommonService.dateFormat(this.mainObj.SBEGIN_DATE, "yyyy-MM-dd");
      this.mainObj.SCREATE_TIME = CommonService.dateFormat(this.mainObj.SCREATE_TIME, "yyyy-MM-dd");
      this.mainObj.SEST_DATE = CommonService.dateFormat(this.mainObj.SEST_DATE, "yyyy-MM-dd");
    }
    this.mainObj.BIS_VIRTUAL = "N"; //虚拟单位
    this.mainObj.BIS_LAST = "N"; //是否末级
    this.mainObj.BIS_CORPORATION = "N";// 是否是法人单位
    this.mainObj.SPARENT_CODE = this.superiorUnit.SPARENT_CODE; //上级单位
    this.mainObj.SPARENT_PATH = this.superiorUnit.SPARENT_PATH + this.superiorUnit.SCOMPANY_CODE;
    this.mainObj.SOPERATE_STATUS = "1"; //假数据
    this.mainObj.SAPPROVE_STATUS = "Y"; //假数据
    return true;
  }
  addRow(): void {
    this.i++;
    this.dataSet = [...this.dataSet, {
      key: `${this.i}`,
      name: `Edward King ${this.i}`,
      age: '32',
      address: `London, Park Lane no. ${this.i}`
    }];
    this.updateEditCache();
  }

  /**
   * 保存新建
   * @param action 
   */
  saveNew(action: string): void {
    console.log(89)
    if (!this.validator()) {
      return;
    }
    if (this.beforeSave()) {
      let companyObj: any = [{ COMPANY: [], RELATION: [] }];
      companyObj[0].COMPANY[0] = this.mainObj;
      SyscompanyBusiness.createCompany(this.appId, companyObj, 'SYSCOMPANY').subscribe(result => {
        if (result.CODE === '0') {
          SystemBusiness.msgService.message('保存成功！');
          this.afterSave();
          this.objStatus = ObjStatus.ADDED;
          this.mainObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
        } else {
          SystemBusiness.msgService.message('保存失败！');
        }
      });
    }
  }
  /**
   * 保存复制                                               
   * @param action 
   */
  cardSaveCopy(action: string): void {
    if (!this.validator()) {
      return;
    }
    if (this.beforeSave()) {
      let companyObj: any = [{ COMPANY: [], RELATION: [] }];
      companyObj[0].COMPANY[0] = this.mainObj;
      SyscompanyBusiness.createCompany(this.appId, companyObj, 'SYSCOMPANY').subscribe(result => {
        if (result.CODE === '0') {
          SystemBusiness.msgService.message('保存成功！');
          this.afterSave();
          this.objStatus = ObjStatus.ADDED;
          this.mainObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
        } else {
          SystemBusiness.msgService.message('保存失败！');
        }
      });
    }
  }
  /**
  * 保存
  * @param action 事件名称
  */
  cardSave(action: string): void {
    if (!this.validator()) {
      return;
    }
    if (this.beforeSave()) {
      let companyObj: any = [{ COMPANY: [], RELATION: [] }];
      companyObj[0].COMPANY[0] = this.mainObj;
      SyscompanyBusiness.createCompany(this.appId, companyObj, 'SYSCOMPANY').subscribe(result => {
        if (result.CODE === '0') {
          SystemBusiness.msgService.message('保存成功！');
          this.afterSave();
          this.objStatus = ObjStatus.ADDED;
          this.mainObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
        } else {
          SystemBusiness.msgService.message('保存失败！');
        }
      });
    }
  }
  /**
   * 保存返回
   * @param action 事件名称
   */
  // cardSaveBack(action: string): void {
  //   console.log(36)
  //   if (!this.validator()) {
  //     return;
  //   }
  //   if (this.beforeSave()) {
  //     let companyObj: any = [{ COMPANY: [], RELATION: [] }];
  //     companyObj[0].COMPANY[0] = this.mainObj;
  //     SyscompanyBusiness.createCompany(this.appId, companyObj, 'SYSCOMPANY').subscribe(result => {
  //       if (result.CODE === '0') {
  //         SystemBusiness.msgService.message('保存成功！');
  //         this.afterSave();
  //         this.objStatus = ObjStatus.ADDED;
  //         this.mainObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
  //       } else {
  //         SystemBusiness.msgService.message('保存失败！');
  //       }
  //     });
  //   }
  // }

  cardSaveBack(action: string): void {
    console.log(36)
    if (!this.validator()) {
      return;
    }
    if (this.beforeSave()) {
      let companyObj: any = [{ COMPANY: [], RELATION: [] }];
      companyObj[0].COMPANY[0] = this.mainObj;
      SyscompanyBusiness.createCompany(this.appId, companyObj, 'SYSCOMPANY').subscribe(result => {
        if (result.CODE === '0') {
          SystemBusiness.msgService.message('保存成功！');
          this.afterSave();
          this.objStatus = ObjStatus.SAVED;
          this.cardBack('');
        }
        else {
          SystemBusiness.msgService.message('保存失败！');
        }
      });
    }
  };

  cardBack(event): void {
    this.navigateList();
  };

  deleteRow(i: string): void {
    const dataSet = this.dataSet.filter(d => d.key !== i);
    this.dataSet = dataSet;
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  finishEdit(key: string): void {
    this.editCache[key].edit = false;
    this.dataSet.find(item => item.key === key).name = this.editCache[key].name;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[item.key]) {
        this.editCache[item.key] = {
          edit: false,
          name: item.name
        };
      }
    });
  }

  ngOnInit(): void {
    this.updateEditCache();
  }
}