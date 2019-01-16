import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import { CommonService } from 'fccore2/common/common';
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
  fcOption: GRIDOPTIONS;
  fcRowData: any[];
  syscompanydimCondition: string;
  constructor() {
    super('SYSTEM', 'SYSCOMPANY');
  }
  init(): void {
    this.fcOption = Object.assign({}, FclistdataBusiness.fcOption);
    this.fcOption.fcFields = SystemBusiness.appService.getListFieldsByAppid(this.appId);
    this.enableAutoSearch = false;
    this.nowdate = new Date();
    this.fcRowData = [];
    let dimCondition = {WHERE: "{DICID: {eq: 'SYSCOMPANYDIM'}}"};
    this.syscompanydimCondition = JSON.stringify(dimCondition);
  }
  getDefaultQuery(): any {
    return {
      NOWDATE: CommonService.dateFormat(this.nowdate, "yyyy-MM-dd")
    };
  }
  event(eventName: string, context: any): void {
    switch (eventName) {
      case "SEARCH":
        this.search();
        SyscompanyBusiness.findWithQuery(this.condition).subscribe(result => {
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