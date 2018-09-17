import { Component } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
@Component({
  selector: 'sysorganizationdimensionedit',
  template: `
  <fc-layoutpanel fcFull="true">
    <div fccontent style="text-align:center" class="btns">
        <fc-button fcLabel="保存" fcType="primary" (click)="saveEvent()"></fc-button>
        <fc-button fcLabel="返回列表" fcType="default" (click)="backEvent()"></fc-button>
    </div>
    <fc-layoutcol fcSpans="1,1" fccontent>
        <fc-text fccontent1  [(ngModel)]="mainObj.SDIM_CODE"  fcLabel="维度编码" name="TITLE"></fc-text>
        <fc-combo fccontent1 [fcLabel]="'是否内置'" [(ngModel)]="mainObj.BISUSE" [fcAppid]="appId" fcFieldCode="BISUSE" fcLabelCode="DICDESC" fcValueCode="DICVALUE"></fc-combo>
        <fc-combo fccontent1 [fcAppid]="appId" [fcLabel]="'是否私有'" [(ngModel)]="mainObj.BISPUBLIC" [fcAppid]="appId"fcFieldCode="BISPUBLIC" fcLabelCode="DICDESC" fcValueCode="DICVALUE"></fc-combo>
        <fc-text fccontent2  [fcAppid]="appId" [(ngModel)]="mainObj.SDIM_NAME" fcLabel="维度名称" name="PUBLISHUSER" ></fc-text>        
        <fc-text fccontent2  [fcAppid]="appId" [(ngModel)]="mainObj.SREMARK" fcLabel="应用" name="SREMARK" ></fc-text>
        <fc-combo fccontent2 [fcLabel]="'启用状态'" [(ngModel)]="mainObj.BISUSE" [fcAppid]="appId" fcFieldCode="BISUSE" fcLabelCode="DICDESC" fcValueCode="DICVALUE"></fc-combo>
    </fc-layoutcol>
</fc-layoutpanel>
  `,
  styles: [`
  .btns {
      padding: 10px 0px;
  }
  `]
})
export class SysorganizationdimensioneditComponent extends ParentEditComponent {
  constructor() {
    super("SYSTEM", "SYSCOMPANYDIM");
  }
  init(): void {

  }
  event(eventName: string, context: any): void {
  }
  addNew(mainObj: any): boolean {
    return true;
  }
  beforeSave(): boolean {
    return true;
  };
  afterSave() {

  }

}