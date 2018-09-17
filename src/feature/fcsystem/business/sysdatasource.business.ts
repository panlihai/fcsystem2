import ParentBusiness from "fccore2/classes/parent.business";
import { Observable } from "rxjs";
export default class SysdatasourceBusiness extends ParentBusiness {
  /**
   * 获取产品
   */
  static getproduct(): Observable<any>  {
    return this.appService.findWithQuery("SYSPRODUCT",{});
  }
}