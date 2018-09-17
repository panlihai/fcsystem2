import { Component, ViewChild } from '@angular/core';
import { ParentlistComponent, FctreeComponent } from 'fccomponent2';
import { FCEVENT } from 'fccomponent2/fc';
import { CommonService } from 'fccore2/common/common';
import SystemBusiness from 'fccore2/classes/system.business';
import { environment } from '../../../../environments/environment';
import SysdepartmentBusiness from '../../business/sysdepartment.business';
@Component({
  selector: 'sysdepartment',
  templateUrl: './sysdepartment.component.html',
  styles: [`
  :host ::ng-deep .treesearch-width .fc-date-default{
    width:100%;
  }
  :host ::ng-deep  .ant-calendar-picker{
    width:100%;
  }
    `]
})
export class SysdepartmentComponent extends ParentlistComponent {
  constructor() {
    super("SYSTEM", "SYSDEPARTMENT");
  }
  //部门维度
  departmentdimAny: string;
  //失效时间
  sendDate: any;
  //数据库存的失效时间格式
  senDateToString: string;
  @ViewChild('tree')
  tree: FctreeComponent;
  selectedDepartmentId: string;
  //下拉树选中对象
  treeSelectObj: any = {};
  //部门树的配置
  departmentTreeOptions: any;
  // 所有节点数据
  fcNodes: any[] = [{ id: '', name: '正在加载中...' }];
  //树条件
  treeCondition: string;
  //树选中节点
  selectedTreeId: string;
  //列表配置
  listOptions: any;
  //转移弹窗标识符
  token1: string = CommonService.guid();
  //撤销弹窗标识符
  token2: string = CommonService.guid();
  init(): void {
    //失效日期 
    this.sendDate = CommonService.getDateByTimetamp(CommonService.getTimestamp());
    //把日期格式化为字符串
    this.senDateToString = CommonService.dateFormat(this.sendDate, 'yyyyMMdd');
    //防止列表闪烁,列表初始化时默认为空数据
    this.treeCondition = '';
    //初始化树结构
    this.departmentTreeOptions = SysdepartmentBusiness.departmentTreeOptions;
    SystemBusiness.appService.findWithQuery("SYSTBVDEPTCURORG", {}).subscribe(result => {
      if (result.CODE === '0') {
        result.DATA.forEach(item => {
          //默认维度
          if (item.BISDEFAULT === 'Y') {
            this.departmentdimAny = item.SDIM_CODE;
            SysdepartmentBusiness.cloneTreeObj(this.departmentdimAny, this.senDateToString);
          }
        });
      }
    })
    //初始化列表
    this.listOptions = SysdepartmentBusiness.fclistdataOption
  }
  getDefaultQuery() {
  }
  listAdd() {

  }
  /**
   * 选择不同的维度切换树结构
   * @param event 
   */
  changeDepartmentdim(event: any) {
    this.departmentdimAny = event.SDIM_CODE;
    SysdepartmentBusiness.cloneTreeObj(this.departmentdimAny, this.senDateToString);
    this.tree.fcNodes = undefined;
  }
  /**
   * 选择时间切换树结构
   */
  changeSendDate(event: any) {
    this.senDateToString = CommonService.dateFormat(this.sendDate, 'yyyyMMdd');
    SysdepartmentBusiness.cloneTreeObj(this.departmentdimAny, this.senDateToString);
    this.tree.fcNodes = undefined;
  }
  event(eventName: string, context: any): void {
    switch (eventName) {
      case 'deptAdd'://设立

        CommonService.event('selectedMenu', {
          MENUID: 'SYSDEPARTMENT', ROUTER: 'sysdepartmentEdit',
          PID: environment.pid, MENUTYPE: 'INURL', MENUNAME: '设立部门', MENUICON: 'fc-icon-bgefficiency'
        });
        this.navigate(this.getRouteUrl('Edit'));
        break;
      case 'adjustDept'://调整
        if (this.selectedObject && this.selectedObject !== null) {
          if (this.selectedObject.ID !== undefined && this.selectedObject.ID !== '') {
            CommonService.event('selectedMenu', {
              ID: this.selectedObject.ID, MENUID: 'SYSDEPARTMENT', ROUTER: 'sysdepartmentModify',
              PID: environment.pid, MENUTYPE: 'INURL', MENUNAME: '部门调整', MENUICON: 'fc-icon-bgefficiency'
            });
          }
        } else {
          SystemBusiness.msgService.error("请选择一条数据！");
        }
        break;
      case 'updateDept'://刷新
        break;
      case 'delDept'://撤销
        break;
      case 'transferDept'://转移
        //  this.modal.open({
        //    title: '转移部门',
        //    // content: departmenttransferdialogComponent,
        //    onOk() { },
        //    onCancel() { },
        //    footer: false,
        //    componentParams: {
        //      options: {}
        //    }
        //  }).subscribe(obj => {

        //  });
        break;
      case 'sortDept'://排序下级
        //  this.modal.open({
        //    title: '部门排序',
        //    // content: departmentsortdialogComponent,
        //    onOk() { },
        //    onCancel() { },
        //    footer: false,
        //    componentParams: {
        //      options: {}
        //    }
        //  }).subscribe(obj => {

        //  });
        break;
    }
  }
  /**
  * 事件句柄处理
  * @param event 树发生的事件
  */
  treeEvent(event: FCEVENT) {
    switch (event.eventName) {
      case 'check':
        let data = event.param.node.data;
        this.condition = '{"ID":' + data.id + '}';
        this.listWnd.fcReflesh();
        break;
      case 'select'://选中节点
        this.selectedTreeId = event.param;
        break;
      case 'initialized'://初始化
        break;

    }
  }
  /**
   * 测试按钮事件
   */
  /**
  * 查看按钮
  */
  view() {
    this.navigate(this.getRouteUrl('View'));
  }
  /**
  * 新增按钮
  */
  add() {
    this.navigate(this.getRouteUrl('Add'));
  }
  /**
  * 修改按钮
  */
  edit() {
    this.navigate(this.getRouteUrl('Edit'));
  }
  /**
   * 转移按钮
   */
  transfer() {
    CommonService.event(this.token1, '', '')
  }
  /**
   * 撤销按钮
   */
  undo() {
    CommonService.event(this.token2, '', '')
  }
}
