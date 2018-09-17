import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
@Component({
  selector: 'switch',
  templateUrl: './switch.component.html',
  styles: [``]
})
export class SwitchComponent extends ComponentParent {
  constructor(public mainService: ComponentService) {
    super('FCSWITCH', mainService);
  }
  /**
  * 选择日期
  */
  switchEvent(event: any) {

  }
  // 基本view
  basicview: string = `
   <fc-switch [fcLabel]="'基本'" fcCheckValue="Y" fcOption='[{"label":"是","value":"Y"},{"label":"否","value":"N"}]'></fc-switch>
   `
  //大小
  sizeview: string = `
    <fc-switch [fcLabel]="'小'" fcCheckValue="Y" fcOption='[{"label":"是","value":"Y"},{"label":"否","value":"N"}]' fcSize="small"></fc-switch>
    <fc-switch [fcLabel]="'默认'" fcCheckValue="Y" fcOption='[{"label":"是","value":"Y"},{"label":"否","value":"N"}]' fcSize="default"></fc-switch>
    <fc-switch [fcLabel]="'大'" fcCheckValue="Y" fcOption='[{"label":"是","value":"Y"},{"label":"否","value":"N"}]' fcSize="large"></fc-switch>
    `
  //只读
  readonlyview: string = `
    <fc-switch [fcLabel]="'只读'" fcCheckValue="Y" fcReadonly="Y" fcOption='[{"label":"是","value":"Y"},{"label":"否","value":"N"}]'></fc-switch>
    `
  //禁用
  disabledview: string = `
   <fc-switch [fcLabel]="'只读'" fcCheckValue="Y"  fcDisabled="Y" fcOption='[{"label":"是","value":"Y"},{"label":"否","value":"N"}]'></fc-switch>
   `
  //文案展示
  textview: string = `
    <fc-switch [fcLabel]="'文案显示'" fcCheckValue="Y" [fcShowText]="'Y'" fcCheckedChildren="0" fcUnCheckedChildren="1" fcOption='[{"label":"是","value":"Y"},{"label":"否","value":"N"}]'></fc-switch>
    `
  //图标展示
  iconview: string = `
    <fc-switch [fcLabel]="'图标显示'" fcCheckValue="Y" [fcShowIcon]="'Y'" fcCheckedChildren="fc-icon-shut" fcUnCheckedChildren="fc-icon-icsubmit" fcOption='[{"label":"是","value":"Y"},{"label":"否","value":"N"}]'></fc-switch>
     `
  //不占位
  noshowlabelview: string = `
    <fc-switch fcShowLabel="Y" fcCheckValue="Y" fcOption='[{"label":"是","value":"Y"},{"label":"否","value":"N"}]'></fc-switch>
    `
  // 基本basicjs
  basicjs: string = `
    import { Component, OnInit } from '@angular/core';
    @Component({
      selector: 'switch',
      templateUrl: './switch.component.html',
      styleUrl:'./switch.component.css'
    })
    export class DateComponent{
    }
    `
}