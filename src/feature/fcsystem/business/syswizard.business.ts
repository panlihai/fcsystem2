/* 	概况业务 */

import ParentBusiness from 'fccore2/classes/parent.business';
import { Observable } from 'rxjs';
export class SyswizardBusiness extends ParentBusiness {
  /**
   * 获取产品项目
   * @param param 
   */
  static getService(param?: any): Observable<any> {
    return this.appService.findWithQuery("SYSSERVICE", param?param:{});
  }
}
