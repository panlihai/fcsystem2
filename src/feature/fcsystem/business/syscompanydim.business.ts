import ParentBusiness from "fccore2/classes/parent.business";
import { Observable } from "rxjs";

export class SyscompanydimBusiness extends ParentBusiness {
    static appId = "SYSCOMPANYDIM";
    static pid ="SYSTEM";

    static saveObj(mainObj: any): Observable<any> {
       return this.appService.saveObject(this.appId,mainObj);
    }
}