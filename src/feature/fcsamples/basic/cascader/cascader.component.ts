import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../../services/component.service';
import { ComponentParent } from '../../componentparent';

@Component({
  selector: 'cascader',
  templateUrl: './cascader.component.html',
  styles: [``]
})
export class CascaderComponent extends ComponentParent {
  cascaderoptions = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
        isLeaf: true
      }]
    }, {
      value: 'ningbo',
      label: 'Ningbo',
      isLeaf: true
    }]
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
        isLeaf: true
      }]
    }]
  }];
  //size大小
  sizeview:string=`<fc-cascader [fcLabel]="'大'" [fcOption]="cascaderoptions" fcSize="large" fcReadonly="Y"></fc-cascader>
  <fc-cascader [fcLabel]="'中'" [fcOption]="cascaderoptions" fcSize="default" fcReadonly="Y"></fc-cascader>
  <fc-cascader [fcLabel]="'小'" [fcOption]="cascaderoptions" fcSize="small" fcReadonly="Y"></fc-cascader>`
   //基础js
   basicjs: string = `
   import { Component, OnInit } from '@angular/core';
   @Component({
     selector: 'fc-cascader',
     templateUrl: './cascader.component.html',
     styleUrl:'./cascader.component.css'
   })
   export class CascaderComponent{
   }
   `
  constructor(public mainService:ComponentService){
    super('FCCASCADER',mainService);
  }

}
