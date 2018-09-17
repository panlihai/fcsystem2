import { Component } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import SystemBusiness from 'fccore2/classes/system.business';
import { SysinterfaceBusiness } from '../../business/sysinterface.business';
@Component({
    selector: 'sysinterfaceedit',
    templateUrl: 'sysinterfaceedit.component.html',
    styles: [`
    .sys-card-btn {
        width:50%;
      }
      :host ::ng-deep .fc-layoutpanel {
          padding:10px;
      }
      .sys-card-pannel .fc-content .sys-card-pannel-edit .noBottomLine .fc-layoutcol {
        padding: 0px;
        border-bottom:none;
      }
      .sys-card-pannel .fc-content .sys-card-pannel-edit .noPadding .fc-layoutcol {
        padding: 0px;
      }
      :host ::ng-deep .sys-card-pannel .fc-content .sys-card-pannel-edit .noPadding .fc-layoutcol {
        padding: 0px;
      }
      :host ::ng-deep .basicTlb .fc-tlbform{
        margin-top:20px;
      }
      .instructionsOther{
        margin-left: 140px;
      }
      .instructions {
        margin-left: 210px;
    }
    .information{
        background-color:#fff;
        padding-bottom:10px;
    }
`]
})
export class SysinterfaceeditComponent extends ParentEditComponent {
    //产品
    pidOption: any;
    //参数数据
    requestParams: any;
    //返回值数据
    responseParams: any;
    staticMainObj: any = {};
    serviceNameValue: any;
    //名称（服务或模型）
    fromName: string;
    //传递给弹窗的对象
    dialogObj:any;
    constructor() {
        super('SYSTEM', 'SYSINTERFACE');
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
        this.initDefaultMainObj();
        //初始化产品名称的自定义下拉选项内容
        this.initPidOption();
        this.handleRouterParam();
        //获取参数配置数据
        this.getParameters(); 
    }
    /** 
    * 处理路由传参的情况
    * @param pid 
    */
    handleRouterParam(): void {
        //修改页面
        if (this.routerParam.ID) {
            if (this.routerParam.from) {
                //根据from判断是sysapp编辑页面还是sysservice页面
                this.initEditObj(this.routerParam);
            } else {
                 SysinterfaceBusiness.msgService.error("缺少必要路由参数");
            }
        }else{//新增页面
            if(this.routerParam.from==='SYSSERVICE'){
                this.fromName = '服务名称';
            }else if(this.routerParam.from==='SYSAPP'){
                this.fromName = '模型编码';
            }
        }
    }
    /** 
     * 初始化编辑数据
     * @param param 
     */
    initEditObj(param: any): void {
        switch (param.from) {
            //服务接口
            case 'SYSSERVICE':
                this.fromName = '服务名称';
                if (param.serviceId) {
                   SysinterfaceBusiness.getServiceById(param.serviceId).subscribe(res => {
                        if (res.CODE === '0' && res.DATA.length !== 0) {
                            for (let attr in res.DATA[0]) {
                                if (attr === 'PID' || attr === 'SERVICENAME') {
                                    this.mainObj[attr] = res.DATA[0][attr];
                                }
                                if (attr === 'SERVICEID') {
                                    this.mainObj['APPID'] = res.DATA[0][attr];
                                }
                            }
                            this.serviceNameValue = `${this.mainObj.APPID} - ${this.mainObj.SERVICENAME}`;
                            delete this.mainObj.SERVICENAME;
                            for (let attr in this.mainObj) {
                                this.staticMainObj[attr] = this.mainObj[attr];
                            }
                        } else {
                            SysinterfaceBusiness.msgService.error('从服务获取基本信息失败');
                        }
                    })
                }
                if (param.ID) {
                   SysinterfaceBusiness.appService.findWithQuery('SYSINTERFACE',{ ID: param.ID }).subscribe(res => {
                        if (res.CODE === '0' && res.DATA.length !== 0) {
                            for (let attr in res.DATA[0]) {
                                this.mainObj[attr] = res.DATA[0][attr];
                            }
                            for (let attr in this.mainObj) {
                                this.staticMainObj[attr] = this.mainObj[attr];
                            }
                            this.initInterfaceParam();
                        } else {
                             SysinterfaceBusiness.msgService.error('从接口获取基本信息失败');
                        }
                    })
                }
                break;
            //模型接口
            case 'SYSAPP':
                if (param.interfaceId) {
                   SysinterfaceBusiness.getById(param.interfaceId).subscribe(res => {
                        if (res.CODE === '0' && res.DATA.length !== 0) {
                            for (let attr in res.DATA[0]) {
                                if (attr === 'PID') {
                                    this.mainObj[attr] = res.DATA[0][attr];
                                }
                                if (attr === 'IMPLNAME') {
                                    this.mainObj['FROMNAME'] = res.DATA[0][attr];
                                    this.fromName = '模型编码'
                                }
                                if (attr === 'APPID') {
                                    this.mainObj['APPID'] = res.DATA[0][attr];
                                }
                            }
                            this.mainObj.FROMNAME = `${this.mainObj.APPID}-${this.mainObj.FROMNAME}`;
                            for (let attr in this.mainObj) {
                                this.staticMainObj[attr] = this.mainObj[attr];
                            }
                        } else {
                            SysinterfaceBusiness.msgService.error('从服务获取基本信息失败');
                        }
                    })
                    SysinterfaceBusiness.appService.findWithQuery('SYSINTERFACE',{ ID: param.interfaceId }).subscribe(res => {
                        if (res.CODE === '0' && res.DATA.length !== 0) {
                            for (let attr in res.DATA[0]) {
                                this.mainObj[attr] = res.DATA[0][attr];
                            }
                            for (let attr in this.mainObj) {
                                this.staticMainObj[attr] = this.mainObj[attr];
                            }
                            this.initInterfaceParam();
                        } else {
                            SysinterfaceBusiness.msgService.error('从接口获取基本信息失败');
                        }
                    })
                } else {
                    SysinterfaceBusiness.getAppById(param.ID).subscribe(res => {
                        if (res.CODE === '0' && res.DATA.length !== 0) {
                            for (let attr in res.DATA[0]) {
                                if (attr === 'PID') {
                                    this.mainObj[attr] = res.DATA[0][attr];
                                }
                                if (attr === 'APPNAME') {
                                    this.mainObj['FROMNAME'] = res.DATA[0][attr];
                                    this.fromName = '模型编码'
                                }
                                if (attr === 'APPID') {
                                    this.mainObj['APPID'] = res.DATA[0][attr];
                                }
                            }
                            this.mainObj.FROMNAME = `${this.mainObj.APPID}-${this.mainObj.FROMNAME}`;
                            for (let attr in this.mainObj) {
                                this.staticMainObj[attr] = this.mainObj[attr];
                            }
                        } else {
                            SysinterfaceBusiness.msgService.error('从服务获取基本信息失败');
                        }
                    })
                }
                break;
        }
    }
    /** 
     * html事件收集及派发函数
     * @param eventName 
     * @param context 
     */
    event(eventName: string, context?: any): void {
        switch (eventName) {
            case 'editRequestParam'://新增修改参数
                this.editRequestParam(context);
                // event.stopPropagation();
                // event.preventDefault();
                break;
            case 'editResponseParam'://新增修改返回值
                this.editResponseParam(context);
                // event.stopPropagation();
                // event.preventDefault();
                break;
            case 'deleteRequestParam':
                // this.editRequestParam();
                event.stopPropagation();
                event.preventDefault();
                break;
            case 'deleteResponseParam':
                // this.deleteRequestParam();
                event.stopPropagation();
                event.preventDefault();
                break;
            case 'backTo':
                this.cardBack();
                break;
        }
    }
    cardBack():void {
        switch (this.fromName) {
            case '服务名称':
                this.navigate(this.getUrl(this.moduleId, 'SYSSERVICE', 'Edit'), { ID: this.routerParam.serviceId, refresh: 'Y' });
                break;
            case '模型编码':
            this.navigate(this.getUrl(this.moduleId, 'SYSAPP', 'Edit'), { ID: this.routerParam.ID });
                break;
        }
    }
    /**
     * 初始化参数列表、返回值定义数据
     */
    initInterfaceParam():void {
        SysinterfaceBusiness.getInterfaceReqParams(this.mainObj.IMPLID, this.mainObj.PID).subscribe(res => {
            if (res.CODE === '0') {
                this.requestParams = res.DATA;
            }
        });
        SysinterfaceBusiness.getInterfaceResParams(this.mainObj.IMPLID, this.mainObj.PID).subscribe(res => {
            if (res.CODE === '0') {
                this.responseParams = res.DATA;
            }
        });
    }
    /** 
     * 初始化mainObj的默认值
     */
    initDefaultMainObj():void {
        this.mainObj = {};
        this.mainObj=SystemBusiness.appService.initObjDefaultValue(this.mainApp);
        this.staticMainObj = {};
        for (let attr in this.mainObj) {
            this.staticMainObj[attr] = this.mainObj[attr];
        }
    }
    /** 
     * 初始化产品名称的自定义下拉选项内容
     */
    initPidOption():void {
        this.pidOption = [];
        SysinterfaceBusiness.appService.findWithQuery("SYSPRODUCT", {}).subscribe(res => {
            if (res.DATA)
                res.DATA.forEach(el => {
                    let option = { label: `${el.PID}+${el.PNAME}`, value: el.PID, disabled: false };
                    this.pidOption.push(option);
                });
            else SysinterfaceBusiness.msgService.error("在取出产品名称相关数据时出错");
        })
    }
    /** 
     * 根据PID获取服务编码并赋值.
     * @param pid 
     */
    getServiceId(): void {
        // if (!this.mainObj.SERVICEID) {
        //     SysinterfaceBusiness.getBizCodeByAid('SYSBIZCODERULE').subscribe(res => {
        //         if (res.CODE === '0') {
        //             this.mainObj.SERVICEID = res.DATA[0];
        //         }
        //     });
        // }
    }
    /**
     * 实现继承与父类的afterSave函数，对cardSave函数进行功能扩展;
     */
    afterSave(): void {
        this.navigate(this.getRouteUrl('Edit'), { PID: this.mainObj.PID, refresh: 'Y' });
    }
    /**
    * 获取参数配置数据
    */
    getParameters(): void {
        SysinterfaceBusiness.getParameters().subscribe(res => {
            if (res.CODE === '0') {
                console.log(res.DATA);
            } else {
                SysinterfaceBusiness.msgService.error('获取参数配置失败');
            }
        })
    }
    /**
    * 返回模型页面
    */
    backModel(): void {
        this.navigate(this.getRouteUrl('Edit'),{ refresh: 'Y', ID: this.mainObj.ID });
    }
    /**
    * 新增参数配置弹窗
    */
    editRequestParam(context?: any) {
        context.serviceId = this.routerParam.serviceId;
        context.interfaceId = this.mainObj.ID;
        context.ID = context.ID;
        this.dialogObj = Object.assign({}, context);
    }
    /**
   * 新增返回值弹窗
   */
    editResponseParam(context?) {
        context.serviceId = this.routerParam.serviceId;
        context.interfaceId = this.mainObj.ID;
        context.ID = context.ID;
        this.dialogObj = Object.assign({}, context);
    }

}
