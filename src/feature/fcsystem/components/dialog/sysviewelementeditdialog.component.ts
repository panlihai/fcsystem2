import { Component, Input } from '@angular/core';
import { ParentEditComponent, FctextComponent, FccomboComponent, FcanyComponent } from 'fccomponent2';
import SystemBusiness from 'fccore2/classes/system.business';
import { SysviewBusiness } from '../../business/sysview.business';
//属性编辑-弹窗
@Component({
    selector: 'sysviewelementeditdialog',
    template: `
  <fc-layoutpanel class="sys-card-pannel">
  <div fcheader class="sys-card-pannel-header">
      <fc-title fcLabel="元素-编辑" class="sys-card-pannel-title" fcHasLine="N"></fc-title>
      <P class="sys-card-pannel-smarks">
          编辑：编辑元素功能，配置视图元素：包含字段信息、模型信息、样式信息
      </P>
      <div class="sys-card-fast">
          <ul class="sys-fast-list">
              <li class="sys-icon-btn" (click)="event('closeDialog')">
                  <fc-icon fcIcon="fc-icon-close" fcColor="#009DFF"></fc-icon>关闭</li>
          </ul>
      </div>
      <fc-icon class="sys-card-bg" [fcSvg]="routerParam.MENUICON" fcWidth="48" fcHeight="48"></fc-icon>
  </div>
  <div fccontent class="sys-card-pannel-edit">
      <div class="sys-title-container">
          <fc-title class="sys-flex-title" fcLabel="基本信息" fcHasLine="N"></fc-title>
      </div>
      <fc-layoutcol>
          <fc-layoutcol fccontent1 fcSpans="9,1">
              <fc-text fccontent1 fcLabel="功能名称" [(ngModel)]="funcName" [fcAppid]="appId" fcFieldCode="FUNCID" name="FUNCID" fcReadonly="Y"></fc-text>
              <fc-text fccontent1 fcLabel="元素编码" [(ngModel)]="mainObj.ELEMENTID" [fcAppid]="appId" fcFieldCode="ELEMENTID" name="ELEMENTID"></fc-text>
              <fc-text fccontent1 fcLabel="默认模型" [(ngModel)]="defaultModelName" [fcAppid]="appId" fcFieldCode="APPID" name="APPID" fcReadonly="true"></fc-text>
              <fc-combo fccontent1 fcLabel="数据类型" [(ngModel)]="mainObj.CATAGORY" [fcAppid]="appId" fcFieldCode="CATAGORY" fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="CATAGORY" [fcDisabled]="true"></fc-combo>
              <fc-radio fccontent1 fcLabel="主键" [(ngModel)]="mainObj.KEYSEQ" [fcAppid]="appId" fcFieldCode="KEYSEQ" fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="KEYSEQ" [fcDisabled]="true"></fc-radio>
              <fc-text fccontent1 fcLabel="长度" [(ngModel)]="mainObj.LENGTH" [fcAppid]="appId" fcFieldCode="LENGTH" name="LENGTH" fcReadonly="true"></fc-text>
              <div class="place-div" fccontent2></div>
              <div class="place-div" fccontent2></div>
              <div class="last-btn" fccontent2>
                  <fc-button fccontent2 fcLabel="切换模型" fcType="primary" (click)="event('DEFAULTAPPID',fieldany)"></fc-button>
              </div>
          </fc-layoutcol>
          <fc-layoutcol fccontent2 fcSpans="9,1">
              <fc-text fccontent1 fcLabel="视图名称" [(ngModel)]="viewName" [fcAppid]="appId" fcFieldCode="VIEWID" name="VIEWID" fcReadonly="Y"></fc-text>
              <fc-text fccontent1 fcLabel="元素名称" [(ngModel)]="mainObj.ELEMENTNAME" [fcAppid]="appId" fcFieldCode="ELEMENTNAME" name="ELEMENTNAME"></fc-text>
              <fc-any #fieldany fccontent1 fcLabel="模型字段" [ngModel]="fieldCode" (ngModelChange)="event('updateFieldCode',$event)" [fcAppid]="appId" [fcOption]="fieldOption" fcFieldCode="FIELDCODE" name="FIELDCODE" [fcReadonly]="!mainObj.APPID"></fc-any>
              <fc-radio fccontent1 fcLabel="是否启用" [(ngModel)]="mainObj.ENABLE" [fcAppid]="appId" fcFieldCode="ENABLE" fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="CATAGORY" [fcDisabled]="true"></fc-radio>
              <fc-radio fccontent1 fcLabel="可为空" [(ngModel)]="mainObj.ISNULL" [fcAppid]="appId" fcFieldCode="ISNULL" fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="CATAGORY" [fcDisabled]="true"></fc-radio>
              <fc-text fccontent1 fcLabel="小数点位数" [(ngModel)]="mainObj.SCALE" [fcAppid]="appId" fcFieldCode="SCALE" name="SCALE" fcReadonly="true"></fc-text>
          </fc-layoutcol>
      </fc-layoutcol>
      <div class="sys-title-container">
          <fc-title class="sys-flex-title" fcLabel="输入配置" fcHasLine="N"></fc-title>
          <i class="sys-title-arrow" (click)="event('inputCloseChange')" *ngIf="inputClose">∧</i>
          <i class="sys-title-arrow" (click)="event('inputCloseChange')" *ngIf="!inputClose">∨</i>
      </div>
      <fc-layoutcol *ngIf="inputClose">
          <fc-layoutcol fccontent1 fcSpans="9,1">
              <fc-combo fccontent1 fcLabel="数据字典" [fcShowSearch]="true" [(ngModel)]="mainObj.DICCODE" [fcAppid]="appId" fcFieldCode="DICCODE" fcLabelCode="DICNAME" fcValueCode="DICID" name="DICCODE"></fc-combo>
              <fc-text fccontent1 fcLabel="默认值" [(ngModel)]="mainObj.FIELDDEFAULT" [fcAppid]="appId" fcFieldCode="FIELDDEFAULT" name="FIELDDEFAULT"></fc-text>
              <fc-text fccontent1 fcLabel="输入规则" [(ngModel)]="mainObj.INPUTLIMIT" [fcAppid]="appId" fcFieldCode="INPUTLIMIT" name="INPUTLIMIT"></fc-text>
          </fc-layoutcol>
          <fc-layoutcol fccontent2 fcSpans="9,1">
              <fc-combo fccontent1 fcLabel="编码规则" [fcShowSearch]="true" [(ngModel)]="mainObj.AUTOCODE" [fcAppid]="appId" fcFieldCode="AUTOCODE" fcLabelCode="SBIZCODE_RULE_NAME" fcValueCode="SBIZCODE_RULE_CODE" name="AUTOCODE"></fc-combo>
              <fc-combo fccontent1 fcLabel="输入组件" [fcShowSearch]="true" [(ngModel)]="mainObj.INPUTTYPE" [fcAppid]="appId" fcFieldCode="INPUTTYPE" fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="INPUTTYPE"></fc-combo>
              <fc-radio fccontent1 fcLabel="可编辑" [(ngModel)]="mainObj.ENABLEWRITE" [fcAppid]="appId" fcFieldCode="ENABLEWRITE" fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="ENABLEWRITE"></fc-radio>
          </fc-layoutcol>
      </fc-layoutcol>
      <div class="sys-title-container">
          <fc-title class="sys-flex-title" fcLabel="输出配置" fcHasLine="N"></fc-title>
          <i class="sys-title-arrow" (click)="event('outputCloseChange')" *ngIf="outputClose">∧</i>
          <i class="sys-title-arrow" (click)="event('outputCloseChange')" *ngIf="!outputClose">∨</i>
      </div>
      <fc-layoutcol *ngIf="outputClose">
          <fc-layoutcol fccontent1 fcSpans="9,1">
              <fc-text fccontent1 fcLabel="排序" [(ngModel)]="mainObj.SORT" [fcAppid]="appId" fcFieldCode="SORT" name="SERVICENAME"></fc-text>
              <fc-text fccontent1 fcLabel="样式" [(ngModel)]="mainObj.TCLASS" [fcAppid]="appId" fcFieldCode="TCLASS" name="TCLASS"></fc-text>
              <fc-text fccontent1 fcLabel="行内样式" [(ngModel)]="mainObj.STYLE" [fcAppid]="appId" fcFieldCode="STYLE" name="STYLE"></fc-text>
              <fc-radio fccontent1 fcLabel="列锁定" [(ngModel)]="mainObj.ENABLELOCK" [fcAppid]="appId" fcFieldCode="ENABLELOCK" fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="ENABLELOCK"></fc-radio>
              <fc-text fccontent1 fcLabel="列最长显示" [(ngModel)]="mainObj.LISTMAXLEN" [fcAppid]="appId" fcFieldCode="LISTMAXLEN" name="LISTMAXLEN"></fc-text>
          </fc-layoutcol>
          <fc-layoutcol fccontent2 fcSpans="9,1">
              <fc-text fccontent1 fcLabel="显示前缀" [(ngModel)]="mainObj.VIEWPREFIX" [fcAppid]="appId" fcFieldCode="VIEWPREFIX" name="VIEWPREFIX"></fc-text>
              <fc-text fccontent1 fcLabel="显示格式" [(ngModel)]="mainObj.VIEWFORMAT" [fcAppid]="appId" fcFieldCode="VIEWFORMAT" name="VIEWFORMAT"></fc-text>
              <fc-text fccontent1 fcLabel="显示后缀" [(ngModel)]="mainObj.VIEWSUFFIX" [fcAppid]="appId" fcFieldCode="VIEWSUFFIX" name="VIEWSUFFIX"></fc-text>
              <fc-text fccontent1 fcLabel="文本提示" [(ngModel)]="mainObj.PLACEHOLDER" [fcAppid]="appId" fcFieldCode="PLACEHOLDER" name="PLACEHOLDER"></fc-text>
              <fc-combo fccontent1 fcLabel="分组" [(ngModel)]="mainObj.GRPCODE" [fcAppid]="appId" fcFieldCode="GRPCODE" fcLabelCode="" fcValueCode="" name="GRPCODE"></fc-combo>
              <div class="place-div" fccontent2></div>
              <div class="place-div" fccontent2></div>
              <div class="place-div" fccontent2></div>
              <div class="place-div" fccontent2></div>
              <div class="last-btn" fccontent2>
                  <fc-button fccontent2 fcType="primary" fcLabel="+" (click)="event('addGroupCode')"></fc-button>
              </div>
          </fc-layoutcol>
      </fc-layoutcol>
      <div class="sys-title-container">
          <fc-title class="sys-flex-title" fcLabel="其他信息" fcHasLine="N"></fc-title>
      </div>
      <fc-layoutcol>
          <fc-layoutcol fccontent1 fcSpans="9,1">
              <fc-textarea fccontent1 fcLabel="帮助" [fcAppid]="appId" fcFieldCode='HELP' [(ngModel)]="mainObj.HELP" name="HELP"></fc-textarea>
          </fc-layoutcol>
      </fc-layoutcol>
      <fc-tlbform fcLayout="center" fcType="primary" [fcAppid]="appId" (fcEvent)="tlbformEvent($event)"></fc-tlbform>
  </div>
</fc-layoutpanel>
    `,
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
      height:42px;
      position:relative;
      right: 70%;
  }
  .sys-title-container{
    display:flex;
    flex-direction:row;
    align-items:center;
  }
  .sys-flex-title{
      flex:0.8;
  }
  .sys-title-arrow{
    font-size: 20px;
    font-style: inherit;
    flex: 0.2;
  }
  .sys-title-arrow:hover{
    cursor:pointer;
  }
  :host ::ng-deep .fc-tlbform {
       padding:20px 0 60px 0;
  }
  `]
})
export class SysviewelementeditdialogComponent extends ParentEditComponent {
    mainObj: any;
    fieldOption: any;
    inputClose: boolean = false;
    outputClose: boolean = false;
    funcName: string;
    viewName: string;
    staticMainObj: {};
    fieldCode: any;
    defaultModelName: string;
    //传过来的对象
    @Input()
    fcviewObj: any;
    // @Input()
    // set params(param: any) {
    //     if (param) {
    //         this.handleCustomParam(param);
    //     }
    // }
    // set param(mainObj: any) {
    //     if (mainObj)
    //         this.mainObj = mainObj
    // }
    /**
   * 初始化模型，产品对应的内容 
   */
    constructor() {
        super("SYSTEM", "SYSVIEWELEMENT")
    }
    /**
   * 当发生改变的时候，mainObj重新赋值
   */
    ngOnChanges(): void {
        if (this.fcviewObj !== undefined && this.fcviewObj !== '') {
            if (this.fcviewObj !== null) {//编辑卡片的弹窗事件
                this.mainObj = this.fcviewObj;
                this.handleCustomParam(this.mainObj);
                //模型名称
                // this.content = this.fcviewObj.str;
            } else {//新增卡片的弹窗事件
                // this.mainObj = {
                //     APPID: '',
                //     BTNCODE: '',
                //     BTNNAME: '',
                //     ACTCODE: '',
                //     SORT: '',
                //     ENABLE: '',
                //     BTNICON: '',
                //     BTNTYPE: '',
                //     ALLOWTYPE: '',
                //     HELP: ''
                // }
                //模型名称
                // this.content = this.fcviewObj.str;
            }
        }
    }
    handleCustomParam(param) {
        if (param.ID) {
            this.getMainInfo(param.ID);
        } else {
            this.mainObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
        }
        if (param.funcId) {
            this.getInfoAboutFunc(param.funcId);
        }
        if (param.viewId) {
            this.getInfoAboutView(param.viewId);
        }
    }
    getInfoAboutFunc(id) {
        SystemBusiness.appService.findWithQuery('SYSFUNC', { WHERE: "{ID:{eq:'" + id + "'}}" }).subscribe(res => {
            if (res.CODE === '0') {
                this.mainObj.FUNCID = res.DATA[0].FUNCID;
                this.funcName = `${res.DATA[0].FUNCID} - ${res.DATA[0].FUNCNAME}`
            }
        })
    }
    getInfoAboutView(id) {
        SystemBusiness.appService.findWithQuery('SYSVIEW', { WHERE: "{ID:{eq:'" + id + "'}}" }).subscribe(res => {
            if (res.CODE === '0') {
                this.mainObj.VIEWID = res.DATA[0].VIEWID;
                this.viewName = `${res.DATA[0].VIEWID} - ${res.DATA[0].VIEWNAME}`
            }
        })
    }
    getMainInfo(id) {
        SystemBusiness.appService.findWithQuery('SYSVIEW', { WHERE: "{ID:{eq:'" + id + "'}}" }).subscribe(res => {
            if (res.CODE === '0') {
                for (let attr in res.DATA[0]) {
                    this.mainObj[attr] = res.DATA[0][attr];
                }
            }
        })
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
    }
    /**
     * html事件收集及派发函数
     * @param eventName 
     * @param context 
     */
    event(eventName: string, context: any): void {
        // let dialogCardListArgs: DialogCardListArgs = { appId: null, configInterface: { title: null } };
        // dialogCardListArgs.methodIndex = eventName;
        // if (context instanceof FctextComponent) dialogCardListArgs.textComponent = context;
        switch (eventName) {
            case 'closeDialog':
                // this.modal.destroy();
                break;
            // case 'DEFAULTAPPID':
            //     this.showModal(dialogCardListArgs, context);
            //     break;
            // case 'addGroupCode':
            //     this.showModal(dialogCardListArgs);
            //     break;
            case 'inputCloseChange':
                this.inputClose = !this.inputClose;
                break;
            case 'outputCloseChange':
                this.outputClose = !this.outputClose;
                break;
            case 'updateFieldCode':
                this.handleUpdateFieldCode(context);
                break;
        }
    }
    handleUpdateFieldCode(param) {
        let beforeChangeObj: any = {};
        for (let attr in this.mainObj) {
            beforeChangeObj[attr] = this.mainObj[attr];
        }
        if (param) {
            this.mainObj.FIELDCODE = param.value.FIELDCODE
            this.handleFieldCodeInfo(this.mainObj.APPID, this.mainObj.FIELDCODE);
        } else {
            this.mainObj = beforeChangeObj;
            SystemBusiness.msgService.success('表单数据已还原');
        }
    }
    handleFieldCodeInfo(appId, fieldCode) {
        let keys = Object.keys(this.mainObj);
        SysviewBusiness.getDetailByFieldCode(appId, fieldCode).subscribe(res => {
            if (res.CODE === '0') {
                for (let attr in res.DATA[0]) {
                    if (attr === 'DBTYPE') {
                        this.mainObj['CATAGORY'] = res.DATA[0][attr];
                    }
                    if (keys.indexOf(attr) === -1) {
                        delete res.DATA[0][attr];
                    } else {
                        if (attr !== 'ID') {
                            this.mainObj[attr] = res.DATA[0][attr] + '';
                        }
                        if (this.mainObj[attr] === null || this.mainObj[attr] === 'null') {
                            this.mainObj[attr] = '';
                        }
                        keys.splice(keys.indexOf(attr), 1);
                    }
                }
                SystemBusiness.msgService.success('匹配默认模型成功');
            } else {
                SystemBusiness.msgService.error('匹配默认模型失败');
            }
        })
    }
    beforeSave() {
        return true;
    }
    autoFormatObj() {
        let keys = Object.keys(this.mainObj);
        SystemBusiness.appService.findWithQuery('SYSAPPFIELDS', { WHERE: "{APPID:{eq:'" + this.appId + "'}}" }).subscribe(res => {
            if (res.CODE === '0') {
                res.DATA.forEach(el => {
                    if (keys.indexOf(el.FIELDCODE) > -1)
                        switch (el.DBTYPE) {
                            case 'STR':
                                this.mainObj[el.FIELDCODE].toString();
                                break;
                            case 'NUM':
                                this.mainObj[el.FIELDCODE] = Number.parseInt(this.mainObj[el.FIELDCODE]);
                                break;
                        }
                })
            }
        });
    }
    /**
    * 初始化mainObj的默认值
    */
    initDefaultMainObj() {
        this.mainObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
    }
    /**
     * 初始化产品名称的自定义下拉选项内容
     */
    initPidOption() {
    }
    /** YM
     * 根据PID获取服务编码并赋值.
     * @param pid 
     */
    getServiceId() {
    }
    /**
     * 实现继承与父类的afterSave函数，对cardSave函数进行功能扩展;
     */
    afterSave() {
        // this.modal.destroy();
    }
    /**
  * 新增产品,跳转到新增产品页面
  */
    addView() {
    }
    addInterface() {
    }
    /** YM
      * 显示窗口前的判断
      * @param dialogCardListArgs  
      */
    // showModal(dialogCardListArgs: DialogCardListArgs, context?: any) {
    //     if (dialogCardListArgs.textComponent ? dialogCardListArgs.textComponent.fcDisabled : true) {
    //         dialogCardListArgs = this.builddialogCardListArgs(dialogCardListArgs);
    //         dialogCardListArgs.configInterface.width = "80%";
    //         // SysviewBusiness.openDialog(dialogCardListArgs).subscribe(dialogCardListArgs => {
    //         //     if (dialogCardListArgs.hasOwnProperty('methodIndex'))
    //         //         this.afterFuctionForDialog(dialogCardListArgs, context);
    //         // });
    //     }
    // }
    /** YM
  * 弹窗的必要参数构建函数派发
  * @param dialogCardListArgs 
  */
    // builddialogCardListArgs(dialogCardListArgs: DialogCardListArgs) {
    //     switch (dialogCardListArgs.methodIndex) {
    //         case 'DEFAULTAPPID':
    //             dialogCardListArgs.configInterface.title = '选择默认模型';
    //             dialogCardListArgs.configInterface.content = DialogCardListComponent;
    //             dialogCardListArgs.condition = {};
    //             dialogCardListArgs.appId = 'SYSAPP';
    //             break;
    //         case 'addGroupCode':
    //             break;
    //     }
    //     return dialogCardListArgs;
    // }
    /** YM
    * 弹窗确认后的处理函数派发
    * @param dialogCardListArgs 
    */
    // afterFuctionForDialog(dialogCardListArgs: DialogCardListArgs, context?: any) {
    //     switch (dialogCardListArgs.methodIndex) {
    //         case 'DEFAULTAPPID':
    //             if (dialogCardListArgs.data) {
    //                 this.mainObj.APPID = dialogCardListArgs.data.APPID;
    //                 this.defaultModelName = `${this.mainObj.APPID} - ${dialogCardListArgs.data.APPNAME}`
    //                 if (context) {
    //                     this.resetComboAsText(context);
    //                     this.initFieldOption(this.mainObj.APPID);
    //                 }
    //             }
    //             break;
    //         case 'addGroupCode':
    //             break;
    //     }
    // }
    /**
     * 根据获取到的模型ID查询得到字段数据作为下拉选项
     * @param appId 
     */
    initFieldOption(appId: string) {
        SystemBusiness.appService.findWithQuery("SYSAPPFIELDS", { WHERE: "{ID:{eq:'" + appId + "'}}" }).subscribe(res => {
            if (res.CODE === '0') {
                let fields = res.DATA;
                let arr: Array<{ [key: string]: any }> = [];
                fields.forEach(el => {
                    arr.push({ label: `${el.FIELDCODE} - ${el.FIELDNAME}`, value: el });
                })
                this.fieldOption = arr;
                if (this.fieldOption) {
                    SystemBusiness.msgService.success('根据默认模型匹配模型字段成功');
                } else {
                    SystemBusiness.msgService.success('根据默认模型匹配模型字段失败');
                }
            }
        })
    }
    /**
     * 强转combo假设为text组件跳过根据APPID赋值下拉选的步骤，达到自定义下拉。
     * @param fcAny 
     */
    resetComboAsText(fcAny: FcanyComponent) {
        fcAny._id = 'fc-text'
        fcAny.innerValue = undefined;
        fcAny._selectOptions = null;
    }
}