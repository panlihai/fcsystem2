/* 	单位服务 */
import { Observable } from 'rxjs';
import ParentBusiness from 'fccore2/classes/parent.business';
import { TreeOptions } from 'fccomponent2';
import { CommonService } from 'fccore2/common/common';
import { compareValue, messageByValue } from '../util/common.util';
export class SyscompanyBusiness extends ParentBusiness {
  /**
   * 获取单位隶属关系的字段
   */
  static getSyscompanyrelationField() {
    return this.appService.getFormFieldsByAppid("SYSCOMPANYRELATION");
  }
  //根据当前单位代码过滤单位隶属关系列表
  static companyTreeOptions: TreeOptions = {
    //元数据id
    fcAppid: "SYSTBVORGCURORG",//元数据id
    //树结构节点显示内容
    fcLabel: '#{SCOMPANY_NAME}#:#{SDIM_CODE}#',//支持:{参数名称}
    // 关联父节点字段名称
    fcParentCode: 'SPARENT_CODE',
    // 当前节点字段名称
    fcChildCode: 'SCOMPANY_CODE',
    // 叶子节点字段名称
    fcLeafCode: 'ISLAST',
    // 根节点条件
    fcTopWhere: "{or:[{SPARENT_CODE:{is:'null'}},{SPARENT_CODE:''}],SDIM_CODE:{eq:'ysdw'},SBEGIN_DATE:{lte:2018-07-26},SEND_DATE:{gte:2018-07-26}}",
    // 展开条件
    fcExpWhere: "{SPARENT_CODE:{eq:'#{SCOMPANY_CODE}#'},SDIM_CODE:'ysdw',SEND_DATE:{lte:2018-07-26},SEND_DATE:{gte:2018-07-26}}",
    // 排序字段
    fcOrderby: "",
    // 模式 false为单选，true为多选
    fcMode: false,
    // 展开子节点
    fcOpenChild: false,
    // 是否显示线条
    fcShowLine: true,
    //是否可拖拽
    fcAllowDrag: true,
    fcLeafValue: 'N',
    // 是否可选择
    fcCheckable: true,
    // 是否多选
    fcMutliple: true,
    // 是否异步加载数据
    fcAsync:true
  }
  /**
   * 克隆树对象
   * @param dim 单位维度
   * @param sendDate 失效日期
   */
  static cloneTreeObj(dim: string, sendDate: string) {
    //改变值
    let cloneObj: any = {};
    cloneObj = CommonService.cloneObj(this.companyTreeOptions);
    //根节点条件
    cloneObj.fcTopWhere = "{or:[{SPARENT_CODE:{is:'null'}},{SPARENT_CODE:''}],SDIM_CODE:{eq:'"+dim+"'},SBEGIN_DATE:{lte:'"+sendDate+"'},SEND_DATE:{gte:'"+sendDate+"'}}";    
    //展开条件
    cloneObj.fcExpWhere="{SPARENT_CODE:{eq:'#{SCOMPANY_CODE}#'},SDIM_CODE:{eq:'"+dim+"'},SBEGIN_DATE:{lte:'"+sendDate+"'},SEND_DATE:{gte:'"+sendDate+"'}}",
    this.companyTreeOptions = cloneObj;
  }
  /**
   * 过滤列表单位数据
   * @param companyCondition 过滤
   * @param code 单位代码
   * @param dim 维度
   * @param date 失效时间 
   */
  static queryCompanyData(companyCondition: string, dim: string, date: string, code: string) {
    let con: any = {
      WHERE: "(SPARENT_CODE like" + " " + "'" + code + "%" + "'" + ' ' + "OR SCOMPANY_CODE =" + "'" + code + "')" + ' ' + "AND SDIM_CODE=" + "'" + dim + "'" + ' ' + " and SBEGIN_DATE <= " + date + ' ' + "AND SEND_DATE >=" + date,
    }
    companyCondition = JSON.stringify(con);
    let cloneObj: any = '';
    cloneObj = CommonService.cloneObj(companyCondition);
    companyCondition = cloneObj;
  }
  /**
   * 获取组织机构视图数据
   */
  static getOrgData(): Observable<any> {
    return this.appService.findWithQuery("SYSTBVORGCURORG", {});
  }
  /**
   * 保存或者修改单位信息
   * @param mainObj 单位基本信息对象
   * @param relationObj 单位隶属关系对象
   */
  static saveOrUpdateCompany(mainObj: any, rId?: string, dimCode?: string, parentCode?: string): Observable<any> {
    let relationObj: any = {};
    //单位是否启用
    mainObj.BSTOP_FLAG = '0';
    //填写的信息保存到单位隶属表中
    //生效日期
    if (mainObj.SBEGIN_DATE !== undefined && mainObj.SBEGIN_DATE !== '') {
      mainObj.SBEGIN_DATE = CommonService.dateFormat(mainObj.SBEGIN_DATE, 'yyyyMMdd');
    } else {
      mainObj.SBEGIN_DATE = '';
    }
    //失效日期
    if (mainObj.SEND_DATE !== undefined && mainObj.SEND_DATE !== '') {
      mainObj.SEND_DATE = CommonService.dateFormat(mainObj.SEND_DATE, 'yyyyMMdd');
    } else {
      mainObj.SEND_DATE = '';
    }
    //成立日期
    if (mainObj.SEST_DATE !== undefined && mainObj.SEST_DATE !== '') {
      mainObj.SEST_DATE = CommonService.dateFormat(mainObj.SEST_DATE, 'yyyyMMdd');
    } else {
      mainObj.SEST_DATE = '';
    }
    relationObj = {
      ID: rId,
      SBEGIN_DATE: mainObj.SBEGIN_DATE,//生效日期
      SEND_DATE: mainObj.SEND_DATE,//失效日期
      SDIM_CODE: dimCode,//维度代码
      SORG_CODE: mainObj.SCOMPANY_CODE,//组织机构代码
      SPARENT_CODE: parentCode,//上级组织机构代码
      SPARENT_PATH: parentCode + ':' + mainObj.SCOMPANY_CODE,//上级组织机构路径
      SCRATOR: this.userService.getUserInfo().NAME,//创建人
      SCREATE_TIME: CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd'),//创建时间
    }
    if (mainObj.ID === undefined || mainObj.ID === '') {
      // 并行执行多个任务，保存单位表和单位隶属关系表的对象
      return CommonService.createObservableJoin([
        this.appService.saveObject("SYSCOMPANY", mainObj),
        this.appService.saveObject("SYSCOMPANYRELATION", relationObj)
      ]);
    } else {
      //修改页面id不为空时是修改页面，更新单位和单位隶属关系修改的数据
      return CommonService.createObservableJoin([
        this.appService.updateObject("SYSCOMPANY", mainObj),
        this.appService.updateObject("SYSCOMPANYRELATION", relationObj)
      ]);
    }
  }
  /**
   * 获取维度
   */
  static getCompanyDim(): Observable<any> {
    return this.appService.findWithQuery("SYSCOMPANYDIM", {});
  }

  /**
   *获取单位隶属关系
   * @param dimCode 维度
   */
  static getOrgRelationData(dimCode: string): Observable<any> {
    // 根据维度查询单位隶属关系
    return this.appService.findWithQuery("SYSCOMPANYRELATION", { SDIM_CODE: dimCode });
  }
  /**
   * 更新单位隶属关系
   * @param beforeObj 第一个对象
   * @param afterObj 第二个对象
   * @param fieldCode 字段编码
   * @param appId 元数据
   */
  static changeSortByAppid(beforeObj: any, afterObj: any, fieldCode: string, appId: string): Observable<any> {
    //交换对象的属性 
    // CommonUtil.exchange(beforeObj, afterObj, fieldCode);
    //更新需要传where条件
    beforeObj.WHERE = "{ID:{eq:'" + beforeObj.ID + "'}}";
    afterObj.WHERE = "{ID:{eq:'" + afterObj.ID + "'}}";
    // 并行保存交换序号后的两个对象
    return this.appService.updateObject(appId, [beforeObj, afterObj])
  }
 

  /**
   * 自定义验证
   * @param mainObj 
   * @param mainValid 
   */
  static validator(mainObj: any, mainValid: any) {
    let sbeginDateValid = JSON.parse(mainValid.SBEGIN_DATE);
    let sendDateValid = JSON.parse(mainValid.SEND_DATE);
    // 验证生效日期不能大于注销时间   
    //深拷贝 
    sbeginDateValid = Object.assign({}, sbeginDateValid, this.compareTime(mainObj.SEST_DATE, mainObj.SBEGIN_DATE, '日期填写正确', '生效日期不能大于成立日期'));
    mainValid.SBEGIN_DATE = JSON.stringify(sbeginDateValid);
    // 验证注销日期不能大于生效时间
    //深拷贝
    sendDateValid = Object.assign({}, sendDateValid, this.compareTime(mainObj.SBEGIN_DATE, mainObj.SEND_DATE, '日期填写正确', '注销日期不能大于生效日期'));
    mainValid.SEND_DATE = JSON.stringify(sendDateValid);
  }
  /**
   * 比较时间大小，验证时间的提示
   * @param firstDate 第一个时间
   * @param secondDate 第二个时间
   * @param mainValid 验证对象
   * @param trueMsg 正确时的提示
   * @param falseMsg 错误时的提示
   */
  static compareTime(firstDate: Date, secondDate: Date, trueMsg: string, falseMsg: string): any {
    let mainValid: any = {};
    //如果没有选择时间就不让比较大小
    if (firstDate !== undefined && secondDate !== undefined) {
      let flag = compareValue(firstDate, secondDate);
      mainValid.show = flag;
      mainValid.validators = {};
      mainValid.validators.customVal = flag;
      mainValid.errorMessages = {};
      mainValid.errorMessages.customVal = messageByValue(flag, falseMsg, trueMsg);
      return mainValid;
    }
  }
  /**
   * 撤销单位
   * @param selectedObj 
   */
  static cancelCompany(selectedObj: any): Observable<any> {
    if (selectedObj.ID !== '') {
      selectedObj.BSTOP_FLAG = '1';
      return this.appService.updateObject("SYSCOMPANY", selectedObj);
    }
  }
  //单位列表
  static fclistdataOption = {
    //皮肤默认为bootstrap风格
    fcClass: 'ag-blue',
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
  //单位隶属关系
  static syscompanyrelationOption = {
    //皮肤默认为bootstrap风格
    fcClass: 'ag-blue',
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
//单位
export interface Syscompany {
  主键ID: string;//	主键id
  SBEGIN_DATE: string;//	生效日期
  SCOMPANY_CODE: string;//	单位代码
  SEND_DATE: string;//	失效日期
  SSPELLING_CODE: string;//	单位简码
  SCOMPANY_NAME: string;//	单位名称
  SSHORT_NAME: string;//	单位简称
  SCOMPANY_TYPE: string;//	单位性质
  BIS_VIRTUAL: string;//	是否虚拟单位
  ILEVEL: number;//	单位层级
  SINDUSTRY: string;//	所属行业
  SEST_DATE: string;//	成立日期
  SREPRESENTATIVE: string;//	法人代表
  SAPPROVAL_DCMTNO: string;//	批准文号
  SAPPROVING_COMPANY: string;//	登记批准机构
  SCONTACT_TEL: string;//	电话
  SFAX: string;//	传真
  SCOUNTRY: string;//	国家
  SCITY: string;//	城市
  SADDRESS: string;//	地址
  SPOST_CODE: string;//	邮编
  SWEBSITE: string;//	网址
  SINTRODUCTION: string;//	机构简介
  SINVEST_TYPE: string;//	投资范围
  BSTOP_FLAG: string;//	停用标志#0-启用, 1-停用
  SCRATOR: string;//	创建人
  SCREATE_TIME: string;//	创建时间
  SMODIFIER: string;//	修改人
  SMODIFY_TIME: string;//	修改时间
}
