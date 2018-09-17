import ParentBusiness from "fccore2/classes/parent.business"; 
import { Observable } from "rxjs";
export class SysserviceBusiness extends ParentBusiness { 
    /** 
    *  初始化DefaultObj
    * @param app 
    */
    static getDefaultObj(app):Observable<any>  {
        return this.appService.initObjDefaultValue(app);
    }
    /** 
     * 根据
     * @param resId 
     */
    static getBizCodeByAid(pid: string) :Observable<any> {
        return this.daoService.getFromApi("SYSTEM/SYSBIZCODERULE", {});;
    } 
    /**
     * 删除接口
     * @param id  ID
     */
    static delteSysInterface(id) { 
    }
}
