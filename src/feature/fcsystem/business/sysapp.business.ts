
import { Observable } from "rxjs";
import { CommonService } from "fccore2/common/common";
import { TreeOptions } from "fccomponent2";
import ParentBusiness from "fccore2/classes/parent.business";
import { FcModalConfig } from "fccomponent2/business/fcmodel.business";
import FccomponentEvent from "fccomponent2/business/fccomponet.event";
import { ComponentService } from "../../fcsamples2/services/component.service";
export class SysappBusiness extends ParentBusiness {
  //树配置
  static treeOptions: TreeOptions = {
    //元数据id
    fcAppid: "SYSMENU",//元数据id
    //树结构节点显示内容
    fcLabel: ':{MENUNAME}::{MENUID}',//支持:{参数名称}
    // 关联父节点字段名称
    fcParentCode: 'PARENT',
    // 当前节点字段名称
    fcChildCode: 'MENUID',
    // 叶子节点字段名称
    fcLeafCode: 'HASCHILD',
    // 根节点条件
    fcTopWhere: "PARENT is null or PARENT=''",
    // 展开条件
    fcExpWhere: "PARENT=':{MENUID}'",
    // 排序字段
    fcOrderby: "",
    // 模式 false为单选，true为多选
    fcMode: true,
    // 展开子节点
    fcOpenChild: false,
    // 是否显示线条
    fcShowLine: true,
    //是否可拖拽
    fcAllowDrag: true
  };
  /**
   * 修改元数据的名称
   */
  static modifyAppFieldsName(): void {
    let ob = this.daoService.getFromApi("SYSTEM/SYSAPP/modifyFieldsName", {});
    ob.subscribe(result => {
      if (result.CODE === '0') {
        this.logService.debug(result);
      } else {
        this.logService.error(result.MSG);
      }
    });
  }

  /**
   * 通过appid获取appfield
   * @param appId 
   */
  static findAppFieldsByAppid(appId: string): Observable<any> {
    return this.appService.findWithQuery("SYSAPPFIELDS", { WHERE: "{APPID:{eq:'" + appId + "'}}" });
  }
  /**
   * 获取产品
   */
  static getproduct(): Observable<any> {
    return this.appService.findWithQuery("SYSPRODUCT", {});
  }
  /**
   * 获取数据源
   */
  static getdatasource(): Observable<any> {
    return this.appService.findWithQuery("SYSDATASOURCE", {});
  }
  /**
  * 根据appid和appname获取当前元数据的ID
  * @param appid 
  * @param appname 
  */
  static getID(appid, appname): Observable<any> {
    return this.appService.findWithQuery("SYSAPP", { WHERE: "{APPID:{eq:'" + appid + "'},{APPNAME:{eq:'" + appname + "'}" })
  }
  /**
  * 根据appid获取模型属性数据
  * @param appid 
  */
  static getSysAttributes(appid): Observable<any> {
    return this.appService.findWithQuery('SYSAPPFIELDS', { WHERE: "{APPID:{eq:'" + appid + "'}}" });
  }
  /**
  * 根据appid获取模型事件数据
  * @param appid 
  */
  static getSysEvents(appid): Observable<any> {
    return this.appService.findWithQuery('SYSAPPBUTTONS', { WHERE: "{APPID:{eq:'" + appid + "'}}" });
  }
  /**
   * 根据appid获取模型接口数据
   * @param appid 
   */
  static getSysInterfaces(appid): Observable<any> {
    return this.appService.findWithQuery('SYSINTERFACE', { WHERE: "{APPID:{eq:'" + appid + "'}}" })
  }
  /**
   * 根据appid获取与其它模型关系数据
   * @param appid 
   */
  static getSysLinks(appid): Observable<any> {
    return this.appService.findWithQuery('SYSAPPLINKS', { WHERE: "{MAINAPP:{eq:'" + appid + "'}}" })
  }
  /**
  * 获取模型配置
  * @param dsid 
  */
  static getTableOption(dsid: string, pid: string) :Observable<any> {
    return this.daoService.getFromApi(CommonService.getUrlBy("SYSTEM", 'SYSMODEL', "findTableViewByDsid"), { DSID: dsid, PRODUCTID: pid })

  }
  /**
   * 获取模型字段
   * @param tableNames
   * @param dsid 
   */
  static getModelField(tableNames: string, dsid: string, pid: string): Observable<any> {
    return this.daoService.getFromApi(CommonService.getUrlBy("SYSTEM", 'SYSMODEL', "findFieldByTablenames"), { DSID: dsid, PRODUCTID:pid, TABLENAMES: tableNames })
  }
  /**
  * 一键生成
  * @param data
  */
  static createSysappsByTableNames(dsid:string,data: any[]): Observable<any> {
    let param = {DSID:dsid,TABLENAMES:data.join(',')}
    return this.daoService.getFromApi(CommonService.getUrlBy('SYSTEM','SYSMODEL','createSysappsByTableNames'),param);
  }
  /** 
    *弹窗事件
    *@param event 
    *@param title
    *@param content 
    */
  static dialogEvent(obj: any, title, content): void {
    let token = CommonService.guid();
    let modal: FcModalConfig = {
      title: title,
      content: content,
      okFunc: (result) => {
        this.logService.debug("ok");
      },
      cancelFunc: (result) => {
        this.logService.debug("ok");
      },
      // footer?: any;
      token: token
    }
    CommonService.event(FccomponentEvent.modal.dialog, modal);
  }
  /** 
  * 获取路由导航
  * @param exp List：列表；Edit:编辑:Detail：详情
  */
  static getRouteUrl(moduleId: string, appId: string, exp: string): string {
    return `/${moduleId.toLocaleLowerCase()}/${appId.toLocaleLowerCase()}${exp}`;
  };
  /**模型-事件弹窗
  *  按钮跳转路由方法封装 查看数据源  查看服务   返回列表 方法
  * @param event  
  */
  static producticonmodal(title, content) {
    let token = CommonService.guid();
    let modal: FcModalConfig = {
      title: title,
      content: content,
      okFunc: (result) => {
        this.logService.debug("ok");

      },
      cancelFunc: (result) => {
        this.logService.debug("ok");
      },
      // footer?: any;
      token: token
    }
    CommonService.event(FccomponentEvent.modal.dialog, modal);
  }
  /**模型-事件弹窗
   * 根据appid和条件获取数据
   * @param appId 
   * @param condition 
   */
  static _findWithQuery(appId, condition) {
    return this.appService.findWithQuery(appId, condition);
  }
  /**模型-事件弹窗
  * YM
  * 初始化mainObj
  * @param app 
  */
  static initObjDefaultValue(app) {
    return this.appService.initObjDefaultValue(app);
  }
  /**模型-关系弹窗
   *  获取APPLINKS所有数据
   * @param event  
   */
  static applinksall() {
    return this.appService.findWithQuery('SYSAPP', {})
  }
  /**模型-关系弹窗
   * 保存appbuttons表
   * @param obj
   */
  static childrensave(obj) {
    return this.appService.saveObject('SYSAPPLINKS', obj).subscribe(res => {
      if (res.CODE = '0') {
        this.msgService.success('保存成功');
      } else if (res.CODE = '1') {
        this.msgService.error('保存失败')
      }
    })
  }
  /**模型-关系弹窗
   * 修改子表数据
   * @param obj
   */
  static childrenupdate(obj) {
    return this.appService.updateObject('SYSAPPLINKS', obj).subscribe(res => {
      if (res.CODE = '0') {
        this.msgService.success('保存成功');
      } else if (res.CODE = '1') {
        this.msgService.error('保存失败')
      }
    })
  }
  /** 
   * 获取分组下拉数据
   * @param dialogArgs 
   */
  static getGroup() {
    return this.appService.findWithQuery('SYSAPPFLDGROUP', {})
  }
  /** YM
  * 打开窗口的函数方法
  * @param dialogArgs 
  */
  // openDialog(dialogArgs: DialogListArgs) {
  //   return this.nzModal.open({
  //     title: dialogArgs.configInterface.title ? dialogArgs.configInterface.title : '',
  //     content: dialogArgs.configInterface.content ? dialogArgs.configInterface.content : DialogListComponent,
  //     onOk() { },
  //     onCancel() { },
  //     footer: false,
  //     width: dialogArgs.configInterface.width,
  //     style: dialogArgs.configInterface.style,
  //     componentParams: {
  //       options: dialogArgs
  //     }
  //   })
  // }
  /**
   * 根据获取到的模型ID查询得到字段数据作为下拉选项
   * @param appId 
   */
  static getFieldOptionByAppId(appId) {
    let fields = this.appService.getFieldsByAppid(appId, 'APPID', appId);
    let arr: Array<{ [key: string]: any }> = [];
    fields.forEach(el => {
      arr.push({ label: el.FIELDNAME, value: el.FIELDCODE });
    })
    return arr;
  }
  /**
  * 打开添加分组弹窗
  * @param content 
  */
  static addGroup(content) {
    //   let token = CommonService.guid();
    //   let modal: FcModalConfig = {
    //     title: '添加分组',
    //     content: SysappfieldgroupComponent,
    //     okFunc: (result) => {
    //       SysappBusiness.logService.debug("ok");

    //     },
    //     cancelFunc: (result) => {
    //       SysappBusiness.logService.debug("ok");
    //     },
    //     // footer?: any;
    //     token: token
    //   }
    //   CommonService.event(FccomponentEvent.modal.dialog, modal);
    // }
  }
/**
 * 根据模型id自动生成标准事件
 * @param appid 模型id
 */
  static createStandardEvent(appid: string): Observable<any> {
    return this.daoService.postFromApi(CommonService.getUrlBy("SYSTEM", 'SYSMODEL', "createStandardEvent"),{}, { AID: appid });
  }
}
