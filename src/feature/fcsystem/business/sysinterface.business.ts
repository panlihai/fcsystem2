/* 	元数据 */
import { Injectable } from '@angular/core';
import ParentBusiness from 'fccore2/classes/parent.business';
import { Observable } from 'rxjs';
@Injectable()
export class SysinterfaceBusiness extends ParentBusiness {
    // getBizCodeByAid(resId: string) {
    //     return this.sysbizcoderuleService.getBizCodeByAid(this.moduleId, resId);
    // }
    /** 
    *  获取产品名称
    */
    static getAllProduct(): Observable<any> {
        return this.appService.findWithQuery("SYSPRODUCT", {});
    }
    /** 
    *  获取参数配置数据
    */
    static getParameters(): Observable<any> {
        return this.appService.findWithQuery('SYSINTERFACEPARAM', {})
    }
    /** 
    *  通过ID获取服务数据
    * @param id ID
    */
    static getServiceById(id): Observable<any> {
        return this.appService.findWithQuery('SYSSERVICE', {WHERE:"{ID:{eq:'"+id+"'}}"});
    }
    /** 
    *  通过ID获取元数据接口数据
    * @param id ID
    */
    static getAppById(id): Observable<any> {
        return this.appService.findWithQuery('SYSAPP',{WHERE:"{ID:{eq:'"+id+"'}}"});
    }
    /** 
   *  通过ID获取编辑页面元数据接口数据
   * @param id ID
   */
    static getById(id): Observable<any> {
        return this.appService.findWithQuery('SYSINTERFACE' ,{WHERE:"{ID:{eq:'"+id+"'}}"});
    }
    /** 
    * 获取参数配置数据
    * @param implid IMPLID
    * @param pid PID
    */
    static getInterfaceReqParams(implid, pid): Observable<any> {
        return this.appService.findWithQuery('SYSINTFREQPARAM', {WHERE:"{IMPLID:{eq:'"+implid+"'},PID:{eq:'"+pid+"'}}"})
    }
    /** 
    * 获取返回值数据
    * @param implid IMPLID
    * @param pid PID
    */
    static getInterfaceResParams(implid, pid): Observable<any> {
        return this.appService.findWithQuery('SYSINTFRESPARAM', {WHERE:"{IMPLID:{eq:'"+implid+"'},PID:{eq:'"+pid+"'}}"})
    }
    /** 
    * 获取路由导航
    * @param exp List：列表；Edit:编辑:Detail：详情
    */
    static getRouteUrl(moduleId: string, appId: string, exp: string) {
        return `/${moduleId.toLocaleLowerCase()}/${appId.toLocaleLowerCase()}${exp}`;
    };
    //参数弹窗业务
      /** 
      * 根据参数类型值获取对应参数类型名称
      */
      static getParamTypeNameByCode(appId, code): Observable<any> {
        return this.appService.getDicByFieldcode(appId, code)
      }
      /**
        *  获取APPLINKS所有数据
        * @param event  
        */
      static applinksall(): Observable<any> {
        return this.appService.findWithQuery('SYSINTFRESPARAM', {})
      }
      //保存appbuttons表
      static childrensave(obj) {
        return this.appService.saveObject('SYSINTFRESPARAM', obj).subscribe(res => {
          if (res.CODE = '0') {
            this.msgService.success('保存成功');
          } else if (res.CODE = '1') {
            this.msgService.error('保存失败')
          }
        })
      }
      //修改子表数据
      static childrenupdate(obj) {
        return this.appService.updateObject('SYSINTFRESPARAM', obj).subscribe(res => {
          if (res.CODE = '0') {
            this.msgService.success('保存成功');
          } else if (res.CODE = '1') {
            this.msgService.error('保存失败')
          }
        })
      }
}