import { Component } from '@angular/core';
import { ParentEditComponent, FctextComponent } from 'fccomponent2';
import { SysserviceBusiness } from '../../business/sysservice.business';
import SystemBusiness from 'fccore2/classes/system.business';
import { Sysappbuttons } from 'fccore2/common/beanclass';
@Component({
    selector: 'sysserviceedit',
    templateUrl: 'sysserviceedit.component.html',
    styles: [`
    .sys-card-btn{
        width:50%;
      }
      :host ::ng-deep .fc-layoutpanel {
          padding:10px;
      }
      .place-div{
          height:42px;
      }
      .last-btn{
        position: relative;
        right: 95%;
        padding: 3%;
      }     
    `],
})
export class SysserviceeditComponent extends ParentEditComponent {
    //产品名称
    pidOption: any;
    //接口数据
    sysInterfaces: any;
    staticMainObj: any;
    mainObj: any;
    //服务接口按钮
    interfaceListButtons: Sysappbuttons[];
    constructor() {
        super("SYSTEM", "SYSSERVICE");
    }
    /**
     * 新增之前执行的函数
     * @param mainObj 
     */
    addNew(mainObj: any): boolean {
        return true;
    }
    /**
     * 组件初始化执行函数
     */
    init(): void {
        this.getDefaultObj();
        //初始化产品下拉菜单
        this.getPidOption();
        //处理路由传参情况
        this.handleRouterParam();
        //初始化获取服务接口按钮
        this.interfaceListButtons = this.mainApp.P_APPLINKS ?SystemBusiness.appService.getListButtonsByAppid("SYSSERVICE"):[];
    }
    //当为新增页面
    getDefaultObj(): void {
        this.mainObj = {};
        this.mainObj = SysserviceBusiness.getDefaultObj(this.mainApp);
        this.staticMainObj = {};
        for (let attr in this.mainObj) {
            this.staticMainObj[attr] = this.mainObj[attr];
        }
    }
    /**
     * html事件收集及派发函数
     * @param eventName 
     * @param params 
     */
    event(eventName: string, params?: any): void {
        event.stopPropagation();
        // let dialogCardListArgs: DialogCardListArgs = { appId: null, configInterface: { title: null } };
        // dialogCardListArgs.methodIndex = eventName;
        // if (params instanceof FctextComponent) dialogCardListArgs.textComponent = params;
        switch (eventName) {
            case 'PID':
                this.getServiceId(params)
                break;
            case 'DEFAULTAPPID':
                // this.showModal(dialogCardListArgs);
                break;
            case 'editInterface':
                this.editInterface(params);
                break;
            case 'BTNLISTONEEDIT':
                this.editInterface(params);
                break;
            case 'BTNLISTONEDELETE':
                this.deleteSysInterface(params.ID);
                break;
        }
    }
    /**YM
     * 确认删除接口？
     * @param id 
     */
    deleteSysInterface(id:string): void {
        // let token = CommonService.guid();
        // let modal: FcModalConfig = {
        //     title: '操作提示',
        //     content: '确认删除吗？',
        //     okFunc: (result) => {
        //         SysserviceBusiness.delteSysInterface(id)
        //     },
        //     cancelFunc: (result) => {
        //         SysserviceBusiness.logService.debug("ok");
        //     },
        //     token: token
        // }
        // CommonService.event(FccomponentEvent.modal.confirm, modal);
    }
    /**
     * 初始化产品名称的自定义下拉选项内容
     */
    getPidOption(): void {
        SystemBusiness.appService.findWithQuery("SYSPRODUCT", {}).subscribe(res => {
            if (res.DATA) {
                this.pidOption = [];
                res.DATA.forEach(el => {
                    let option = { label: el.PNAME, value: el.PID, disabled: false };
                    this.pidOption.push(option);
                });
            }
            else SysserviceBusiness.msgService.error("在取出产品名称相关数据时出错");
        })
    }
    /** YM
     * 处理路由传参的情况
     * @param pid 
     */
    handleRouterParam(): void {
        if (this.routerParam.ID) {
            SysserviceBusiness.appService.findWithQuery('SYSSERVICE', {WHERE:"{ID:{eq:'"+this.routerParam.ID+"'}}"}).subscribe(res => {
                if (res.CODE === '0' && res.DATA.length !== 0) {
                    for (let attr in res.DATA[0]) {
                        this.mainObj[attr] = res.DATA[0][attr];
                    }
                    this.staticMainObj = {};
                    for (let attr in this.mainObj) {
                        this.staticMainObj[attr] = this.mainObj[attr];
                    }
                    this.getSysInterfaces({WHERE:"{APPID:{eq:'"+this.mainObj.SERVICEID+"'}}"});
                } else {
                    SysserviceBusiness.msgService.error('基本信息获取失败');
                }
            })
        }
    }
    /**
     * 获取服务-接口数据
     * @param serviceId 
     */
    getSysInterfaces(serviceId:any): void {
        // SysserviceBusiness.getSysInterfaces(serviceId).subscribe(res => {
        //     if (res.CODE === '0') {
        //         this.sysInterfaces = res.DATA;
        //     } else {
        //         SysserviceBusiness.msgService.error('接口数据获取失败');
        //     }
        // });
    }
    /** YM
     * 根据PID获取服务编码并赋值.
     * @param pid 
     */
    getServiceId(pid: string): void {
        SysserviceBusiness.getBizCodeByAid(pid).subscribe(res => {
            if (res.CODE === '0') {
                this.mainObj.SERVICEID = res.DATA[0];
            }
        });
    }
    /**
     * 实现继承与父类的beforeSave函数，对cardSave函数进行功能扩展;
     */
    beforeSave(): boolean {
        // this.mainObj = this.mainService.beforeSave(this.mainObj);
        return true;
    }
    /**
     * 实现继承与父类的afterSave函数，对cardSave函数进行功能扩展;
     */
    afterSave(): void {
        SysserviceBusiness.appService.findWithQuery('',{WHERE:"{SERVICEID:{eq:'"+this.mainObj.SERVICEID+"'}}"}).subscribe(res => {
            if (res.CODE === '0') {
                this.navigate(this.getRouteUrl('Edit'), { ID: res.DATA[0].ID, refresh: 'Y' });
            }
        });
    }
    /**
    * 新增接口,跳转到新增接口页面
    */
    editInterface(params?: any): void {
        this.navigate(this.getUrl(this.moduleId, 'SYSINTERFACE', 'Edit'),{ ID: params ? params.ID : undefined, serviceId: this.mainObj.ID, from: this.appId, refresh: 'Y' })
    }
    /** YM
      * 显示窗口前的判断
      * @param dialogCardListArgs  
      */
    // showModal(dialogCardListArgs: DialogCardListArgs) {
    //     if (dialogCardListArgs.textComponent ? dialogCardListArgs.textComponent.fcDisabled : true) {
    //         dialogCardListArgs = this.buildDialogCardListArgs(dialogCardListArgs);
    //         dialogCardListArgs.configInterface.width = "80%";
    //         SysserviceBusiness.openDialog(dialogCardListArgs).subscribe(dialogCardListArgs => {
    //             if (dialogCardListArgs.hasOwnProperty('methodIndex'))
    //                 this.afterFuctionForDialog(dialogCardListArgs);
    //         });
    //     }
    // }
    /** YM
    * 弹窗的必要参数构建函数派发
    * @param dialogCardListArgs 
    */
    // buildDialogCardListArgs(dialogCardListArgs: DialogCardListArgs) {
    //     switch (dialogCardListArgs.methodIndex) {
    //         case 'DEFAULTAPPID':
    //             dialogCardListArgs.configInterface.title = '选择默认模型';
    //             dialogCardListArgs.configInterface.content = DialogCardListComponent;
    //             dialogCardListArgs.condition = {};
    //             dialogCardListArgs.appId = 'SYSAPP';
    //             break;
    //     }
    //     return dialogCardListArgs;
    // }
    /** YM
    * 弹窗确认后的处理函数派发
    * @param dialogCardListArgs 
    */
    // afterFuctionForDialog(dialogCardListArgs: DialogCardListArgs) {
    //     switch (dialogCardListArgs.methodIndex) {
    //         case 'DEFAULTAPPID':
    //             if (dialogCardListArgs.data)
    //                 this.mainObj.DEFAULTAPPID = dialogCardListArgs.data.APPID;
    //             break;
    //     }
    // }
    /**
     *  返回列表方法
     */
    backToList(): void {
        this.navigate(this.getRouteUrl('List'), { refresh: 'Y' });
    }
}
