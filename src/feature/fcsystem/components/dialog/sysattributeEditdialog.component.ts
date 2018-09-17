import { Component, Input } from '@angular/core';
import { ParentEditComponent, FctextComponent, FccomboComponent } from 'fccomponent2';
import { SysappBusiness } from '../../business/sysapp.business';
//属性编辑-弹窗
@Component({
  selector: 'sysattributeeditdialog',
  template: `
  <div>
    <div class="bg-dialog-content">
         <div class="topClose">
            <fc-title fcLabel="属性-编辑" class="sys-card-pannel-title" fcHasLine="N"></fc-title>
            <div> 编辑：编辑元素功能，配置视图元素：包含字段信息、模型信息、样式信息</div>
         </div>
         <div fccontent>
         <fc-layoutpanel fccontent id="id0">
             <fc-title fcLabel="基本信息" fcWidth="96%" fcheader fcHasLine="N"></fc-title>
             <fc-layoutcol fcSpans="1,1" fccontent>
                 <div fccontent1>
                      <fc-text fccontent1 fcLabel="模型名称" [(ngModel)]="content" [fcAppid]="appId" fcFieldCode="APPID" [fcValid]="mainValid.APPID" name="SERVICEID" fcReadonly="Y" ></fc-text>
                      <fc-text fccontent1 fcLabel="属性名称" [(ngModel)]="mainObj.FIELDNAME" [fcAppid]="appId" fcFieldCode="FIELDNAME" [fcValid]="mainValid.FIELDNAME" name="ELEMENTID" fcPlaceHolder="请输入中文，元素的名称" fcHelp="描述此模型属性的名称"></fc-text>                     
                 </div>
                 <div fccontent2>
                      <fc-text fccontent1 fcLabel="属性编码" [(ngModel)]="mainObj.FIELDCODE" [fcAppid]="appId" fcFieldCode="FIELDCODE"  [fcValid]="mainValid.FIELDCODE"  name="VIEWID" fcPlaceHolder="默认从模型中获取，可自定义" fcHelp="唯一标识模型属性内容"></fc-text>
                      <fc-combo #fieldCombo fccontent1 fcLabel="数据类型" [(ngModel)]="mainObj.DBTYPE" [fcAppid]="appId"  fcFieldCode="DBTYPE" [fcValid]="mainValid.DBTYPE"  name="FIELDCODE" fcLabelCode="DICDESC" fcValueCode="DICVALUE" fcPlaceHolder="
                      数据类型"></fc-combo>                   
                 </div>
             </fc-layoutcol>
             <fc-layoutcol fcSpans="1,1" fccontent>
                <fc-layoutcol fcSpans="1,1" fccontent1>
                  <fc-radio fccontent1 fcLabel="主键" [(ngModel)]="mainObj.KEYSEQ" [fcAppid]="appId" fcFieldCode="KEYSEQ" [fcValid]="mainValid.KEYSEQ" fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="KEYSEQ" fcHelp="默认全模型唯一"></fc-radio>
                  <fc-radio fccontent2 fcLabel="可为空" [(ngModel)]="mainObj.ISNULL" [fcAppid]="appId" fcFieldCode="ISNULL" [fcValid]="mainValid.ISNULL" fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="CATAGORY" fcHelp="默认可为空字符串"></fc-radio>
                </fc-layoutcol>   
                <fc-radio fccontent2 fcLabel="是否启用" [(ngModel)]="mainObj.ENABLE" [fcAppid]="appId" fcFieldCode="ENABLE" [fcValid]="mainValid.ENABLE" fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="CATAGORY" fcHelp="默认为启用"></fc-radio>
            </fc-layoutcol>
             <fc-layoutcol fcSpans="1,1" fccontent>
                <fc-text fccontent1 fcLabel="长度" [(ngModel)]="mainObj.LENGTH" [fcAppid]="appId" fcFieldCode="LENGTH" [fcValid]="mainValid.LENGTH" name="LENGTH" fcPlaceHolder="请输入整数"></fc-text> 
                <fc-text fccontent2 fcLabel="小数点位数" [(ngModel)]="mainObj.SCALE" [fcAppid]="appId" fcFieldCode="SCALE" name="SCALE" fcPlaceHolder="
                请输入整数，默认为0"></fc-text>
              </fc-layoutcol>
             <fc-layoutcol fcSpans="1,0" fccontent class="otherMessage">
                <i class="sys-title-arrow" *ngIf="entershowDown===true" (click)="enterCon(entershowDown)" fccontent1>∧</i>
                <i class="sys-title-arrow" *ngIf="entershowDown===false" (click)="enterCon(entershowDown)" fccontent1>∨</i>
                <fc-title fcLabel="输入配置" fcWidth="96%" fcHasLine="N" *ngIf="entershowDown===false" fccontent1></fc-title>
             </fc-layoutcol>
             <fc-layoutcol fcSpans="1,1" fccontent class="otherMessage">
                <div class="sys-choose-icon" fccontent1 *ngIf="entershowDown===false">
                    <fc-combo fccontent1 fcLabel="数据字典" [fcShowSearch]="true" [(ngModel)]="mainObj.DICCODE" [fcAppid]="appId" fcFieldCode="DICCODE" fcLabelCode="DICNAME" fcValueCode="DICID" name="DICCODE" fcPlaceHolder="
                    显示的位置，请输入整数值" fcHelp="静态数据字典或动态字典"></fc-combo>
                    <fc-text fccontent1 fcLabel="默认值" fcHelp="默认值设置，如0，A等固定值；此数值必须与数据字典匹配的值" [(ngModel)]="mainObj.FIELDDEFAULT" [fcAppid]="appId" fcFieldCode="FIELDDEFAULT" [fcValid]="mainValid.FIELDDEFAULT" name="FIELDDEFAULT"></fc-text>
                    <fc-text fccontent1 fcLabel="输入规则" fcHelp="输入组件中的规则" [(ngModel)]="mainObj.INPUTLIMIT" [fcAppid]="appId" fcFieldCode="INPUTLIMIT" name="INPUTLIMIT"></fc-text>
                </div>
                <div fccontent2 style="margin-top:5px;" *ngIf="entershowDown===false">
                    <fc-combo fccontent1 fcLabel="编码规则" fcHelp="默认出现常用的编码规则" [fcShowSearch]="true" [(ngModel)]="mainObj.AUTOCODE" [fcAppid]="appId" fcFieldCode="AUTOCODE" [fcValid]="mainValid.AUTOCODE" fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="AUTOCODE"></fc-combo>
                    <fc-combo fccontent1 fcLabel="输入组件" fcHelp="组件类型，文本框等"[fcShowSearch]="true" [(ngModel)]="mainObj.INPUTTYPE" [fcAppid]="appId" fcFieldCode="INPUTTYPE" [fcValid]="mainValid.INPUTTYPE"  fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="INPUTTYPE"></fc-combo>
                    <fc-radio fccontent1 fcLabel="可编辑" fcHelp="默认是可编辑" [(ngModel)]="mainObj.ENABLEWRITE" [fcAppid]="appId" fcFieldCode="ENABLEWRITE" fcLabelCode="DICDESC" [fcValid]="mainValid.ENABLEWRITE" fcValueCode="DICVALUE" name="ENABLEWRITE"></fc-radio>
                </div>
            </fc-layoutcol>
            <fc-layoutcol fcSpans="1,0" fccontent class="otherMessage">
                <i class="sys-title-arrow" *ngIf="outershowDown===true" (click)="outputCon($event)" fccontent1>∧</i>
                <i class="sys-title-arrow" *ngIf="outershowDown===false" (click)="outputCon($event)" fccontent1>∨</i>
                <fc-title fcLabel="输出配置" fcWidth="96%" fcHasLine="N" *ngIf="outershowDown===false" fccontent1></fc-title>
             </fc-layoutcol>
            <fc-layoutcol fcSpans="1,1" fccontent class="otherMessage">
                <div class="sys-choose-icon" fccontent1 *ngIf="outershowDown===false">
                    <fc-text fccontent1 fcLabel="排序" fcHelp="视图元素中的所在位置；如列表位置，表单位置，查询条件位置等；" [(ngModel)]="mainObj.SORT" [fcAppid]="appId" fcFieldCode="SORT" [fcValid]="mainValid.SORT"  name="SERVICENAME" fcPlaceHolder="显示的位置，请输入整数值"></fc-text>
                    <fc-text fccontent1 fcLabel="样式" fcHelp="CSS样式类名" [(ngModel)]="mainObj.TCLASS" [fcAppid]="appId" fcFieldCode="TCLASS" name="TCLASS" fcPlaceHolder="
                    样式类名称，class中出现的名称"></fc-text>
                    <fc-text fccontent1 fcLabel="行内样式" fcHelp="CSS样式" [(ngModel)]="mainObj.STYLE" [fcAppid]="appId" fcFieldCode="STYLE" [fcValid]="mainValid.STYLE" name="STYLE" fcPlaceHolder="行内样式，style中出现的样式内容"></fc-text>
                    <fc-radio fccontent1 fcLabel="列锁定" fcHelp="列表组件有效：列左侧列锁定或列右侧锁定；一个视图最多两列锁定" [(ngModel)]="mainObj.ENABLELOCK" [fcAppid]="appId" fcFieldCode="ENABLELOCK" [fcValid]="mainValid.ENABLELOCK" fcLabelCode="DICDESC" fcValueCode="DICVALUE" name="ENABLELOCK"></fc-radio>
                    <fc-text fccontent1 fcLabel="列最长显示" fcHelp="列表组件有效：列表中显示的字数，超过三个点" [(ngModel)]="mainObj.LISTMAXLEN" [fcAppid]="appId" fcFieldCode="LISTMAXLEN"  [fcValid]="mainValid.LISTMAXLEN" name="LISTMAXLEN" fcPlaceHolder="请输入整数"></fc-text>
                </div>
                <div fccontent2 style="margin-top:5px;" *ngIf="outershowDown===false">
                    <fc-text  fcLabel="显示前缀" fcHelp="视图元素中的当前值前缀；如￥1000元，其￥是前缀" [(ngModel)]="mainObj.VIEWPREFIX" [fcAppid]="appId" fcFieldCode="VIEWPREFIX" [fcValid]="mainValid.VIEWPREFIX" name="VIEWPREFIX" fcPlaceHolder="
                    显示时，在数值之前显示"></fc-text>
                    <fc-text  fcLabel="显示格式" fcHelp="视图元素中的当前值格式如￥100，0元，其中格式##,000,000.00" [(ngModel)]="mainObj.VIEWFORMAT" [fcAppid]="appId" fcFieldCode="VIEWFORMAT" [fcValid]="mainValid.VIEWFORMAT" name="VIEWFORMAT" fcPlaceHolder="
                    显示时，在数值显示格式"></fc-text> 
                    <fc-text  fcLabel="显示后缀" fcHelp="视图元素中的当前值后缀；如￥1000元，其中元是后缀" [(ngModel)]="mainObj.VIEWSUFFIX" [fcAppid]="appId" fcFieldCode="VIEWSUFFIX" [fcValid]="mainValid.VIEWSUFFIX" name="VIEWSUFFIX" fcPlaceHolder="显示时，在数值后显示"></fc-text>    
                    <fc-text  fcLabel="文本提示" fcHelp="视图元素中的当前值后缀；如￥1000元，其中元是后缀" [(ngModel)]="mainObj.PLACEHOLDER" [fcAppid]="appId" fcFieldCode="PLACEHOLDER" [fcValid]="mainValid.PLACEHOLDER" name="PLACEHOLDER" fcPlaceHolder="请输入帮助信息，详细描述该属性具有什么特性"></fc-text>              
                    <div class="group">
                        <fc-combo fcHelp="按分组显示，可作为多级表头的实现视图" fcLabel="选择分组" [(ngModel)]="mainObj.GRPCODE" [fcAppid]="'SYSAPPFLDGROUP'" name="GRPCODE" [fcOption]="groupOption" fcPlaceHolder="请选择分组" class="selectGroup"></fc-combo>
                        <fc-modalcard fcEvent="modalEvent($event)" fcWidth="60%" [fcFooter]="null">
                          <sysappfieldgroupdialog fccontent></sysappfieldgroupdialog>
                          <fc-button fcLabel="+" fcType="default" class="addGroup" fcopen></fc-button> 
                        </fc-modalcard>     
                    </div>   
                </div>
            </fc-layoutcol>
            <fc-layoutcol fcSpans="1,0" fccontent class="otherMessage">
                <i class="sys-title-arrow" *ngIf="othershowDown===true" (click)="otherCon($event)" fccontent1>∧</i>
                <i class="sys-title-arrow" *ngIf="othershowDown===false" (click)="otherCon($event)" fccontent1>∨</i>
                <fc-title fcLabel="其他信息" fcWidth="96%" fcHasLine="N" *ngIf="othershowDown===false" fccontent1></fc-title>
             </fc-layoutcol>
            <fc-layoutcol fcSpans="1,0" fccontent class="otherMessage">
                <div class="sys-choose-icon" fccontent1 *ngIf="othershowDown===false">
                    <fc-textarea fccontent1 fcLabel="帮助" [fcAppid]="appId" fcFieldCode='HELP' [(ngModel)]="mainObj.HELP" name="HELP" fcPlaceHolder="请输入帮助信息，详细描述该属性具有什么特性"></fc-textarea>
                </div>
            </fc-layoutcol>
         </fc-layoutpanel>
     </div>
    </div>
    <div class="customize-footer">
        <fc-tlbform fccontent1 fcType="primary" [fcAppid]="appId" fcLayout="center" (fcEvent)="tlbformEvent($event)" class="basicTlb"></fc-tlbform>
    </div>
  </div>
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
      right:95%;
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
  :host ::ng-deep .sys-card-pannel .fc-content .sys-card-pannel-edit .noBottom .fc-layoutcol {
    padding: 0px;
    border-bottom:none;
  }
  :host ::ng-deep .sys-card-pannel .fc-content .sys-card-pannel-edit .noPadding .fc-layoutcol {
    padding: 0px;
  }
  .saveButton{
    width:100%;
    text-align:center;
  }
  .sys-title-arrow{
    font-size: 20px;
    font-style: inherit;
    flex: 0.2;
    display:block;
    text-align: right;
    padding-right: 20px;
    border-top: 1px solid #ccc;
  }
  .sys-title-arrow:hover{
    cursor:pointer;
  }
  .topClose{
    border-bottom:1px solid #ccc;
  }
  .sys-tab{
    margin-left:26%;
  }
  .sys-tab1 {
    margin-left: 25%;
  }
  .group{
    position:relative;
  }
  .addGroup{
    position:absolute;
    top: 4px;
    right: 49px;
  }
  :host ::ng-deep .selectGroup .fc-combo{
    width: 89%;
  }
  `]
})
export class SysattributeeditdialogComponent extends ParentEditComponent {
  //输入配置
  entershowDown: boolean;
  //输出配置
  outershowDown: boolean;
  //其他配置
  othershowDown: boolean;
  productName: any;
  pidOption: any;
  fieldOption: any;
  //分组配置
  groupOption: any;
  //模型名称
  content;
  //传过来的对象
  @Input()
  fcattributeObj: any;
  /**
   * 初始化模型，产品对应的内容
   */
  constructor() {
    super('SYSTEM', 'SYSAPPFIELDS');
  }
  /**
  * 组件初始化执行函数
  */
  init(): void {
    //初始化分组配置
    this.groupOption = SysappBusiness.getGroup().subscribe(res => {
      if (res.CODE === '0') {
        this.groupOption = [];
        res.DATA.forEach(element => {
          this.groupOption.push({ icon: '', label: element.GRPNAME, value: element.GRPCODE });
        });
      }
    })
    this.entershowDown = true;
    this.outershowDown = true;
    this.othershowDown = true;
  }
  /**
  * 当发生改变的时候，mainObj重新赋值
  */
  ngOnChanges(): void {
    if (this.fcattributeObj !== undefined && this.fcattributeObj !== '') {
      if (this.fcattributeObj.event !== null) {//编辑卡片的弹窗事件
        this.mainObj = this.fcattributeObj.event;
        //模型名称
        this.content = this.fcattributeObj.str;
      } else {//新增卡片的弹窗事件
        this.mainObj = {
          APPID: '',
          BTNCODE: '',
          BTNNAME: '',
          ACTCODE: '',
          SORT: '',
          ENABLE: '',
          BTNICON: '',
          BTNTYPE: '',
          ALLOWTYPE: '',
          HELP: ''
        }
        //模型名称
        this.content = this.fcattributeObj.str;
      }
    }
  }
  /**
  * 新增之前执行的函数
  * @param mainObj 
  */
  addNew(mainObj: any): boolean {
    return true;
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
    // switch (eventName) {
    //   case 'closeDialog':
    //     // this.modal.destroy();
    //     break;
    // }
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
  /** 
    * 显示窗口前的判断
    * @param dialogCardListArgs  
    */
  /** 
* 弹窗的必要参数构建函数派发
* @param dialogCardListArgs 
*/
  /**
  * 弹窗确认后的处理函数派发
  * @param dialogCardListArgs 
  */
  // afterFuctionForDialog(dialogCardListArgs: DialogCardListArgs, context?: any) {
  //   switch (dialogCardListArgs.methodIndex) {
  //     case 'DEFAULTAPPID':
  //       if (dialogCardListArgs.data) {
  //         this.mainObj.APPID = dialogCardListArgs.data.APPID;
  //         if (context)
  //           this.resetComboAsText(context);
  //       }
  //       break;
  //     case 'addGroupCode':
  //       break;
  //   }
  // }
  /**
   * 根据获取到的模型ID查询得到字段数据作为下拉选项
   * @param appId 
   */
  initFieldOption(appId: string) {
    this.fieldOption = SysappBusiness.getFieldOptionByAppId(appId);
  }
  /**
   * 强转combo作为text组件跳过根据APPID赋值下拉选的步骤，达到自定义下拉。
   * @param fcCombo 
   */
  resetComboAsText(fcCombo: FccomboComponent) {
    fcCombo._id = 'fc-text'
    fcCombo.innerValue = undefined;
    fcCombo._selectOptions = null;
  }
  /**
 * 展开收起输入配置信息
 */
  enterCon() {
    this.entershowDown = !this.entershowDown;
  }
  /**
 * 展开输出收起配置信息
 */
  outputCon() {
    this.outershowDown = !this.outershowDown;
  }
  /**
 * 展开收起其他配置信息
 */
  otherCon() {
    this.othershowDown = !this.othershowDown;
  }
}