import { CommonService } from "fccore2/common/common";
import { Observable } from "rxjs";
import LayoutBusiness from "./layout.business";
import ParentBusiness from "fccore2/classes/parent.business";

export default class HomeBusiness extends ParentBusiness {
    /**
     * 获取当前消息公告的所有内容
     * */
    static getannouncement() {
        return HomeBusiness.appService
            .findWithQuery("SYSNOTIFY", {})
    }
    //回执消息返回的时间睉
    static announcementtime() {
        CommonService.getTimestamp()
    }
    //获取发布人的user
    static announcementPOSTUSER() {
        HomeBusiness.userService.getUserInfo().USERCODE
    }
    //   提醒用户是否已读，读取后回执给发布者
    static announcementsave(obj) {
        HomeBusiness.appService.saveObject('SYSMESSAGE', obj).subscribe(res => {
            if (res.CODE === '0') {
                HomeBusiness.msgService.success('回执成功');
            } else {
                HomeBusiness.msgService.error('回执失败')
            }
        })
    }
    // 公告消息回执处理
    static backannouncement(id, catagory, publishuser) {
        if (publishuser !== HomeBusiness.announcementPOSTUSER()) {
            let obj: any = {
                TS: HomeBusiness.announcementtime(),
                SORT: HomeBusiness.announcementtime(),
                POSTTIME: HomeBusiness.announcementtime(),
                CONTENT: "消息公告" + id + "进行回执",
                ISREAD: "N",
                ID: id,
                TYPE: "",
                NOTIFICATIONUSERID: publishuser,
                TITLE: "回执信息",
                POSTUSERID: HomeBusiness.announcementPOSTUSER()
            };
            if (catagory === "error") {
                obj.TYPE = "danger";
            }
            if (catagory === "processing") {
                obj.TYPE = "normal"
            }
            if (catagory === "warning") {
                obj.TYPE = "waring"
            }
            HomeBusiness.announcementsave(obj)
        }
    }
    /**
     * 获取当前待办任务的所有内容
     * */
    static getassignment() {
        return HomeBusiness.appService
            .findWithQuery("SYSASSIGNMENT", {})
    }
    /**
     * 跳转至消息路由，当SOURCEAID，SOURCEID有匹配的路由时直接跳转，否则跳转至sysmessageDetail路由
     * @param router 路由参数
     * @param msg 消息体
     *  有 Observable<any>需要return
     */
    static assignmentMessage(msg: any): Observable<any> {
        let sourceId = msg.SOURCEID ? msg.SOURCEID : '';
        let menu = HomeBusiness.findMenuByRouter(HomeBusiness.provider.menuService.menus, sourceId.toLowerCase() + 'Detail');
        if (menu) {
            menu['param'] = msg.SOURCEID;
            CommonService.event("selectedMenu", menu);
        } else {
            menu = {
                APPFILTER: '',
                PARENT: '',
                SORT: '',
                ENABLE: 'Y',
                MENUICON: 'fc-icon-information',
                PID: "SYSTEM",
                HASCHILD: 'N',
                MENUTYPE: 'APP',
                ID: msg.ID,
                REMARK: '',
                MENUID: 'sysassignmentDetail',
                ROUTER: 'syassignmentDetail',
                WXMENU: '',
                APPID: msg.SOURCEID,
                MENUNAME: '待办任务',
                DESCRIPTION: ''
            };
            menu['param'] = msg.SOURCEID;
            console.log(menu);
            CommonService.event("selectedMenu", menu);
        }
        return HomeBusiness.appService.updateObject("SYSMESSAGE", msg);
    }

    // sysannouncementrouter跳转到消息公告路由并生成tag标签
    static sysannouncementrouter(msg: any) {
        let menu = LayoutBusiness.findMenuByRouter(HomeBusiness.menuService.menus, 'sysannouncementDetail');
        if (menu) {
            menu["param"] = msg;
            CommonService.event("selectedMenu", menu);
        } else {
            HomeBusiness.provider.msgService.error(
                "sysannouncementDetail" + "不存在..."
            );
        }
    }
    // sysannouncementrouter跳转到消息公告路由并生成tag标签
    static sysassignmentrouter(msg: any) {
        let menu = LayoutBusiness.findMenuByRouter(HomeBusiness.menuService.menus, 'sysassignmentDetail');
        if (menu) {
            menu["param"] = msg;
            CommonService.event("selectedMenu", menu);
        } else {
            HomeBusiness.provider.msgService.error(
                "sysassignmentDetail" + "不存在..."
            );
        }
    }
    //历史待办功能模块
    static assignmenHomeBusinesstory(msg: any): Observable<any> {
        let sourceId = msg.SOURCEID ? msg.SOURCEID : '';
        let menu = HomeBusiness.findMenuByRouter(HomeBusiness.menuService.menus, sourceId.toLowerCase() + 'Detail');
        if (menu) {
            menu['param'] = msg.SOURCEID;
            CommonService.event("selectedMenu", menu);
        } else {
            menu = {
                APPFILTER: '',
                PARENT: '',
                SORT: '',
                ENABLE: 'Y',
                MENUICON: 'fc-icon-information',
                PID: "SYSTEM",
                HASCHILD: 'N',
                MENUTYPE: 'APP',
                ID: msg.ID,
                REMARK: '',
                MENUID: 'sysassignmentDetail',
                ROUTER: 'sysassignmentDetail',
                WXMENU: '',
                APPID: msg.SOURCEID,
                MENUNAME: '待办任务',
                DESCRIPTION: ''
            };
            menu['param'] = msg.SOURCEID;
            CommonService.event("selectedMenu", menu);
        }
        return HomeBusiness.appService.updateObject("SYSASSIGNMENT", msg);
    }
    /**
     * 获取版本信息
     */
    static getSysversion(): Observable<any> {
        return HomeBusiness.appService.findWithQuery("SYSVERSION", {});
    }
    /** YM
     *  获取快速导航标签数据流
     */
    static getNavLinks() {
        return HomeBusiness.appService.findWithQuery("SYSNAVLINK", {});
    }
    /** YM
   * 重构查询条件并返回
   * @param args
   */
    static rebuildList_NavLink(args?: any) {
        // return HomeBusiness.navLinkService.rebuildList_NavLink(args.navlinks);
    }
    /** YM
   * 刷新快速导航标签
   */
    static refreshNavLink(args?: any) {
        // return HomeBusiness.navLinkService.refreshNavLink(args.navlinks);
    }
    /**YM
   * 处理新增快速导航标签事件
   * @param args 
   */
    static addNavLinkTag(args?: any) {
        // return HomeBusiness.navLinkService.addNavLinkTag(args.navlinks, args.contentTpl, args.footerTpl, args.listdata);
    }
    /**YM
   * 处理弹窗确认事件
   * @param args 
   */
    static handleAddNavLink_ok(args?: any) {
        // return HomeBusiness.navLinkService.handleAddNavLink_ok(args.listdata, args.navlinks, args.condition)
    }
    /**YM
   * 处理弹出取消事件
   */
    static handleAddNavLink_cancel() {
        // return HomeBusiness.navLinkService.handleAddNavLink_cancel();
    }
    /**YM
   * 处理链接删除
   * @param args 
   */
    static navLinkBeforeClose(args?: any) {
        // return HomeBusiness.navLinkService.navLinkBeforeClose(args.link);
    }
    
    /**
    * 路由跳转事件
    * @param router 
    * @param url 
    */
    static navToByMenuId(menuId: any) {
        let menu = HomeBusiness.findMenuByRouter(HomeBusiness.menuService.menus, menuId);
        if (menu) {
            CommonService.event("selectedMenu", menu);
        } else {
            HomeBusiness.provider.msgService.error(menuId + '不存在...');
        }
    }
    /**
      * @param menus 
      * @param menuId 
      */
    static findMenuByRouter(menus: any[], router: string): any {
        if (menus.length == 0) {
            return null;
        }
        let menu: any;
        let i = 0;
        do {
            let item = menus[i];
            if (item.ROUTER && item.ROUTER === router) {
                menu = item;
                break;
            } else if (item.P_CHILDMENUS && item.P_CHILDMENUS.length !== 0) {
                menu = HomeBusiness.findMenuByRouter(item.P_CHILDMENUS, router);
                if (menu) {
                    break;
                }
            }
            i++;
        } while (i < menus.length);
        return menu;
    }

    /**
     * 获取当前用户和指定联系人的所有聊天内容
     * */
    static getChatcontent(userid, pagesize, pagenum) {
        return HomeBusiness.provider.appService
            .findWithQuery("SYSMESSAGE", {
                "WHERE": " (NOTIFICATIONUSERID = '" + userid + "' and POSTUSERID = '" +
                    HomeBusiness.userService.getUserInfo().USERCODE + "') OR (NOTIFICATIONUSERID='" +
                    HomeBusiness.userService.getUserInfo().USERCODE + "' and POSTUSERID='" + userid + "')",
                "ORDER": "TS desc",
                "PAGESIZE": pagesize,
                "PAGENUM": pagenum,
            })
    }
    //将发送的消息保存到数据库里面
    static saveMessage_chat(obj) {
        HomeBusiness.appService.saveObject("SYSMESSAGE", obj).subscribe(res => {
            debugger;
            if (res.CODE === '0') {
                HomeBusiness.msgService.success("保存成功");
            } else if (res.CODE === '1') {
                HomeBusiness.msgService.error("保存失败");
            }
        });
    }
}