
import { Observable } from "rxjs";
import { CommonService } from "fccore2/common/common";
import { Sysmenu, Sysmessage } from "fccore2/common/beanclass";
import ParentBusiness from "fccore2/classes/parent.business";

export default class LayoutBusiness extends ParentBusiness {
    static init() {

    }
    /**
      * 获取消息处理 
      */
    //远程消息接收
    static getRealMessage():Observable<any> {
        return this.daoService.connectionWs(this.userService.getUserInfo().USERCODE);
    }
    /**
     * 获取默认的消息对象。
     */
   static initNavSideOptions(): any {
        return {
            fcAppid: '',
            fcLabelCode1: '未读消息',
            fcLabelCode2: '全部消息',
            fcTitleCode: 'TITLE',
            fcSmarkCode: 'CONTENT',
            fcColorCode: 'TYPE',//消息等级分为一般(normal)、紧急(waring)、危险(danger)
            fcReadCode: 'ISREAD',
            fcTimeCode: 'TS'
        };
    }

     /**
     * 获取后端已读未读消息
     * */
    static getMessage(): Observable<any> {
        let user = this.userService.getUserInfo();
        return CommonService.createObservableJoin([
            this.appService.findWithQuery("SYSMESSAGE",{ NOTIFICATIONUSERID: user.USERCODE, PAGESIZE: 1000, ORDER: "TS desc" }),
            this.appService.findWithQuery("SYSMESSAGE",{ NOTIFICATIONUSERID: user.USERCODE, PAGESIZE: 1000, ISREAD: 'N', ORDER: "TS desc" })
        ])
    }

     /**
     * 
     * @param menus 
     * @param menuId 
     */
    static findMenuByRouter(menus: any[], router: string): any {
        if (menus.length == 0) {
            return null;
        }
        let menu: Sysmenu;
        let i = 0;
        do {
            let item = menus[i];
            if (item.ROUTER && item.ROUTER === router) {
                menu = item;
                break;
            } else if (item.P_CHILDMENUS && item.P_CHILDMENUS.length !== 0) {
                menu = this.findMenuByRouter(item.P_CHILDMENUS, router);
                if (menu) {
                    break;
                }
            }
            i++;
        } while (i < menus.length);
        return menu;
    }

    /**
     * 跳转路由
     * @param menu 
     */
   static navMenu(menu: any, refresh?: string) {
        if (refresh === undefined) {
            refresh = 'Y';
        }
        if (menu.MENUTYPE === 'APP') {
            // 开启加载条
            this.msgService.startAntLoading();
            this.router.navigate(["/" + menu.PID.toLowerCase() + "/" + menu.ROUTER], {
                queryParams: {
                    refresh: refresh, ID: menu.ID, MENUID: menu.MENUID, MENUNAME: menu.MENUNAME, MENUTYPE: menu.MENUTYPE,
                    ROUTER: menu.ROUTER, PID: menu.PID, APPID: menu.APPID, PARAM: menu.param
                }
            }).then(() => {
                this.msgService.endAntLoading();
            }).catch((error) => {
                console.log(error);
                this.msgService.endAntLoading();
                this.router.navigate(['/error']);
            });
        } else if (menu.MENUTYPE === 'INURL') {
            // 开启加载条
            this.msgService.startAntLoading();
            this.router.navigate(["/" + menu.PID.toLowerCase() + "/" + menu.ROUTER], {
                queryParams: {
                    refresh: refresh, ID: menu.ID, MENUID: menu.MENUID, MENUNAME: menu.MENUNAME, MENUTYPE: menu.MENUTYPE,
                    ROUTER: menu.ROUTER, PID: menu.PID, APPID: menu.APPID, PARAM: menu.param
                }
            }).then(() => {
                this.msgService.endAntLoading();
            }).catch((error) => {
                console.log(error);
                this.msgService.endAntLoading();
            });
        } else {
            window.open(menu.MENUURL);
        }
    }
    /**
     * 跳转至消息路由，当SOURCEAID，SOURCEID有匹配的路由时直接跳转，否则跳转至sysmessageDetail路由
     * @param router 路由参数
     * @param msg 消息体
     *  
     */
   static navMessage( msg: Sysmessage):void{
        let sourceAid = msg.SOURCEAID ? msg.SOURCEAID : '';
        let menu:any = this.findMenuByRouter(this.menuService.menus, sourceAid.toLowerCase() + 'Detail');
        if (menu) {
            menu['param'] = msg.ID;
            CommonService.event("selectedMenu", menu);
        } else {
            menu = {
                APPFILTER: '',
                PARENT: '',
                SORT: '',
                ENABLE: 'Y',
                MENUICON: 'fc-icon-information',
                PID: "",
                HASCHILD: 'N',
                MENUTYPE: 'APP',
                ID: 'sysmessageDetail',
                REMARK: '',
                MENUID: 'sysmessageDetail',
                ROUTER: 'sysmessageDetail',
                WXMENU: '',
                APPID: msg.SOURCEAID,
                MENUNAME: '消息详情',
                DESCRIPTION: ''
            };
            menu['param'] = msg.ID;
            CommonService.event("selectedMenu", menu);
        }
    }

    /**
     * 关闭路由并删除路由表
     * @param router 路由
     * @param menu 关闭的路由菜单
     */
    static navToByMenuId( menuId: string) {
        let menu = this.findMenuByRouter(this.menuService.menus, menuId);
        if (menu) {
            CommonService.event("selectedMenu", menu);
        } else {
            this.msgService.error(menuId + '不存在...');
        }
    }
   
    /**
    * 
    * @param menus 
    * @param menuId 
    */
   static setSelectMenu(menus: any[], router: string): any {
        let menu: any;
        let i = 0;
        do {
            let item = menus[i];
            item.open = false;
            item.select = false;
            if (item.ROUTER && item.ROUTER === router) {
                item.select = false;
                menu = item;
                break;
            } else if (item.P_CHILDMENUS && item.P_CHILDMENUS.length !== 0) {
                menu = this.findMenuByRouter(item.P_CHILDMENUS, router);
                if (menu) {
                    item.open = true;
                    menu.select = true;
                    break;
                }
            }
            i++;
        } while (i < menus.length);
        return menu;
    }
}