import { Component, ViewChild } from '@angular/core';
import { CommonService } from 'fccore2/common/common';
import SystemBusiness from 'fccore2/classes/system.business'; 
import { ParentlistComponent, FctreeComponent } from 'fccomponent2';
import { FCEVENT } from 'fccomponent2/fc'; 
import SysdepartmentBusiness from '../../../business/sysdepartment.business';
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
  //部门树的配置
  departmentTreeOptions: any;
  // 所有节点数据
  fcNodes: any[] = [{ id: '', name: '正在加载中...' }];
  //树条件
  treeCondition: string;
  //列表配置
  listOptions: any;
  //转移弹窗标识符
  token1: string = CommonService.guid();
  //撤销弹窗标识符
  token2: string = CommonService.guid();
  //树选中节点
  selectedTreeObj: any;
  // 树选中code
  selectedCompanyObj: {};
  //撤销单位的单位ID
  cancel_companyID: any ;
  //转移单位的单位ID
  transfer_companyID: any;
  init(): void {
    //失效日期 
    this.sendDate = CommonService.getDateByTimetamp(CommonService.getTimestamp());
    //把日期格式化为字符串
    this.senDateToString = CommonService.dateFormat(this.sendDate, 'yyyyMMdd');
    //防止列表闪烁,列表初始化时默认为空数据
    this.treeCondition = '';
    //初始化树结构
    this.departmentTreeOptions = SysdepartmentBusiness.departmentTreeOptions;
    // SystemBusiness.appService.findWithQuery("SYSTBVDEPTCURORG", {}).subscribe(result => {
    //   if (result.CODE === '0') {
    //     result.DATA.forEach(item => {
    //       //默认维度
    //       // if (item.BISDEFAULT === 'Y') {
    //          this.departmentdimAny = item.SDIM_CODE;
    //       // }
    //     });


    //   }
    // })
    SysdepartmentBusiness.cloneTreeObj(this.senDateToString);
    //初始化列表
    this.listOptions = SysdepartmentBusiness.fclistdataOption;
    setTimeout(() => {
      this.checkTree(null);
    }, 200);
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
    SysdepartmentBusiness.cloneTreeObj(this.senDateToString);
    this.tree.fcNodes = undefined;
  }
  /**
   * 选择时间切换树结构
   */
  // changeSendDate(event: any) {
  //   this.senDateToString = CommonService.dateFormat(this.sendDate, 'yyyyMMdd');
  //   SysdepartmentBusiness.cloneTreeObj(this.senDateToString);
  //   this.tree.fcNodes = undefined;
  // }
  /**
    * 选择时间切换树结构
    */
  changeSendDate(event: any) {
    //截至日期转为字符串
    this.senDateToString = CommonService.dateFormat(this.sendDate, 'yyyyMMdd');
    //克隆树对象刷新树
    this.departmentTreeOptions = SysdepartmentBusiness.cloneTreeObj(this.senDateToString);
    //设置树的fcNodes为undefined数节点才能重新请求数据进行刷新
    this.fcNodes = undefined;
    //刷新数结构后设置第一个节点为激活状态
    // this.tree.setFirstActive();
  }


  event(eventName: string, context: any): void {
    switch (eventName) {
      case 'deptAdd'://设立
        this.deptAdd();
        break;
      case 'adjustDept'://调整
        // if (this.selectedObject && this.selectedObject !== null) {
        //   if (this.selectedObject.ID !== undefined && this.selectedObject.ID !== '') {
        //     CommonService.event('selectedMenu', {
        //       ID: this.selectedObject.ID, MENUID: 'SYSDEPARTMENT', ROUTER: 'sysdepartmentModify',
        //       PID: FCCONFIG.pid, MENUTYPE: 'INURL', MENUNAME: '部门调整', MENUICON: 'fc-icon-bgefficiency'
        //     });
        //   }
        // } else {
        //   SystemBusiness.msgService.error("请选择一条数据！");
        // }
        //列表选中id传入编辑页面
        this.adjustDept();
        // if (this.selectedObject && this.selectedObject.length > 0) {
        //   var _selectedObject = this.selectedObject[0];
        //   this.navigate(this.getRouteUrl('Edit'), { ID: _selectedObject.ID, refresh: 'Y' });
        // } else
        //   if (this.selectedTreeObj) {
        //     var _id = this.selectedTreeObj.ID;
        //     this.navigate(this.getRouteUrl('Edit'), { ID: _id, refresh: 'Y' });
        //   }
        //   else {
        //     SysdepartmentBusiness.msgService.warm("请选择要调整的单位信息！");
        //   }
        break;
      case 'updateDept'://刷新
        break;
      case 'delDept'://撤销
        this.delDept();
        break;
      case 'transferDept'://转移
        this.transferDept()
        break;
      case 'sortDept'://排序下级
        break;
      case 'listOneMoveup':
        //点击上移，上移一格,如在最顶部，不能继续上移
        this.listOneMoveup(context.param);
        break;
      case 'listOneMovedown':
        //点击下移，下移一格,如在底顶部，不能继续下移
        this.listOneMovedown(context.param);
        break;
      case 'listOneSettop':
        //不在最顶部的才置顶
        this.listOneSettop(context.param);
        break;
      case 'listOneSetDown':
        //不在最底部的才置底
        this.listOneSetDown(context.param);
        break;
    }
  }
  adjustDept(){
     //列表选中id传入编辑页面
     if (this.selectedObject && this.selectedObject.length > 0) {
      var _selectedObject = this.selectedObject[0];
      this.navigate(this.getRouteUrl('Edit'), { ID: _selectedObject.ID, refresh: 'Y' });
  } else
      if (this.selectedTreeObj) {
          var _id= this.selectedTreeObj.ID;
          this.navigate(this.getRouteUrl('Edit'), { ID:_id, refresh: 'Y' });
      }
      else {
          SysdepartmentBusiness.msgService.warm("请选择要调整的单位信息！");
      }
  }
  /**
   * 事件处理
   * @param event 树发生的事件
   */
  treeEvent(event: FCEVENT) {
    switch (event.eventName) {
      // case 'check':
      //     //选择多选框时
      //     break;
      case 'click'://离开节点
        //选中树节点的数据
        //选中树节点后关联列表,再次选中置空树节点
        this.selectedTreeObj = event.param.node.origin.DATA;
        this.checkTree(this.selectedTreeObj);
        break;
      // case 'moveNode'://离开节点
      // case 'focus':
      //     break;
      case 'initialized'://初始化
        if (this.tree.fcTree.treeModel.roots && this.tree.fcTree.treeModel.roots.length !== 0) {
          //如果树结构不为空时,初始化树结构和列表
          let initData = this.tree.fcTree.treeModel.roots[0].data.DATA;
          if (initData !== undefined) {
            // this.checkTree(initData);
          }
        } else {
          //如数结构数据为空时，置空列表数据
          // this.checkTree(null);
        }
        break;

    }
  }
  /**
     * 设立单位
     */
    deptAdd() {
    //树节点选中的当前单位为新增页面的父节点,新增页面根据带入的父节点、维度进行新增
    if (this.selectedCompanyObj !== undefined && this.selectedCompanyObj["CODE"] !== '') {
      //获取新单位的排序号
      var _displayNo = 1;
      if (this.listWnd.fcRowData.length > 0)
        _displayNo = this.listWnd.fcRowData[this.listWnd.fcRowData.length - 1]["NDISPLAYNO"];
      let param: any = {
        refresh: 'Y',
        parentCode: this.selectedCompanyObj["CODE"],
        parentName: this.selectedCompanyObj["NAME"],
        displayNo: _displayNo
      }
      this.navigate(this.getRouteUrl('Add'), param);
    }
    else {
      //未选择数据时，提示用户
      SystemBusiness.msgService.error("请选择父节点！");
    }
  }
  /**
   * 转移封装方法
   */
  transferDept() {
    if (this.selectedObject && this.selectedObject.length > 0) {
      //将选择行的ID传入转移页面
      this.transfer_companyID = this.selectedObject[0].SDEPT_CODE;
      CommonService.event(this.token1+ '-opened', '', '');
    } else {
      SysdepartmentBusiness.msgService.warm("请选择要调整的单位信息！");
    }
  }
  /**
   * 撤销封装方法
   */
  delDept() {
    if (this.selectedObject && this.selectedObject.length > 0) {
      this.cancel_companyID = this.selectedObject[0].ID;
      CommonService.event(this.token2+ '-opened', 'sdaf', 'dddd');
    } else {
      SysdepartmentBusiness.msgService.warm("请选择要调整的单位信息！");
    }
  }
  /**
    * 选中树节点
    * @param data 
    */
  checkTree(data: any) {
    //选中树节点的单位为右侧列表的父节点，父节点、维度、截止时间为右侧列表的限制条件，时间范围在生效日期和截止日期之间
    if (data !== null) {
      let con: any = {
        WHERE: "{SPARENT_CODE:{eq:'" + data.SDEPT_CODE + "'}}",
        ORDER: 'NDISPLAYNO'
      }
      this.condition = JSON.stringify(con);
      //如果新增单位时，需要把选中的单位作为新增页面的父节点
      this.selectedCompanyObj = {
        CODE: data.SDEPT_CODE,
        NAME: data.SDEPT_NAME
      };
      this.listWnd.fcReflesh();
    } else {
      //未选中树节点时，列表数据设置为空
      let con: any = {
        WHERE: "{SPARENT_CODE:{eq:'-'}}"
      }
      this.condition = JSON.stringify(con);
      //调试时发现，界面加载第一次调用该方法的时候  this.listWnd是undefined，所以修改为下面逻辑
      if (this.listWnd)
        this.listWnd.fcReflesh();
      else
        setTimeout(() => {
          this.listWnd.fcReflesh();
        }, 100);
    }
  }
  /**
   * 上移
   * @param param 排序的一条记录
   */
  listOneMoveup(param: any) {
    if (param.RID == this.listWnd.fcRowData[0].RID) {
      SystemBusiness.msgService.warm("所选数据已是第一行！");
    } else {
      let tempItem = {};
      var _stopFlag = false;
      this.listWnd.fcRowData.filter(item => {
        if (item.RID == param.RID) {
          _stopFlag = true;
          return true;//发现这个return无法跳出filter循环 TODP
        } else {
          if (!_stopFlag)
            tempItem = item;
        }
      });
      //获取第一个对象
      SysdepartmentBusiness.appService.findWithQuery("SYSDEPARTMENTRELATION", { WHERE: "{ ID:{eq:'" + param.RID + "'}}" }).subscribe((result) => {
        if (result.CODE === '0' && result.DATA.length > 0) {
          var _beforeObj = result.DATA[0];
          //获取第二个对象
          SysdepartmentBusiness.appService.findWithQuery("SYSDEPARTMENTRELATION", { WHERE: "{ ID:{eq:'" + tempItem['RID'] + "'}}" }).subscribe((result) => {
            if (result.CODE === '0' && result.DATA.length > 0) {
              var _afterObj = result.DATA[0];
              //调换顺序
              _beforeObj["NDISPLAYNO"] = tempItem["NDISPLAYNO"];
              _afterObj["NDISPLAYNO"] = param["NDISPLAYNO"];

              SysdepartmentBusiness.changeSortByAppid(_beforeObj, _afterObj, "RID", "SYSDEPARTMENTRELATION").subscribe((result) => {
                if (result[0].CODE === '0' && result[1].CODE === '0') {
                  SystemBusiness.msgService.message("上移成功！");
                  this.listWnd.fcReflesh();
                } else {
                  SystemBusiness.msgService.error("上移失败！");
                }
              });
            }
          })
        }
      })
    }
  }
  /**
     * 下移
     * @param param 排序的一条记录
     */
  listOneMovedown(param: any) {
    if (param.RID == this.listWnd.fcRowData[this.listWnd.fcRowData.length - 1].RID) {
      SystemBusiness.msgService.warm("所选数据已是最后一行！");
    } else {
      let tempItem1 = {};
      this.listWnd.fcRowData.filter((item, index) => {
        if (item.RID == param.RID) {
          if (this.listWnd.fcRowData[index + 1]) {
            tempItem1 = this.listWnd.fcRowData[index + 1];
          }
          return true;
        }
      })
      //调换顺序
      //获取第一个对象
      SysdepartmentBusiness.appService.findWithQuery("SYSDEPARTMENTRELATION", { WHERE: "{ ID:{eq:'" + param.RID + "'}}" }).subscribe((result) => {
        if (result.CODE === '0' && result.DATA.length > 0) {
          var _beforeObj = result.DATA[0];
          //获取第二个对象
          SysdepartmentBusiness.appService.findWithQuery("SYSDEPARTMENTRELATION", { WHERE: "{ ID:{eq:'" + tempItem1['RID'] + "'}}" }).subscribe((result) => {
            if (result.CODE === '0' && result.DATA.length > 0) {
              var _afterObj = result.DATA[0];
              //调换顺序
              _beforeObj["NDISPLAYNO"] = tempItem1["NDISPLAYNO"];
              _afterObj["NDISPLAYNO"] = param["NDISPLAYNO"];

              SysdepartmentBusiness.changeSortByAppid(_beforeObj, _afterObj, "RID", "SYSDEPARTMENTRELATION").subscribe((result) => {
                if (result[0].CODE === '0' && result[1].CODE === '0') {
                  SystemBusiness.msgService.message("下移成功！");
                  this.listWnd.fcReflesh();
                } else {
                  SystemBusiness.msgService.error("下移失败！");
                }
              });
            }
          })
        }
      })
    }
  }
  /**
  * 置顶
  * @param param 排序的一条记录
  */
  listOneSettop(param: any) {
    //方案一 将置顶的记录排序索引设置为0，其他列都-1
    //方案二 其他列不动，将置顶的记录排序索引设置为第一列索引-1 问题： 会出现负数，不知道平台支不支持
    //目前采用方案二 
    if (param.RID == this.listWnd.fcRowData[0].RID) {
      SystemBusiness.msgService.warm("所选数据已是第一行！");
    } else {
      var firstDataSortIndex = this.listWnd.fcRowData[0].NDISPLAYNO;
      SysdepartmentBusiness.appService.findWithQuery("SYSDEPARTMENTRELATION", { WHERE: "{ ID:{eq:'" + param.RID + "'}}" }).subscribe((result) => {
        if (result.CODE === '0' && result.DATA.length > 0) {
          var _beforeObj = result.DATA[0];
          _beforeObj['NDISPLAYNO'] = firstDataSortIndex - 1;
          SysdepartmentBusiness.changeSortByAppid(_beforeObj, null, "RID", "SYSDEPARTMENTRELATION").subscribe((result) => {
            if (result.CODE === '0') {
              SystemBusiness.msgService.message("置顶成功！");
              this.listWnd.fcReflesh();
            } else {
              SystemBusiness.msgService.error("置顶失败！");
            }
          });
        }
      });
    }
  }
  /**
      * 置底
      * @param param 排序的一条记录
      */
  listOneSetDown(param: any) {
    if (param.RID == this.listWnd.fcRowData[this.listWnd.fcRowData.length - 1].RID) {
      SystemBusiness.msgService.warm("所选数据已是最后一行！");
    } else {
      //方案其他列不动，将置底的记录排序索引设置为第一列索引+ 1  
      var lastDataSortIndex = this.listWnd.fcRowData[this.listWnd.fcRowData.length - 1].NDISPLAYNO;

      SysdepartmentBusiness.appService.findWithQuery("SYSDEPARTMENTRELATION", { WHERE: "{ ID:{eq:'" + param.RID + "'}}" }).subscribe((result) => {
        if (result.CODE === '0' && result.DATA.length > 0) {
          var _beforeObj = result.DATA[0];
          _beforeObj['NDISPLAYNO'] = lastDataSortIndex + 1;
          SysdepartmentBusiness.changeSortByAppid(_beforeObj, null, "RID", "SYSDEPARTMENTRELATION").subscribe((result) => {
            if (result.CODE === '0') {
              SystemBusiness.msgService.message("置底成功！");
              this.listWnd.fcReflesh();
            } else {
              SystemBusiness.msgService.error("置底失败！");
            }
          });
        }
      });
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
}
