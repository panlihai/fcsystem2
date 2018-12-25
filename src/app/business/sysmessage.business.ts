/* 	消息 */
import { Observable } from 'rxjs'; 
import { CommonService } from 'fccore2/common/common';
import ParentBusiness from 'fccore2/classes/parent.business';
export class SysmessageBusiness extends ParentBusiness {
  static findAllMessage(): Observable<any> {
    return this.appService.findWithQuery("SYSMESSAGE",{});
  }
  //获取默认的消息对象
  static initTimelineOption(): any {
    return {
      fcAppid: '',
      fcLabelCode: 'TS',
      fcTitleCode: 'TITLE',
      fcSmarkCode: 'CONTENT',
      fcColorCode: 'TYPE',
      fcReadCode: 'ISREAD',
      fcId: 'ID'
    }
  }
  
  /**
    * 获取未读消息
    * */
  static getMessageBy(param:any): Observable<any> {
    let user = this.userService.getUserInfo();
    let obj = {
      NOTIFICATIONUSERID: user.USERCODE, PAGESIZE: 1000,  ORDER: "TS desc" 
    }
    Object.assign(obj,param);
    return this.appService.findWithQuery("SYSMESSAGE",obj);
  }
  /**
   * 回复消息
   * @param feedBackObj 
   * @param mainObj 
   */
  static feedBack(feedBackObj: Sysmessage, mainObj: any): Observable<any> {
    feedBackObj.SOURCEAID = 'SYSMESSAGE';
    feedBackObj.SOURCEID = mainObj.ID;
    feedBackObj.ISREAD = 'N';
    feedBackObj.ISSEND = 'N';
    feedBackObj.POSTTIME = CommonService.getTimestamp() + "";
    feedBackObj.POSTUSERID = this.getUserinfo().USERID;
    feedBackObj.TITLE = '回复-' + mainObj.TITLE;
    feedBackObj.TS = CommonService.getTimestamp()+"";
    feedBackObj.SORT = CommonService.getTimestamp() + "";
    feedBackObj.TYPE = 'normal';
    feedBackObj.NOTIFICATIONUSERID = mainObj.POSTUSERID;
    return this.appService.saveObject("SYSMESSAGE",feedBackObj);
  }
}
export interface Sysmessage {
  SOURCEID: string;
  SORT: string;
  ISSEND: string;
  NOTIFICATIONUSERID: string;
  ID: string;
  TITLE: string;
  TYPE: string;
  CONTENT: string;
  NOTIFICATIONTIME: string;
  POSTTIME: string;
  POSTUSERID: string;
  ISREAD: string;
  APPID: string;
  SOURCEAID: string;
  TS: string;
}