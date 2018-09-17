
import { Observable } from "rxjs";
import ParentBusiness from "fccore2/classes/parent.business";
import SystemBusiness from "fccore2/classes/system.business";
import SysuserBusiness from "./sysemployee.business";
import { Sysmessage } from "fccore2/common/beanclass";
import { CommonService } from "fccore2/common/common";
export default class SysprofileBusiness extends ParentBusiness {
 //获取在线用户登录时间
static getSigninTime(): Observable<any> {
  return SystemBusiness.appService.findWithQuery("",{});
}
/**
 * 重置密码
 * @param event 
 */
static doReset(event) {
  // SysuserBusiness.doReset(event);
}
/**
 * 消息
 * @param pageNum 分页
 * @param pageSize 分页大小
 */
static getSysmsg(pageNum: number, pageSize: number): Observable<any> {
  return SystemBusiness.appService.findWithQuery("",{ pageSize: pageSize, pageNum: pageNum });
}
/**
 * 消息被点击后已读
 * @param msg 
 */
static msgIsRead(msg: Sysmessage): Observable<any> {
  msg.ISREAD = 'Y';
  msg.TYPE = 'default';
  return SysprofileBusiness.appService.updateObject("SYSMESSAGE",msg);
}
/**
 * 根据id删除消息
 * @param id 
 */
static deleteSysmsg(id: string): Observable<any> {  
  return SysprofileBusiness.appService.deleteObject("SYSMESSAGE",id);
}
/**
 * 待办
 * @param pageNum 分页
 * @param pageSize 分页大小
 */
static getSystask(pageNum: number, pageSize: number): Observable<any> {
  return SystemBusiness.appService.findWithQuery("SYSASSIGNMENT",{ pageSize: pageSize, pageNum: pageNum });
}
/**
* 根据id删除任务
* @param id 
*/
static deleteSystask(id: string): Observable<any> {
  return  SystemBusiness.appService.deleteObject("SYSASSIGNMENT",id );
}
/**
* 处理待办任务
* @param msg 
*/
static handleTask(id: string): Observable<any> {
  return SystemBusiness.appService.updateObject("SYSASSIGNMENT",{ ID: id });
}
/**
 * 日志
 * @param pageNum 分页
 * @param pageSize 分页大小
 */
static getSyslog(pageNum: number, pageSize: number): Observable<any> {
  return SystemBusiness.appService.findWithQuery("SYSLOG",{ pageSize: pageSize, pageNum: pageNum });
}
/**
 * 查询人员信息
 */
static getSysemployee(): Observable<any> {
  return SystemBusiness.appService.findWithQuery("SYSEMPLOYEE",{});
}
static getSysuser(userId: string): Observable<any> {
  return SystemBusiness.appService.findWithQuery("SYSUSER",{ ID: userId });
}
/**
 * 修改个人信息
 * @param obj 
 */
static editPersonelInfo(obj: any): Observable<any> {
  return CommonService.createObservableJoin([
    SystemBusiness.appService.updateObject("SYSUSER",obj)
  ])
}
/**
 * 删除一条消息记录
 */
deleteOneMsg() {

}
/**
 * YM
 * 快速导航/自定义链接功能
 * @param fucName 
 * @param args 
 */
// static NavLinkFunction(fucName: NavLinkFunctionName, args?: Args_NavLink): any {
//   let trn: any;
//   switch (fucName) {
//     case NavLinkFunctionName.deleteSubject:
//       trn = this.sysnavlinkService.deleteSubject;
//       break;
//     case NavLinkFunctionName.getNavLinks:
//       return this.sysnavlinkService.getNavLinks();
//     case NavLinkFunctionName.rebuildList_NavLink:
//       return this.sysnavlinkService.rebuildList_NavLink(args.navlinks);
//     case NavLinkFunctionName.refreshNavLink:
//       return this.sysnavlinkService.refreshNavLink(args.navlinks);
//     case NavLinkFunctionName.addNavLinkTag:
//       return this.sysnavlinkService.addNavLinkTag(args.navlinks, args.contentTpl, args.footerTpl, args.listdata);
//     case NavLinkFunctionName.handleAddNavLink_ok:
//       return this.sysnavlinkService.handleAddNavLink_ok(args.listdata, args.navlinks, args.condition)
//     case NavLinkFunctionName.handleAddNavLink_cancel:
//       return this.sysnavlinkService.handleAddNavLink_cancel();
//     case NavLinkFunctionName.navLinkBeforeClose:
//       return this.sysnavlinkService.navLinkBeforeClose(args.link);
//   }
// }
}