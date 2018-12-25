import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ParentEditComponent } from 'fccomponent2';
import { SysappBusiness } from '../../business/sysapp.business';
import { FCEVENT } from 'fccomponent2/fc';
import SystemBusiness from 'fccore2/classes/system.business';
import { bypassSanitizationTrustResourceUrl } from '@angular/core/src/sanitization/bypass';
@Component({
  selector: 'sysappmodify',
  template: `
  <fc-layoutpanel class="sysappadd sys-card-pannel">
    <div class="sys-card-pannel-header" fcheader>
        <fc-title fcLabel="模型&元数据"></fc-title>
        <P>
            说明：FC开发设计平台，快速开发应用模型，此功能实现模型定义，实现数据库表及视图的新增、修改、删除 、同步。
        </P>
        <div class="sys-card-fast">
            <ul class="sys-fast-list">
                <li>
                    <fc-icon fcIcon="fc-icon-everyday" fcColor="#009DFF"></fc-icon>查看产品</li>
                <li (click)="seeAll($event)">
                    <fc-icon fcIcon="fc-icon-definition" fcColor="#009DFF"></fc-icon>查看所有</li>
                <li (click)="backList($event)">
                    <fc-icon fcIcon="fc-icon-developlist" fcColor="#009DFF"></fc-icon>返回列表</li>
            </ul>
        </div>
    </div>
    <div fccontent class="sys-sppmodify-content">
      <fc-title fcLabel="数据源" fccontent></fc-title>
      <fc-layoutcol fcSpans="1,1" fccontent1>  
        <fc-combo [fcLabel]="'产品'" [fcOption]="productOption" [(ngModel)]="productValue" fccontent1 (ngModelChange)="chooseProduct($event)">
        </fc-combo>
        <fc-combo [fcLabel]="'数据源'" [fcOption]="datasourceOption" [(ngModel)]="datasourceValue" fccontent2 (ngModelChange)="chooseDatasource($event)">
        </fc-combo>    
      </fc-layoutcol>
      <fc-layoutcol fcSpans="4,1" fccontent class="box">
        <fc-layoutcol fcSpans="1,1" fccontent1>  
            <div class="allVandT" fccontent1>
              <div class="allVandTTop">所有表及视图</div>
              <ul class="allVandTBottom" (drop)="drop($event)" (dragover)="dragover($event)">
                  <li *ngFor="let data of allDatas; let i = index" [id]="i" [draggable]="true" (dragstart)="dragstart($event)" (click)="clickActive(i)">{{data.MAINTABLE}}-{{data.TABLETYPE==='TABLE'?'表':'视图'}}</li>
              </ul>
            </div>
            <div class="selectVandT" fccontent2>
              <div class="selectVandTTop">选中的表或视图</div>
              <ul class="selectVandTBottom" (drop)="drop($event)" (dragover)="dragover($event)">
                
              </ul>
            </div>
          </fc-layoutcol>
        <fc-button fccontent2 fcLabel="一键生成" [fcType]="'primary'" (click)="generate($event)" class="boxRight"></fc-button>
      </fc-layoutcol>
    </div> 
  </fc-layoutpanel>
  `,
  styles: [`
  :host ::ng-deep .sys-block .ant-btn{
    display: block;
    margin-bottom:20px;
  } 
  :host ::ng-deep .sysappadd .fc-layoutpanel {
    height: 100%;
  }
  :host ::ng-deep .ant-transfer-operation{
    margin:0px 52px;
  }
  .sys-fast-list {
    cursor: pointer;
  }
  .allVandT,.selectVandT{
    border: 1px solid #d9d9d9;
    width: 66%;
    border-radius: 5px;
    margin-left: 25%;
  }
  .allVandTTop,.selectVandTTop {
    text-align: right;
    padding: 8px;
    border-bottom: 1px solid #d9d9d9;
  }
  .allVandTBottom,.selectVandTBottom {
    padding: 10px;
    height: 400px;
    overflow: auto;
  }
  :host ::ng-deep .box>.fc-layoutcol {
    margin-top: 20px;
  }
  .sys-sppmodify-content {
    background: #ffffff;
    padding-bottom: 30px;
    padding-top: 10px;
    border-radius: 4px;
    margin-bottom: 30px;
    padding-left: 10%;
  }
  fc-button.boxRight {
    margin-top: 59%;
    display: inline-block;
 }
 :host ::ng-deep .fc-title-in{
   margin:10px 0px;
 }
 .allVandTBottom li {
  height: 40px;
  line-height: 40px;
}
.selectVandTBottom li{
  height: 40px;
  line-height: 40px;
}
  `]
})
export class SysappmodifyComponent extends ParentEditComponent {
  //产品下拉选项
  productOption: any[];
  //数据源下拉选项
  datasourceOption: any[];
  //所有的表及视图
  allDatas: any[];
  //穿梭图list
  list: any[];
  //产品id
  pid: any;
  //数据源id
  dsid: any;
  //穿梭框右侧的数据
  rightData: any[]=[];
  /**
   * 初始化模型，产品对应的内容
   */
  constructor() {
    super('SYSTEM', 'SYSAPP');
  }
  init(): void {
    //初始化产品
    this.getproduct();
    //初始化数据源
    this.getdatasource();
  }
  /**
  * 获取软件产品的产品名称
  */
  getproduct(): void {
    SysappBusiness.getproduct().subscribe(res => {
      this.productOption = [];
      res.DATA.forEach(element => {
        //将获得的产品名称添加到下拉框中
        this.productOption.push({ icon: '', label: element.PNAME, value: element.PID });
      });
      return this.productOption;
    })
  }
  /**
  * 获取数据源
  */
  getdatasource(): void {
    SysappBusiness.getdatasource().subscribe(result => {
      this.datasourceOption = [];
      result.DATA.forEach(element => {
        //将获得的数据源名称添加到下拉框中
        this.datasourceOption.push({ icon: '', label: element.DSNAME, value: element.DSID });
      });
      return this.datasourceOption;
    })
  }
  /**
  * 选择产品
  *  @param event 
  */
  chooseProduct(event: any): void {
    this.pid = event;
  }
  /**
  * 选择数据源
  *  @param event 
  */
  chooseDatasource(event: any): void {
    this.dsid = event;
    if (this.dsid !== undefined && this.dsid !== '' && this.pid !== undefined && this.pid !== '') {
      //初始化所有的表及视图数据
      SysappBusiness.getTableOption(this.dsid, this.pid).subscribe(res => {
        if (res.CODE === '0') {
          this.allDatas = res.DATA;
        }
      });
    }
  }
  addNew(mainObj: any): boolean {
    return true;
  }
  event(eventName: string, param: any): void {
  }
  /**
    * dragstart规定当元素被拖动时，会发生什么。drag规定了被拖动的数据
    * @param ev 
    * @param obj 拖拽的对象
    */
  dragstart(ev:any, obj: any): void {
    ev.dataTransfer.effectAllowed = "copy";
    //存入数据
    ev.dataTransfer.setData("Text", ev.target.id);
    ev.dataTransfer.setData("content",ev.target.textContent);
  }
  dragover(ev:any): void {//拖拽目标身上的效果
    ev.preventDefault();
    // Set the dropEffect to move
    ev.dataTransfer.dropEffect = "copy"
  }
  /**
   * 当放置被拖数据时，会发生 drop 事件。
   * @param ev 
   */
  drop(ev:any): void {
    ev.preventDefault();
    //获取目标id并新增dom
    let data:string = ev.dataTransfer.getData("Text");
    let content:string = ev.dataTransfer.getData("content");
    //移动目标
    ev.target.appendChild(document.getElementById(data));
    this.rightData.push(content.split('-')[0]); 
    //拖拽后抛出事件
    //SysappBusiness.msgService.message('拖拽成功');
  }
  /**
   * 
   * @param ev 
   */
  dragenter(ev:any): void {

  }
  /**
   * 点击选择的
   * @param num 
   */
  clickActive(num:any):void{

  }
  /**
  * 查看所有
  * @param event
  */
  seeAll(event: FCEVENT): void {
    this.navigateList(event.param);
  }
  /**
  * 返回列表
  * @param event
  */
  backList(event: FCEVENT): void {
    this.navigateList(event.param);
  }
  /**
  * 一键生成
  * @param event
  */
  generate(event: FCEVENT): void {
    //调用一键生成
    SysappBusiness.createSysappsByTableNames(this.dsid,this.rightData).subscribe(result=>{
      if(result.CODE==='0'){
        this.navigateList(true);
      }else{
        SystemBusiness.msgService.error(result.MSG);
      }
    });
  }
}
