
import { Observable } from "rxjs";
import ParentBusiness from "fccore2/classes/parent.business";
export default class SysproductBusiness extends ParentBusiness {
  static doAction(): Observable<any> {
    return;
    // return this.daoService.getFromApi(this.getResourceUrl('doAction'), { USERID: this.userService.getUserInfo().USERCODE });
  }
}