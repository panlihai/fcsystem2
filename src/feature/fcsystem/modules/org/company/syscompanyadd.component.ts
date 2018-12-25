import { Component, OnInit } from '@angular/core';
import { SyscompanyBusiness } from '../../../business/syscompany.business';
import SystemBusiness from 'fccore2/classes/system.business';
import { ParentEditComponent } from 'fccomponent2';
import { CommonService } from 'fccore2/common/common';
import { Message } from 'fccore2';
@Component({
  selector: 'syscompanyadd',
  templateUrl: './syscompanyadd.component.html',
  styles: [`
 
  `]
})
export class SyscompanyaddComponent extends ParentEditComponent {

  //开票信息对象
  ivoiceObj: any = {};

  //注册信息对象
  registerObj: any = {};

  //单位隶属关系
  // syscompanyrelationObj: any = {};
  //父级编码
  parentObj: any;
  //维度编码
  dimObj: any;
  // 生效日期
  sbeginDate: Date;
  // 成立日期
  sestDate: Date;
  // 注销日期
  sendDate: Date;
  //单位隶属关系过滤
  // companyrelationCondition: string;
  //单位隶属关系
  syscompanyrelationOption: any = {};
  //是否已保存基础信息
  bIsSavedBase: boolean = false;
  //隶属关系 生效日期  失效日期
  RELATION_SBEGIN_DATE: any;
  RELATION_SEND_DATE: any;
  constructor() {
    super("SYSTEM", "SYSCOMPANY");
  }
  init() {
    //初始化应用对应字段
    // this.syscompanyrelationObj = SyscompanyBusiness.getSyscompanyrelationField();
    // this.ivoiceObj=SyscompanyBusiness.getApppFieldByAppID("SYSCOMPANYINVOICE");
    // this.registerObj=SyscompanyBusiness.getApppFieldByAppID("SYSCOMPANYREGISTER");
    //生效日期 
    this.RELATION_SBEGIN_DATE = CommonService.getDateByTimetamp(CommonService.getTimestamp());
    //失效日期    
    this.RELATION_SEND_DATE = CommonService.getDateByTimetamp(CommonService.getTimestampFromDate("2099-12-31"));
    //上级单位代码
    this.parentObj = {
      Code: this.routerParam.parentCode,
      Name: this.routerParam.parentName,
      DisplayNo: this.routerParam.displayNo
    }
    //维度代码
    this.dimObj = {
      Code: this.routerParam.dimCode,
      Name: this.routerParam.dimName
    }
    //单位隶属关系过滤
    // let relationCon: any = {
    //   WHERE: 'SDIM_CODE!=' + "'" + this.dimCode + "'"
    // }
    // this.companyrelationCondition = JSON.stringify(relationCon);
    //单位隶属关系 网格配置
    this.syscompanyrelationOption = SyscompanyBusiness.syscompanyrelationOption;
  }
  /**
   * 新增
   * @param mainObj 
   */
  addNew(mainObj: any): boolean {
    return true;
  }
  /**
   * 事件
   * @param eventName 事件名
   * @param param 返回参数
   */
  event(eventName: string, param: any): void {

  }
  /**
   * 事件
   * @param eventName 事件名
   * @param param 返回参数
   */
  pageEvent(eventName: string): void {
    switch (eventName) {
      case 'BASE':
        this.saveBaseInfo();
        break;
      case 'RELATION':
        this.saveRelationInfo();
        break;
      case 'KP':
        this.saveKpInfo();
        break;
      case 'ZC':
        this.saveZcInfo();
        break;
      default:
        break;
    }
  }
  /**
   * 保存前验证
   */
  beforeSave(): boolean {
    //成立日期
    this.mainObj.SEST_DATE = this.sestDate;
    //生效日期
    this.mainObj.SBEGIN_DATE = this.sbeginDate;
    //注销日期
    this.mainObj.SEND_DATE = this.sendDate;
    //自定义时间验证,生效日期不能大于成立日期，注销日期不能大于生效日期
    SyscompanyBusiness.validator(this.mainObj, this.mainValid);
    //平台不能空和最长输入长度的验证
    return !this.validator();
  }

  /**
     * 保存基本信息
     */
  saveBaseInfo() {
    if (this.parentObj && this.parentObj.Code) {
      // if(this.beforeSave()) //TODO
      {
        if (null == this.mainObj['SPARENT_CODE'] || 'null' == this.mainObj['SPARENT_CODE'])
          this.mainObj['SPARENT_CODE'] = '';
        this.mainObj["NDISPLAYNO"] = this.parentObj.DisplayNo;
        SyscompanyBusiness.saveOrUpdateCompany(this.mainObj, this.dimObj.Code, this.parentObj.Code)
          .subscribe(result => {
            if (result[0].CODE === '0' && result[1].CODE === '0') {
              SyscompanyBusiness.getDataByAppID_Col_Val("SYSCOMPANY", "SCOMPANY_CODE", this.mainObj.SCOMPANY_CODE).subscribe((result) => {
                if (result.CODE === '0' && result.DATA.length > 0) {
                  this.mainObj = result.DATA[0];
                  SystemBusiness.msgService.message('保存成功');
                  this.bIsSavedBase = true;
                }
              });
            } else {
              SystemBusiness.msgService.error("保存失败," + result[0].MSG + ',' + result[1].MSG);
            }
          })
      }
    } else {
      SystemBusiness.msgService.warm('请选择上级单位！');
    }
  }

  /**
   * 保存单位隶属关系信息
   */
  saveRelationInfo() {
    if (this.bIsSavedBase) {
      var _whereStr = "{SDIM_CODE:{eq:'" + this.dimObj.Code + "'},SORG_CODE:{eq:'" + this.mainObj.SCOMPANY_CODE + "'}}";
      SyscompanyBusiness.getDataByAppID_Where("SYSCOMPANYRELATION", _whereStr).subscribe((result) => {
        if (result.CODE === '0' && result.DATA.length > 0) {
          var relationObj = result.DATA[0]; 
          relationObj.SBEGIN_DATE = CommonService.dateFormat(this.RELATION_SBEGIN_DATE, 'yyyyMMdd');
          relationObj.SEND_DATE = CommonService.dateFormat(this.RELATION_SEND_DATE, 'yyyyMMdd');
          SyscompanyBusiness.saveOrUpdateExtendCompany("SYSCOMPANYRELATION", relationObj).subscribe((result) => {
            if (result[0].CODE === '0') {
              SyscompanyBusiness.msgService.message("保存成功！");
            }
          });
        }
      });
    } else {
      SyscompanyBusiness.msgService.message("请先保存基本信息！");
    }
  }

  /**
    * 保存开票信息
    */
  saveKpInfo() {
    // this.bIsSavedBase = true;//TODO 测试用
    if (this.bIsSavedBase) {
      this.ivoiceObj.SCOMP_ID = this.mainObj.ID;// CommonService.guid();
      this.ivoiceObj.SCRATOR = SyscompanyBusiness.userService.getUserInfo().USERCODE;//创建人
      this.ivoiceObj.SCREATE_TIME = CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd');//创建时间
      SyscompanyBusiness.saveOrUpdateExtendCompany("SYSCOMPANYINVOICE", this.ivoiceObj)
        .subscribe(result => {
          if (result[0].CODE === '0' && result[1].CODE === '0') {
            SyscompanyBusiness.getDataByAppID_Col_Val("SYSCOMPANYINVOICE", "SCOMP_ID", this.mainObj.ID).subscribe((result) => {
              if (result.CODE === '0' && result.DATA.length > 0) {
                this.ivoiceObj = result.DATA[0];
                SystemBusiness.msgService.message('保存成功');
              }
            });
          } else {
            SystemBusiness.msgService.error("保存失败," + result[0].MSG + ',' + result[1].MSG);
          }
        })
    } else {
      SyscompanyBusiness.msgService.message("请先保存基本信息！");
    }
  }
  /**
      * 保存注册信息
      */
  saveZcInfo() {
    // this.bIsSavedBase = true;//TODO 测试用
    if (this.bIsSavedBase) {
      this.registerObj.SCOMP_ID = this.mainObj.ID;// CommonService.guid();
      this.registerObj.SCRATOR = SyscompanyBusiness.userService.getUserInfo().USERCODE;//创建人
      this.registerObj.SCREATE_TIME = CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd');//创建时间
      SyscompanyBusiness.saveOrUpdateExtendCompany("SYSCOMPANYREGISTER", this.registerObj)
        .subscribe(result => {
          if (result[0].CODE === '0') {
            SyscompanyBusiness.getDataByAppID_Col_Val("SYSCOMPANYREGISTER", "SCOMP_ID", this.mainObj.ID).subscribe((result) => {
              if (result.CODE === '0' && result.DATA.length > 0) {
                this.registerObj = result.DATA[0];
              }
            });
            SystemBusiness.msgService.message('保存成功');
          } else {
            SystemBusiness.msgService.error("保存失败," + result[0].MSG + ',' + result[1].MSG);
          }
        })
    } else {
      SyscompanyBusiness.msgService.message("请先保存基本信息！");
    }
  }
}
