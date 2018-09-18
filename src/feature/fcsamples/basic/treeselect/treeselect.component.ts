import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
import { TreeOptions, FctreeComponent } from 'fccomponent2';
import { FCEVENT } from 'fccomponent2/fc';
import { NzTreeNode } from 'ng-zorro-antd';
@Component({
  selector: 'treeselect',
  templateUrl: './treeselect.component.html',
  styles: [``]
})
export class TreeselectComponent extends ComponentParent {
  //树事件view
  treeeview: string = `
  <fc-treeselect [(ngModel)]="treeSelectObj" [fcCheckedKeys]="['SYS']" [fcOption]="treeOptions" (fcEvent)=" treeEvent($event);"></fc-treeselect>
  `
   // 基本basicjs
   basicjs: string = `
   import { Component, OnInit } from '@angular/core';
   @Component({
     selector: 'tree',
     templateUrl: './tree.component.html',
     styleUrl:'./tree.component.css'
   })
   export class DateComponent{
      treeSelectObj: any = {};
      treeOptions: TreeOptions = {
        //元数据id
        fcAppid: "SYSMENU",//元数据id
        //树结构节点显示内容
        fcLabel: ':{MENUNAME}::{MENUID}',//支持:{参数名称}
        // 关联父节点字段名称
        fcParentCode: 'PARENT',
        // 当前节点字段名称
        fcChildCode: 'MENUID',
        // 叶子节点字段名称
        fcLeafCode: 'HASCHILD',
        // 根节点条件
        fcTopWhere: "PARENT is null or PARENT=''",
        // 展开条件
        fcExpWhere: "PARENT=':{MENUID}'",
        // 排序字段
        fcOrderby: "",
        // 模式 false为单选，true为多选
        fcMode: true,
        // 展开子节点
        fcOpenChild: false,
        // 是否显示线条
        fcShowLine: true,
        //是否可拖拽
        fcAllowDrag: true
      };
    }
   `
   // 树事件
   treejs : string = `
   treeSelectObj: any = {};
   treeOptions: TreeOptions = {
     //元数据id
     fcAppid: "SYSMENU",//元数据id
     //树结构节点显示内容
     fcLabel: ':{MENUNAME}::{MENUID}',//支持:{参数名称}
     // 关联父节点字段名称
     fcParentCode: 'PARENT',
     // 当前节点字段名称
     fcChildCode: 'MENUID',
     // 叶子节点字段名称
     fcLeafCode: 'HASCHILD',
     // 根节点条件
     fcTopWhere: "PARENT is null or PARENT=''",
     // 展开条件
     fcExpWhere: "PARENT=':{MENUID}'",
     // 排序字段
     fcOrderby: "",
     // 模式 false为单选，true为多选
     fcMode: true,
     // 展开子节点
     fcOpenChild: false,
     // 是否显示线条
     fcShowLine: true,
     //是否可拖拽
     fcAllowDrag: true
   };
   treeEvent(fc:FCEVENT){
    switch (event.eventName) {
      case 'click':
      this.mainService.providers.msgService.message("这是点击事件");
        break;
    }
   }
   ` 
  treeSelectObj: any = {};
  treeOptions: TreeOptions = {
    //元数据id
    fcAppid: "SYSMENU",//元数据id
    //树结构节点显示内容
    fcLabel: '#{MENUNAME}#:#{MENUID}#',//支持:{参数名称}
    // 关联父节点字段名称
    fcParentCode: 'PARENT',
    // 当前节点字段名称
    fcChildCode: 'MENUID',
    // 叶子节点字段名称
    fcLeafCode: 'HASCHILD',
     // 叶子节点值为”N“为末尾,HASCHILD 为Y 指是否有子节点
    fcLeafValue: 'Y',
    // 根节点条件
    fcTopWhere: "{or:[{parent:{IS:''}},{parent:{eq:''}}]}",
    // 展开条件
    fcExpWhere: "{PARENT:{eq:'#{MENUID}#'}}",
    // 排序字段
    fcOrderby: "",
    // 模式 false为单选，true为多选
    fcMode: true,
    // 展开子节点
    fcOpenChild: false,
    // 是否显示线条
    fcShowLine: true,
    //是否可拖拽
    fcAllowDrag: true,
    // 是否可选择
    fcCheckable:true,
    // 是否多选
    fcMutliple:true,
    // 是否异步加载数据
    fcAsync:true
  };
  constructor(public mainService: ComponentService) {
    super('FCTREE', mainService);
  }
}