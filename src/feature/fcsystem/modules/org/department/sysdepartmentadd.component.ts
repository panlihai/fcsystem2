import { Component, OnInit, ViewChild } from '@angular/core';
import { ParentEditComponent, FctreeComponent } from 'fccomponent2';
import { CommonService } from 'fccore2/common/common';
import SysdepartmentBusiness from '../../../business/sysdepartment.business';
import { FCEVENT } from 'fccomponent2/fc';
@Component({
  selector: 'sysdepartmentadd',
  templateUrl: './sysdepartmentadd.component.html',
  styles: [`
  `]
})
export class SysdepartmentaddComponent extends ParentEditComponent {
  //父级编码
  parentObj: any;
  //上级单位信息对象
  relationObj: any = {};
  //是否已保存基础信息
  bIsSavedBase: boolean = false;
  //部门弹窗是否显示
  // isVisible : boolean = false; 
  //部门树的配置
  departmentTreeOptions: any;
  //树选中节点
  selectedTreeObj: any;
  checkOptions: any[] = [];

  @ViewChild('tree')
  tree: FctreeComponent;
  //隶属关系 生效日期  失效日期
  SBEGIN_DATE: any;
  SEND_DATE: any; 

  constructor() {
    super("SYSTEM", "SYSDEPARTMENT");

  }
  /**
   * 初始化
   */
  init() {
    //上级单位代码
    this.parentObj = {
      Code: this.routerParam.parentCode,
      Name: this.routerParam.parentName
    }
    //初始化树结构
    this.departmentTreeOptions = SysdepartmentBusiness.departmentTreeOptions;
    // this.isVisible = false;
    //生效日期 
    this.SBEGIN_DATE = CommonService.getDateByTimetamp(CommonService.getTimestamp());
    //失效日期    
    this.SEND_DATE = CommonService.getDateByTimetamp(CommonService.getTimestampFromDate("2099-12-31"));
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
  pageEvent(eventName: string): void {
    switch (eventName) {
      case 'BASE':
        //保存基本信息
        this.saveBaseInfo();
        break;
      case 'unit':
        //保存上级单位信息
        this.saveUnit();
        break;
      case 'principal':
        //保存负责人信息
        this.principal();
        break;
    }
  }
  /**
* 保存基本信息
*/
  saveBaseInfo() {
    if (this.parentObj && this.parentObj.Code) {
      // if(this.beforeSave()) //TODO
      {
        SysdepartmentBusiness.saveOrUpdateDepartment(this.mainObj, this.parentObj.Code)
          .subscribe(result => {
            if ((this.mainObj.ID != '' && result[0].CODE === '0') || (this.mainObj.ID == '' && result[0].CODE === '0' && result[1].CODE === '0')) {
              SysdepartmentBusiness.getDataByAppID_Col_Val("SYSDEPARTMENT", "SDEPT_CODE", this.mainObj.SDEPT_CODE).subscribe((result) => {
                if (result.CODE === '0' && result.DATA.length > 0) {
                  this.mainObj = result.DATA[0];
                  SysdepartmentBusiness.msgService.message('保存成功');
                  this.bIsSavedBase = true;
                }
              });

            } else {
              SysdepartmentBusiness.msgService.error("保存失败," + result[0].MSG + ',' + result[1].MSG);
            }
          })
      }
    } else {
      SysdepartmentBusiness.msgService.warm('请选择上级单位！');
    }
  }
  /**
   * 保存上级单位
   */
  saveUnit() {
    if (this.bIsSavedBase) {
      this.relationObj.SCOMP_ID = this.mainObj.ID;// CommonService.guid();
      this.relationObj.SCRATOR = SysdepartmentBusiness.userService.getUserInfo().USERCODE;//创建人
      this.relationObj.SCREATE_TIME = CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd');//创建时间
      SysdepartmentBusiness.getDataByAppID_Col_Val("SYSDEPARTMENTRELATION", "SCOMP_ID", this.mainObj.ID).subscribe((result) => {
        if (result[0].CODE === '0') {
          var relationObj = result.DATA[0];
          relationObj.SBEGIN_DATE = CommonService.dateFormat(this.SBEGIN_DATE, 'yyyyMMdd');
          relationObj.SEND_DATE = CommonService.dateFormat(this.SEND_DATE, 'yyyyMMdd');
          SysdepartmentBusiness.saveOrUpdateExtendDepartment("SYSDEPARTMENTRELATION", this.relationObj).subscribe(result => {
            if (result.CODE === '0') {
              // this.relationObj = result.DATA[0];
              SysdepartmentBusiness.msgService.message('保存成功');
            }
          });
          SysdepartmentBusiness.msgService.message('保存成功');
        } else {
          SysdepartmentBusiness.msgService.error("保存失败," + result[0].MSG + ',' + result[1].MSG);
        }
      })
    } else {
      SysdepartmentBusiness.msgService.message("请先保存基本信息！");
    }
  }
  /**
   * 保存负责人信息
   */
  principal() {
    if (this.bIsSavedBase) {
      this.mainObj.SMODIFIER = SysdepartmentBusiness.userService.getUserInfo().USERCODE;//创建人
      this.mainObj.SMODIFY_TIME = CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd');//创建时间
      SysdepartmentBusiness.saveOrUpdateExtendDepartment("SYSFDEPARTMENT", this.mainObj)
        .subscribe(result => {
          if (result[0].CODE === '0') {
            SysdepartmentBusiness.msgService.message('保存成功');
          } else {
            SysdepartmentBusiness.msgService.error("保存失败," + result[0].MSG + ',' + result[1].MSG);
          }
        })
    }
  }
  /**
   * 事件
   * @param eventName 事件名
   * @param param 返回参数
   */
  event(eventName: string, param: any): void {

  }
}
