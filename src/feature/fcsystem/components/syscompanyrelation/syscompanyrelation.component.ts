import { ParentlistComponent, TreeOptions, } from 'fccomponent2';
import { Component } from '@angular/core';
import { CommonService } from 'fccore2/common/common';
@Component({
    selector: 'syscompanyrelation',
    templateUrl: './syscompanyrelation.component.html',
    styles: [`
    
  `]
})
export class SyscompanyrelationComponent extends ParentlistComponent {
    //树配置
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
        fcCheckable: true,
        // 是否多选
        fcMutliple: true,
        // 是否异步加载数据
        fcAsync: true
    };
    //转移弹窗标识符
    token1: string = CommonService.guid();
    //撤销弹窗标识符
    token2: string = CommonService.guid();
    init(): void {
    } getDefaultQuery() {
    }
    event(eventName: string, context: any): void {
    }
    constructor() {
        super("SYSTEM", "SYSCOMPANY");
    }
    /**
     * 转移按钮
     */
    transfer() {
        CommonService.event(this.token1, '', '')
    }
    /**
     * 删除按钮
     */
    detele() {
        CommonService.event(this.token2, '', '')
    }
}
