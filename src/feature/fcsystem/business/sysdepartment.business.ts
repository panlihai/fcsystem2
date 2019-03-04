
import ParentBusiness from "fccore2/classes/parent.business";
import { Subject, Observable, ObservableInput } from "rxjs";
import { FclistdataComponent, TreeOptions } from "fccomponent2";
import { CommonService } from "fccore2/common/common";
import SystemBusiness from "fccore2/classes/system.business";
import { GridApi } from "ag-grid-community";
import { RowDataTransaction } from "ag-grid-community/dist/lib/rowModels/clientSide/clientSideRowModel";

export class SysdepartmentBusiness extends ParentBusiness {
  static appId = "SYSDEPARTMENT";
  static pid = "SYSTEM";

  /**
   * 子表数据修改保存
   */
  childrensave(obj) {
    return SystemBusiness.appService.updateObject('SYSDEPARTMENTDIM', obj).subscribe(res => {
      if (res.CODE = '0') {
        SystemBusiness.msgService.success('保存成功');
      } else if (res.CODE = '1') {
        SystemBusiness.msgService.error('保存失败')
      }
    })
  }

  /**
   * 部门
   */
  static updateEmployeeSubject = new Subject();
  /** 
    * 根据单位编码获取失效日期
    * @param companyCode 
    */
  static getCompanyEndDate(companyCode) {
    return SysdepartmentBusiness.appService.findWithQuery('SYSCOMPANY', { where: "{SCOMPANY_CODE:{eq:'`+${companyCode}+`'}}" })
  }
  /** 
    * 保存前进行的部门员工信息处理
    * @param listdata 
    * @param mainObj 
    */
  static updateEmployeeDept(listdata: FclistdataComponent, mainObj: any) {
    let gridApi: GridApi = listdata._gridApi;
    let saveArr: any = [];
    let msgCountOne: boolean = false;
    let success: boolean;
    gridApi.forEachNode(node => {
      saveArr.push(node.data);
    })
    saveArr.forEach(el => {
      delete el['DOACTION'];
      delete el['RN'];
      delete el['ROWNUM'];
      el['SBIRTH_DATE'] = CommonService.dateFormat(CommonService.getDateByTimetamp(el['SBIRTH_DATE']), 'YYYY/MM/DD')
      el['SFIRST_WORK_DATE'] = CommonService.dateFormat(CommonService.getDateByTimetamp(el['SFIRST_WORK_DATE']), 'YYYY/MM/DD')
      el['SMODIFIER'] = SysdepartmentBusiness.getUserinfo().USERCODE;
      el['SMODIFI_TIME'] = CommonService.getDate('');
      el['SCOMPANY_CODE'] = mainObj['SCOMPANY_CODE']
      SysdepartmentBusiness.appService.updateObject("SYSEMPLOYEE", el).subscribe(res => {
        if (res.CODE === '0') {
          if (!msgCountOne) {
            SysdepartmentBusiness.msgService.success("职员信息更新成功");
            msgCountOne = true;
            success = true;
            SysdepartmentBusiness.updateEmployeeSubject.next(success);
          }
        } else {
          if (!msgCountOne) {
            SysdepartmentBusiness.msgService.error("职员信息更新失败");
            msgCountOne = true;
          }
        }
      });
    });
    return true;
  }
  /** 
    * 过滤列表
    * @param listdata 
    */
  static IdNotInList_conditon(listdata: FclistdataComponent) {
    let gridApi: GridApi = listdata._gridApi;
    let ids: any = [];
    let rowData = gridApi.getRenderedNodes()
    if (rowData) {
      rowData.forEach(el => {
        ids.push(el.data.ID);
      })
    }
    if (ids && ids.length !== 0) {
      let s = SysdepartmentBusiness.arrayToSqlString(ids)
      return { WHERE: `ID NOT IN (${s})` }
    }
  }
  /**  
    * 数组转sql批查询条件
    * @param array
    */
  static arrayToSqlString(array: Array<any>) {
    let str: string = "";
    for (let i = 0; i < array.length; i++) {
      str += `'${array[i]}'`;
      if (i !== array.length - 1) {
        str += ",";
      }
    }
    return str.toString();
  }
  /** 
    * 从列表获取相关信息
    * @param listComp 
    */
  static getInfoFromList(listComp: FclistdataComponent) {
    let gridApi: GridApi = listComp._gridApi;
    let state: string = DialogListState.noValue;
    let data: any = [];
    gridApi.forEachNode(el => {
      state = DialogListState.existValue;
      data.push(el.data);
    })
    return { state: state, data: data };
  }
  /** 
    * 处理列表弹窗数据的业务函数
    * @param Args_Dialog 
    */
  // static dialogOk(dialogListArgs: DialogListArgs) {
  //   let gridApi: GridApi = dialogListArgs.dialogList._gridApi;
  //   let target_gridApi: GridApi = undefined;
  //   if (dialogListArgs.targetList instanceof FclistdataComponent) {
  //     target_gridApi = dialogListArgs.targetList._gridApi;
  //   }
  //   let selected = gridApi.getSelectedRows();
  //   let toChange: RowDataTransaction = {};
  //   let backObj: any;
  //   if (gridApi && target_gridApi) {
  //     toChange.add = selected;
  //     target_gridApi.updateRowData(toChange)
  //   } else {
  //     backObj = gridApi.getSelectedRows()[0];
  //   }
  //   return backObj;
  // }
  /** 
    * 删除员工信息表
    * @param employeeList_dept 
    */
  delEmployee(employeeList_dept) {
    let gridApi: GridApi = employeeList_dept._gridApi;
    let selected = gridApi.getSelectedRows();
    let toChange: RowDataTransaction = {};
    toChange.remove = selected;
    gridApi.updateRowData(toChange)
  }
  stringAsNumToMinus(ilevel: string, value: number) {
    return (Number.parseInt(ilevel) - value).toString();
  }
  /** 
    * 根据id获取主对象的编辑数据
    * @param id 
    */
  static getDefaultDataById(param: any): Observable<any> {
    // return SysdepartmentBusiness.initMainObj(param);
    return;
  }
  /** 
    * 根据id获取部门隶属关系对象的编辑数据
    * @param id 
    */
  static getModifyDepartmentRelationData(param: any): Observable<any> {
    // return SysdepartmentBusiness.appService.initMainObj(param);
    return
  }
  /** 
    * 获取部门隶属关系的字段
    */
  static getSysdepartmentrelationField() {
    SysdepartmentBusiness.appService.getFormFieldsByAppid("SYSCOMPANYRELATION").forEach(item => {
      return item;
    });
  }
  /**
 * 保存或者修改单位信息
 * @param mainObj 单位基本信息对象
 * @param relationObj 单位隶属关系对象
 */
  static saveOrUpdateDepartment(mainObj: any, parentCode?: string): Observable<any> {
    let relationObj: any = {};
    //单位是否启用
    mainObj.BSTOP_FLAG = '0';
    //填写的信息保存到单位隶属表中
    //生效日期
    if (mainObj.SBEGIN_DATE !== null && mainObj.SBEGIN_DATE !== undefined && mainObj.SBEGIN_DATE !== '') {
      if (mainObj.SBEGIN_DATE.length != 8)
        mainObj.SBEGIN_DATE = CommonService.dateFormat(mainObj.SBEGIN_DATE, 'yyyyMMdd');
    } else {
      mainObj.SBEGIN_DATE = '';
    }
    //失效日期
    if (mainObj.SEND_DATE !== null && mainObj.SEND_DATE !== undefined && mainObj.SEND_DATE !== '') {
      if (mainObj.SEND_DATE.length != 8)
        mainObj.SEND_DATE = CommonService.dateFormat(mainObj.SEND_DATE, 'yyyyMMdd');
    } else {
      mainObj.SEND_DATE = '';
    }
    //成立日期
    if (mainObj.SEST_DATE !== null && mainObj.SEST_DATE !== undefined && mainObj.SEST_DATE !== '') {
      if (mainObj.SEST_DATE.length != 8)
        mainObj.SEST_DATE = CommonService.dateFormat(mainObj.SEST_DATE, 'yyyyMMdd');
    } else {
      mainObj.SEST_DATE = '';
    }
    //是否虚拟单位
    mainObj.BIS_VIRTUAL = '0';
    //是否法人单位
    mainObj.BIS_VIRTUAL = '1';//todo  因为页面复选框不起作用，先写固定值
    //创建人 创建时间    
    mainObj.SCRATOR = SysdepartmentBusiness.userService.getUserInfo().USERCODE;
    mainObj.SCREATE_TIME = CommonService.dateFormat(CommonService.getDateByTimetamp(CommonService.getMilliseconds()), 'yyyyMMdd');

    if (mainObj.ID === undefined || mainObj.ID === '') {
      relationObj = {
        ID: null,
        SBEGIN_DATE: CommonService.dateFormat(CommonService.getDateByTimetamp(CommonService.getMilliseconds()), 'yyyyMMdd'),//生效日期
        SEND_DATE: '20991231',//失效日期
        SDIM_CODE: 'XZWD',//维度代码
        SDEPT_CODE: mainObj.SDEPT_CODE,//组织机构代码
        SPARENT_CODE: parentCode,//上级组织机构代码
        SPARENT_PATH: parentCode + ':' + mainObj.SCOMPANY_CODE,//上级组织机构路径
        NDISPLAYNO: '0',
        SCRATOR: SysdepartmentBusiness.userService.getUserInfo().USERCODE,//创建人
        SCREATE_TIME: CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd'),//创建时间
      }
      // 并行执行多个任务，保存单位表和单位隶属关系表的对象
      return CommonService.createObservableJoin([
        SysdepartmentBusiness.appService.saveObject("SYSDEPARTMENT", mainObj),
        SysdepartmentBusiness.appService.saveObject("SYSDEPARTMENTRELATION", relationObj)
      ]);
    } else {
      //修改页面id不为空时是修改页面，更新单位和单位隶属关系修改的数据
      return CommonService.createObservableJoin([
        SysdepartmentBusiness.appService.updateObject("SYSDEPARTMENT", mainObj)
      ]);
    }
  }
  /**
   *保存上级单位/负责人信息
   * @param appId 应用ID
   * @param extendObj 扩展信息对象
   */
  static saveOrUpdateExtendDepartment(appId: string, extendObj: any): Observable<any> {
    if (extendObj.ID === undefined || extendObj.ID === '') {
      return CommonService.createObservableJoin([
        SysdepartmentBusiness.appService.saveObject(appId, extendObj)
      ]);
    }
    else {
      return CommonService.createObservableJoin([
        SysdepartmentBusiness.appService.updateObject(appId, extendObj)
      ]);
    }
  }
  /**
   * 撤销单位
   * @param selectedObj 
   */
  static cancelDepartment(selectedObj: any): Observable<any> {
    if (selectedObj.ID !== '') {
      selectedObj.BSTOP_FLAG = '1';
      selectedObj.SMODIFIER = this.getUserinfo().USERCODE;
      selectedObj.SMODIFY_TIME = CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd');
      return SysdepartmentBusiness.appService.saveObject("SYSDEPARTMENT", selectedObj);
    }
  }
  static departmentTreeOptions: TreeOptions = {
    //元数据id
    fcAppid: "SYSTBVDEPTCURORG",//元数据id   
    //树结构节点显示内容
    // fcLabel: '#{SDEPT_NAME}#:#{SDIM_CODE}#',//支持:{参数名称}
    fcLabel: '#{SDEPT_NAME}#',//支持:{参数名称}
    // 关联父节点字段名称
    fcParentCode: 'SPARENT_CODE',
    // 当前节点字段名称
    fcChildCode: 'SDEPT_CODE',
    // 叶子节点字段名称
    fcLeafCode: 'ISLAST',
    // 根节点条件
    // fcTopWhere: "(SPARENT_CODE is null or SPARENT_CODE = '')  and SDIM_CODE = 'ysdw' and SEND_DATE <= 2018072619 AND SEND_DATE >= 2018072619",
    fcTopWhere: "{or:[{SPARENT_CODE:{is:'null'}},{SPARENT_CODE:{'eq':''}}]}",
    // fcTopWhere: "{or:[{SPARENT_CODE:{is:'null'}},{SPARENT_CODE:''}],SDIM_CODE:{eq:'ysdw'},SBEGIN_DATE:{lte:2018-07-26},SEND_DATE:{gte:2018-07-26}}",
    // 展开条件
    // fcExpWhere: "SPARENT_CODE=':{SDEPT_CODE}' and SDIM_CODE = 'ysdw' and SEND_DATE <= 2018072619 AND SEND_DATE >= 2018072619",
    // fcExpWhere: "{SPARENT_CODE:{eq:'#{SDEPT_CODE}#'},SDIM_CODE:'ysdw',SEND_DATE:{lte:2018-07-26},SEND_DATE:{gte:2018-07-26}}",
    // fcExpWhere: "{SPARENT_CODE:{eq:'#{SDEPT_CODE}#'}}",
    fcExpWhere: "{SPARENT_CODE:{eq:'#{SDEPT_CODE}#'}}",
    // 排序字段
    fcOrderby: "",
    // 模式 false为单选，true为多选
    fcMode: true,
    // 展开子节点
    fcOpenChild: false,
    // 是否显示线条
    fcShowLine: true,
    //是否可拖拽
    fcAllowDrag: false,
    fcLeafValue: 'N',
    // 是否可选择
    fcCheckable: false,
    // 是否多选
    fcMutliple: false,
    // 是否异步加载数据
    fcAsync: true
  }
  /** 
    * 克隆树对象
    * @param dim 部门维度
    * @param sendDate 失效日期
    */
  static cloneTreeObj(sendDate: string) {
    //改变值
    let cloneObj: any = {};
    cloneObj = CommonService.cloneObj(SysdepartmentBusiness.departmentTreeOptions);
    //根节点条件
    // cloneObj.fcTopWhere = "{or:[{SPARENT_CODE:{is:'null'}},{SPARENT_CODE:''}],SDIM_CODE:{eq:'" + dim + "'},SBEGIN_DATE:{lte:'" + sendDate + "'},SEND_DATE:{gte:'" + sendDate + "'}}";
    cloneObj.fcTopWhere = "{or:[{SPARENT_CODE:{is:'null'}},{SPARENT_CODE:''}]}";
    cloneObj.fcExpWhere = "{SPARENT_CODE:{eq:'#{SDEPT_CODE}#'}}",
      //展开条件
      // cloneObj.fcExpWhere = "{SPARENT_CODE:{eq:'#{SDEPT_CODE}#'}}",
      // cloneObj.fcExpWhere = "{SPARENT_CODE:{eq:'#{SDEPT_CODE}#'},SDIM_CODE:{eq:'XZWD'},SEND_DATE:{gte:'" + sendDate + "'}}",
      SysdepartmentBusiness.departmentTreeOptions = cloneObj;
    return CommonService.cloneObj(cloneObj);
  }
  /** 
    * 获取组织机构视图数据
    */
  // static getDeptData(): Observable<any> {
  //   return SysdepartmentBusiness.systbvdeptcurorgService.findWithQueryAll({
  //   });
  // }
  /** 
    * 保存之前的处理函数
    * @param mainObj 
    */
  static beforeSave(mainObj: any) {
    mainObj = SysdepartmentBusiness.buildScratorInfo(mainObj)
    return mainObj;
  }


  /**
* 根据日期等查询条件查询单位
*/
  static findDepartment(condition): Observable<any> {
    condition.AID = this.appId;
    condition.MAINTABLE = "SYS_DEPARTMENT";
    return SysdepartmentBusiness.daoService.getFromApi(CommonService.getUrlBy(this.pid, this.appId, "findDepartment"), condition);
  }
  static getUrl = function (appId, act, pid) {
    return CommonService.getUrlBy(pid ? pid : this.moduleId, appId, act);
  };

  //删除多条数据
  static deleteDepartments = function (appId, ids, pid) {
    var delObjs = [];
    ids.forEach(function (id) {
      delObjs.push({ WHERE: "{ID:{eq:'" + id.ID + "'}}" });
    });
    return SysdepartmentBusiness.daoService.postFromApi(this.getUrl("SYSDEPARTMENT", 'deleteDepartment', 'SYSTEM'), delObjs, { AID: appId, PRODUCTID: pid ? pid : 'SYSDEPARTMENT' });
  };


  /** 
    * 保存
    */
  static createDepartments = function (appId, obj, pid) {
    if (obj.ID && obj.ID.length !== 0) {
      return this.updateObject(appId, obj, pid);
    }
    else {
      return SysdepartmentBusiness.daoService.postFromApi(this.getUrl("SYSDEPARTMENT", 'createDepartment', 'SYSTEM'), obj, { AID: appId, PRODUCTID: pid ? pid : 'SYSDEPARTMENT' });
    }
  };

  /** 
    * 创建修改人信息
    */
  static buildScratorInfo(mainObj) {
    mainObj.SCRATOR = SysdepartmentBusiness.getUserinfo().USERCODE;
    mainObj.SCREATE_TIME = CommonService.getDate('');
    mainObj.SMODIFIER = SysdepartmentBusiness.getUserinfo().USERCODE;
    mainObj.SMODIFY_TIME = CommonService.getDate('');
    return mainObj;
  }

  static changeSortByAppid(beforeObj: any, afterObj: any, fieldCode: string, appId: string): Observable<any> {
    if (afterObj != null) {
      // 并行保存交换序号后的两个对象
      return CommonService.createObservableJoin([
        SysdepartmentBusiness.appService.saveObject(appId, beforeObj),
        SysdepartmentBusiness.appService.saveObject(appId, afterObj)
      ]);
    } else {
      return SysdepartmentBusiness.appService.saveObject(appId, beforeObj);
    }
  }
  /** 
    * 根据部门隶属关系(SYS_DEARTMENT_RELATION)的组织机构代码(SDEPT_CODE)
    * 和上级组织机构代码(SPARENT_CODE)
    * 和部门基本信息表(SYS_DEARTMENT)关联显示中文名
    * 
    */
  static createDepartment(mainObj: any, relationObj: any): ObservableInput<any> {
    return CommonService.createObservableConcat
      (SysdepartmentBusiness.appService.saveObject("SYSDEPARTMENT", mainObj),
        SysdepartmentBusiness.appService.saveObject("SYSDEPARTMENTRELATION", relationObj));
  }
  /**
  * 根据指定应用指定查询条件进行查询  注： 该方法仅支持单列
  */
  static getDataByAppID_Col_Val(appid: string, colName: string, colVal: string): Observable<any> {
    return SysdepartmentBusiness.appService.findWithQuery(appid, { WHERE: "{" + colName + ":{eq:'" + colVal + "'}}" })
  }


  //列表
  static fclistdataOption = {
    //皮肤默认为bootstrap风格
    fcClass: 'ag-theme-blue',
    //每页显示条数
    fcPaginationPageSize: 20,
    //是否启用查询
    fcEnableSearch: false,
    //是否启用排序
    fcEnableSorting: true,
    //是否启用过滤
    fcEnableFilter: true,
    //是否自动设置表头大小
    fcEnableColResize: true,
    //是否显示工具栏
    fcShowToolPanel: false,
    //是否分页
    fcPagination: true,
    //是否显示分组
    fcRowGroupPanelShow: 'none',//'always',
    //是否启用状态栏
    fcEnableStatusBar: true,
    //是否启用区域选中
    fcEnableRangeSelection: false,
    //选中方式
    fcRowSelection: 'multiple',
    //是否启用操作列
    fcEnableAction: true,
    //选中有checkbox
    fcCheckboxSelection: true,
    //是否启用编辑
    fcEnableEdit: false,
    //是否自动保存
    fcAutoSave: false,
    fcAutoSize: false
  };
  //
  static sysemployeeOption = {
    //皮肤默认为bootstrap风格
    fcClass: 'ag-theme-blue',
    //每页显示条数
    fcPaginationPageSize: 20,
    //是否启用查询
    fcEnableSearch: false,
    //是否启用排序
    fcEnableSorting: true,
    //是否启用过滤
    fcEnableFilter: true,
    //是否自动设置表头大小
    fcEnableColResize: true,
    //是否显示工具栏
    fcShowToolPanel: false,
    //是否分页
    fcPagination: false,
    //是否显示分组
    fcRowGroupPanelShow: 'none',//'always',
    //是否启用状态栏
    fcEnableStatusBar: true,
    //是否启用区域选中
    fcEnableRangeSelection: false,
    //选中方式
    fcRowSelection: 'multiple',
    //是否启用操作列
    fcEnableAction: false,
    //选中有checkbox
    fcCheckboxSelection: true,
    //是否启用编辑
    fcEnableEdit: false,
    //是否自动保存
    fcAutoSave: false
  };
  static sysdepartmentrelationOption = {
    //皮肤默认为bootstrap风格
    fcClass: 'ag-theme-blue',
    //每页显示条数
    fcPaginationPageSize: 20,
    //是否启用查询
    fcEnableSearch: false,
    //是否启用排序
    fcEnableSorting: true,
    //是否启用过滤
    fcEnableFilter: true,
    //是否自动设置表头大小
    fcEnableColResize: true,
    //是否显示工具栏
    fcShowToolPanel: false,
    //是否分页
    fcPagination: false,
    //是否显示分组
    fcRowGroupPanelShow: 'none',//'always',
    //是否启用状态栏
    fcEnableStatusBar: true,
    //是否启用区域选中
    fcEnableRangeSelection: false,
    //选中方式
    fcRowSelection: 'multiple',
    //是否启用操作列
    fcEnableAction: false,
    //选中有checkbox
    fcCheckboxSelection: true,
    //是否启用编辑
    fcEnableEdit: false,
    //是否自动保存
    fcAutoSave: false
  };
}
export const DialogListState = {
  existValue: 'existValue',
  noValue: 'noValue'
}
export interface Sysdepartment {
  ID: string;	//
  PID: string;	//
  CODE: string;	//
  NAME: string;	//
  TYPECODE: string;	//
  SHORTNAME: string;	//
  SPELLINGCODE: string;	//
  PARENTCODE: string;	//
  ALLPARENTCODE: string;	//
  ISLASTLEVEL: string;	//
  ADDRESS: string;	//
  ZIPCODE: string;	//
  CONTACTPERSON: string;	//
  TELEPHONE: string;	//
  AVAILABLEDATE: string;	//
  DISABLEDATE: string;	//
  SORT: number;	//
  STOPFLAG: string;	//
  CW_CODE: string;	//
  CW_NAME: string;	//
  GROUP_CODE: string;	//
  GROUP_NAME: string;	//
  ILEVEL: number;	//
}


