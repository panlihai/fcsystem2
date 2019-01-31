import ParentBusiness from "fccore2/classes/parent.business";
import { Observable } from "rxjs";
import { InterfaceMethod } from "fccore2/common/constant";
import { DaoService, FCCONFIG } from "fccore2/services/dao.service";
import { AppService } from "fccore2/services/app.service";
import { CommonService } from 'fccore2/common/common';
// import FccomponentEvent from "./business/fccomponet.event";
export class SysuserBusiness extends ParentBusiness {
    static appId = "SYSUSER";
    static pid ="SYSTEM";

    static createUser = function (appId, obj, pid) {
        if (obj[0].USER.ID && obj[0].USER.ID.length !== 0) {
            return this.updateObject(appId, obj, pid);
        }
        else {
            return this.daoService.postFromApi(this.getUrl("SYSROLE", "createUser",'SYSTEM'), obj, { AID: appId, PRODUCTID: pid ? pid : FCCONFIG.pid });
        }
    };
     /**
     * 获取请求url
     * @param app 元数据对象
     * @param act 执行方法
     */
     static getUrl = function (appId, act, pid) {
        return CommonService.getUrlBy(pid ? pid : this.moduleId, appId, act);
    };
      /**
     * 根据当前对象的ids删除对象。
     * @param appId 元数据id
     * @param ids 元数据对应的对象id 
     */
     static deleteUser = function (appId, ids, pid) {
        var delObjs = [];
        ids.forEach(function (id) {
            delObjs.push( id.ID );
        });
        return this.daoService.postFromApi(this.getUrl("SYSROLE", "deleteUser",'SYSTEM'), delObjs, { AID: appId, PRODUCTID: pid ? pid : FCCONFIG.pid });
    };
      /**
     * 根据当前对象的ids启用对象。
     * @param appId 元数据id
     * @param ids 元数据对应的对象id 
     */
    static enableUser=function (appId, ids, pid) {
        var ableUserdelObjs = [];
        ids.forEach(function (id) {
            ableUserdelObjs.push( id.ID );
        });
        return this.daoService.postFromApi(this.getUrl("SYSROLE", "enableUser",'SYSTEM'), ableUserdelObjs, { AID: appId, PRODUCTID: pid ? pid : FCCONFIG.pid });
    };
     /**
     * 根据当前对象的ids禁用对象。
     * @param appId 元数据id
     * @param ids 元数据对应的对象id 
     */
    static 	disableUser=function (appId, ids, pid) {
        var disableObjs = [];
        ids.forEach(function (id) {
            disableObjs.push( id.ID );
        });
        return this.daoService.postFromApi(this.getUrl("SYSROLE", "disableUser",'SYSTEM'), disableObjs, { AID: appId, PRODUCTID: pid ? pid : FCCONFIG.pid });
    };
     /**
     * 根据当前对象的ids解锁对象。
     * @param appId 元数据id
     * @param ids 元数据对应的对象id 
     */
    static 	unlockUser=function (appId, ids, pid) {
        var unlockObjs = [];
        ids.forEach(function (id) {
            unlockObjs.push( id.ID );
        });
        return this.daoService.postFromApi(this.getUrl("SYSROLE", "unlockObjs",'SYSTEM'), unlockObjs, { AID: appId, PRODUCTID: pid ? pid : FCCONFIG.pid });
    };
    static findUser(condition): Observable<any> {
        condition.AID = this.appId;
        // condition.MAINTABLE = "SYS_DEPARTMENT";
        return this.daoService.getFromApi(CommonService.getUrlBy(this.pid, 'SYSROLE', "findUser"), condition);
        }
}