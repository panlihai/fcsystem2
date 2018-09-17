import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParentEditComponent, FctextComponent } from 'fccomponent2';
import SystemBusiness from 'fccore2/classes/system.business';
import { DialogCardListArgs, DialogCardListComponent } from '../dialog/dialogcardlist.component';
import { SysfuncBusiness } from '../../business/sysfunc.business';
import { SysappmodaleventdialogComponent } from '../dialog/sysappmodaleventdialog.component';
import { Sysappbuttons } from 'fccore2/common/beanclass';
import CacheService from 'fccore2/common/cache';
import { CommonService } from 'fccore2/common/common';
@Component({
    selector: 'sysfuncedit',
    templateUrl: 'sysfuncedit.component.html',
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
export class SysfunceditComponent extends ParentEditComponent {
    productName: any;
    pidOption: any;
    sysViews: any;
    sysBtns: any;
    staticMainObj: any;
    mainObj: any;
    btnlistOnes: any;
    btnlistMores: any;
    //
    funcButtons: Sysappbuttons[];
    viewButtons: Sysappbuttons[];
    //按钮对象
    radioDialog: any;
    //视图对象
    viewDialog: any;
    /**
     * 初始化模型，产品对应的内容 
     */
    constructor() {
        super("SYSTEM", "SYSFUNC");
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
        this.getPidOption();
        this.getDefaultObj();
        this.handleRouterParam();
        this.funcButtons = this.mainApp.P_APPLINKS ? SystemBusiness.appService.getListButtonsByAppid("SYSAPPBUTTONS") : [];
        this.viewButtons = this.mainApp.P_APPLINKS ? SystemBusiness.appService.getListButtonsByAppid("SYSVIEW") : [];

    }
    getDefaultObj(): void {
        this.mainObj = {};
        this.mainObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
        this.staticMainObj = {};
        for (let attr in this.mainObj) {
            this.staticMainObj[attr] = this.mainObj[attr];
        }
    }
    /**
     * html事件收集及派发函数
     * @param eventName 
     * @param param 
     */
    event(eventName: string, param?: any): void {
        // event.stopPropagation();
        // let dialogCardListArgs: DialogCardListArgs = { appId: null, configInterface: { title: null } };
        // dialogCardListArgs.methodIndex = eventName;
        // if (param instanceof FctextComponent) dialogCardListArgs.textComponent = param;
        switch (eventName) {
            case 'DEFAULTAPPID':
                // this.showModal(dialogCardListArgs);
                break;
            case 'editView'://新增修改视图
                //选中的对象
                let selectedObj: any = event;
                if (selectedObj && selectedObj !== null) {
                    //把卡片的数据放入缓存中
                    CacheService.setS('SYSVIEWEDIT' + "DATA", CommonService.cloneArray(param));
                    //把id带入到编辑页面
                    this.navigate(this.getUrl(this.moduleId, 'SYSVIEW', 'Edit'), { ID: param.ID, refresh: 'Y' });
                }
                break;
            case 'editBtn':
                this.radioDialog = Object.assign({}, param);
                // dialogCardListArgs.data = {};
                // dialogCardListArgs.data.event = param ? param : null;
                // dialogCardListArgs.data.funcId = this.mainObj.ID;
                // this.showModal(dialogCardListArgs);
                break;
        }
    }
    /**
     * 初始化产品名称的自定义下拉选项内容
     */
    getPidOption(): void {
        SystemBusiness.appService.findWithQuery("SYSPRODUCT", {}).subscribe(res => {
            if (res) {
                this.pidOption = [];
                res.DATA.forEach(el => {
                    //将获得的产品名称添加到下拉框中
                    this.pidOption.push({ label: el.PNAME, value: el.PID, disabled: false });
                });
            }
            else SysfuncBusiness.msgService.error("在取出产品名称相关数据时出错");
        })
    }
    /** YM
     * 处理路由传参的情况
     * @param pid 
     */
    handleRouterParam(): void {
        if (this.routerParam.ID) {
            SystemBusiness.appService.findWithQuery("SYSFUNC", { WHERE: "{ID:{eq:'" + this.routerParam.ID + "'}}" }).subscribe(res => {
                if (res.CODE === '0' && res.DATA.length !== 0) {
                    for (let attr in res.DATA[0]) {
                        this.mainObj[attr] = res.DATA[0][attr];
                    }
                    for (let attr in this.mainObj) {
                        this.staticMainObj[attr] = this.mainObj[attr];
                    }
                    this.getSysViews(this.mainObj.FUNCID);
                    // this.getsysBtns(this.mainObj.FUNCID);
                } else {
                    SystemBusiness.msgService.error('基本信息获取失败');
                }
            })
        }
    }
    /**
     * 获取服务-视图数据
     * @param Id 
     */
    getSysViews(id): void {
        SysfuncBusiness.getSysViews(id).subscribe(res => {
            if (res.CODE === '0') {
                this.sysViews = res.DATA;
            } else {
                SystemBusiness.msgService.error('视图数据获取失败');
            }
        });
    }
    /**
     * 获取功能-按钮事件数据
     * @param id 
     */
    // getsysBtns(id?): void  {
    //     SysfuncBusiness.getsysBtns(id ? id : this.mainObj.FUNCID).subscribe(res => {
    //         if (res.CODE === '0') {
    //             this.sysBtns = res.DATA;
    //         } else {
    //             SystemBusiness.msgService.error('按钮事件数据获取失败');
    //         }
    //     });
    // }
    /**
     * 实现继承与父类的beforeSave函数，对cardSave函数进行功能扩展;
     */
    beforeSave(): boolean {
        // this.mainObj = this.mainService.beforeSave(this.mainObj);
        return true;
    }
    /**
     * 实现继承与父类的afterSave函数，对cardSave函数进行功能扩展;
     * 
     */
    afterSave(): void {
        SystemBusiness.appService.findWithQuery("SYSFUNC", {}).subscribe(res => {
            if (res.CODE === '0') {
                this.navigate(this.getRouteUrl('Edit'), { ID: res.DATA[0].ID, refresh: 'Y' });
            }
        });
    }
    /**
     * 显示弹窗前的判断
     */
    checkFormValue(): boolean {
        for (let attr in this.mainObj)
            if (this.mainObj[attr] !== this.staticMainObj[attr]) {
                // this.messageService.warm("系统检测到表单信息有变更，请先保存后再进行新增操作");
                return false;
            }
        return true;
    }
    /** 
      * 显示窗口前的判断
      * @param dialogCardListArgs  
      */
    showModal(dialogCardListArgs: DialogCardListArgs): void {
        if (!this.checkFormValue()) {
            return
        }
        if (dialogCardListArgs.textComponent ? dialogCardListArgs.textComponent.fcDisabled : true) {
            dialogCardListArgs = this.builddialogCardListArgs(dialogCardListArgs);
            dialogCardListArgs.configInterface.width = "80%";
            // SysfuncBusiness.openDialog(dialogCardListArgs).subscribe(dialogCardListArgs => {
            //     if (dialogCardListArgs.hasOwnProperty('methodIndex'))
            //         this.afterFuctionForDialog(dialogCardListArgs);
            // });
        }
    }
    /** 
    * 弹窗的必要参数构建函数派发
    * @param dialogCardListArgs 
    */
    builddialogCardListArgs(dialogCardListArgs: DialogCardListArgs): any {
        switch (dialogCardListArgs.methodIndex) {
            case 'DEFAULTAPPID':
                dialogCardListArgs.configInterface.title = '选择默认模型';
                dialogCardListArgs.configInterface.content = DialogCardListComponent;
                dialogCardListArgs.condition = {};
                dialogCardListArgs.appId = 'SYSAPP';
                break;
            case 'editBtn':
                // dialogCardListArgs.configInterface.title = '功能按钮';
                // dialogCardListArgs.configInterface.content = SysappmodaleventdialogComponent;
                // dialogCardListArgs.data.fromFunc = true;
                break;
        }
        return dialogCardListArgs;
    }
    /** 
    * 弹窗确认后的处理函数派发
    * @param dialogCardListArgs 
    */
    afterFuctionForDialog(dialogCardListArgs: DialogCardListArgs): void {
        switch (dialogCardListArgs.methodIndex) {
            case 'DEFAULTAPPID':
                if (dialogCardListArgs.data)
                    this.mainObj.DEFAULTAPPID = dialogCardListArgs.data.APPID;
                break;
            case 'editBtn':
                // this.getsysBtns();
                break;
        }
    }
    /**
     *  返回列表方法
     */
    backToList(): void {
        this.navigate(this.getRouteUrl('List'));
    }
}
