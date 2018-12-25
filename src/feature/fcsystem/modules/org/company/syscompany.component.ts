import { Component, ViewChild } from '@angular/core';
import { CommonService } from 'fccore2/common/common';
import { SyscompanyBusiness } from '../../../business/syscompany.business';
import SystemBusiness from 'fccore2/classes/system.business';
import { ParentlistComponent, FctreeComponent } from 'fccomponent2';
import { FCEVENT } from 'fccomponent2/fc';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';
import CacheService from 'fccore2/common/cache';
@Component({
    selector: 'syscompany',
    templateUrl: './syscompany.component.html',
    styles: [`
    :host ::ng-deep .treesearch-width .fc-date-default{
        width:100%;
    }
    :host ::ng-deep  .ant-calendar-picker{
        width:100%;
    }
  `]
})
export class SyscompanyComponent extends ParentlistComponent {
    constructor() {
        super("SYSTEM", "SYSCOMPANY");
    }

    //单位数据集
    // companyList: any[];
    //单位列
    // companyFieldsList: any[];
    //转移
    token1: string = CommonService.guid();
    //撤销
    token2: string = CommonService.guid();
    //单位维度  
    companyDimObj: any;
    //失效时间
    sendDate: any;
    //数据库存的失效时间格式
    senDateToString: string;
    //树组件
    @ViewChild('tree')
    tree: FctreeComponent;
    //树选中id
    // selectedCompanyId: string;
    // 树选中code
    selectedCompanyObj: {};
    // 所有节点数据
    //fcNodes: any[] = [{ id: '', name: '正在加载中...' }];
    //树选中节点
    selectedTreeObj: any;
    listOptions: any;
    // treeSelectObj: any = {};
    treeOptions: any;
    //撤销单位的单位ID
    cancel_companyID: string;
    //转移单位的单位ID
    transfer_companyID: string;
    init(): void {
        this.companyDimObj = { CODE: '', NAME: '' };
        //获取单位数据集
        // SystemBusiness.appService.findWithQuery("SYSCOMPANY", {}).subscribe(result => {
        //     if (result.CODE === '0') {
        //         this.companyList = result.DATA;
        //     }
        // })
        //获取单位的列
        // this.companyFieldsList = SystemBusiness.appService.getListFieldsByAppid("SYSCOMPANY");
        //失效日期 
        this.sendDate = CommonService.getDateByTimetamp(CommonService.getTimestamp());
        //把日期格式化为字符串
        this.senDateToString = CommonService.dateFormat(this.sendDate, 'yyyyMMdd');

        //初始化列表配置
        this.listOptions = CommonService.cloneObj(SyscompanyBusiness.fclistdataOption);
        setTimeout(() => {
            //防止列表闪烁,列表初始化时默认为空数据
            let con: any = {
                WHERE: "{SPARENT_CODE:{eq:'-'}}"
            }
            this.condition = JSON.stringify(con);

        }, 200);

        //初始化树结构和列表
        this.initOrgData();
    }
    /**
     * 默认查询
     */
    getDefaultQuery() {

    }

    event(eventName: string, context: any): void {
        switch (eventName) {
            case 'listSetting':
                //设立单位,把维度,选择树的父节点带入到新增页面中
                this.listSetting();
                break;
            case 'listAdjust':
                //调整,优先判断网格内容是否选中
                this.listAdjust();
                break;
            case 'listRefresh':
                //刷新
                this.listRefresh();
                break;
            case 'listCancel':
                //撤销，把单位的停用标志设置为Y,同时把下级单位的的停用标志也设置为Y
                this.listCancel();
                break;
            case 'listTansfer':
                //转移,可以跨维度的转移，提交转移申请后，需要在单位审批表中审批才能转移
                this.listTansfer();
                break;
            case 'export':
                //导出,选中数据时导出选中的，未选中列表导出全部
                this.export(eventName);
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
     * 初始化组织机构数据
     */
    initOrgData() {
        //初始化树数据
        if (CacheService.getS("DefaultCompanyDim")) {
            this.companyDimObj = CacheService.getS("DefaultCompanyDim");

            //TODO 每次进入该功能的，就会执行SyscompanySelectHigherdialogComponent的init方法
            //而且会执行多次，最后一次所有的@input参数都是undefined，这个问题需要解决
            CacheService.setS("higherCompanyDialogDim", this.companyDimObj.CODE);


            //待数据请求成功后，根据默认维度和默认时间加载树和列表
            this.treeOptions = SyscompanyBusiness.cloneTreeObj(this.companyDimObj["CODE"], this.senDateToString);
            //初始化列表配置
            // this.listOptions = CommonService.cloneObj(SyscompanyBusiness.fclistdataOption);
            // this.checkTree(null);
            //如果树结构不为空时,初始化树结构和列表
            // setTimeout(() => {
            let initData = this.tree.fcNodes["0"].origin.DATA;//this.tree.fcTree.treeModel.roots[0].data.DATA;
            if (initData !== undefined) {
                this.checkTree(initData);
            }
            // }, 100);
        }
        else {
            var _defaultDimName: string;
            var companydimAny: string;
            //请求单位维度的数据
            SyscompanyBusiness.getAllCompanyDim().subscribe(result => {
                if (result.CODE === '0') {
                    //默认维度设置为Y的
                    let dimDefaultIsY: any[] = [];
                    //循环单位维度，设置为Y的添加到数据中
                    result.DATA.forEach(item => {
                        if (item.BISDEFAULT === 'Y') {
                            dimDefaultIsY.push(item);
                        }
                    });
                    //只有一个默认维度的，取设置为Y的维度
                    if (dimDefaultIsY.length === 1) {
                        companydimAny = dimDefaultIsY[0].SDIM_CODE;
                        _defaultDimName = dimDefaultIsY[0].SDIM_NAME;
                    } else {
                        // 维度表里面没有默认维度或者默认维度不只一个的，取维度表的第一条数据作为默认维度
                        companydimAny = result.DATA[0].SDIM_CODE;
                        _defaultDimName = result.DATA[0].SDIM_NAME;
                    }


                    //TODO 每次进入该功能的，就会执行SyscompanySelectHigherdialogComponent的init方法
                    //而且会执行多次，最后一次所有的@input参数都是undefined，这个问题需要解决
                    CacheService.setS("higherCompanyDialogDim", this.companyDimObj.CODE);

                    CacheService.setS("DefaultCompanyDim", { CODE: companydimAny, NAME: _defaultDimName });
                    //待数据请求成功后，根据默认维度和默认时间加载树和列表
                    this.treeOptions = SyscompanyBusiness.cloneTreeObj(companydimAny, this.senDateToString);

                    //如果树结构不为空时,初始化树结构和列表
                    // setTimeout(() => {
                    let initData = this.tree.fcNodes["0"].origin.DATA;
                    if (initData !== undefined) {
                        this.checkTree(initData);
                    }
                    // }, 1000);
                }
            })
        }
    }

    /**
     * 选择时间切换树结构
     */
    changeSendDate(event: any) {
        //截至日期转为字符串
        this.senDateToString = CommonService.dateFormat(this.sendDate, 'yyyyMMdd');
        //克隆树对象刷新树
        this.treeOptions = SyscompanyBusiness.cloneTreeObj(this.companyDimObj.CODE, this.senDateToString);
        //设置树的fcNodes为undefined数节点才能重新请求数据进行刷新
        this.tree.fcNodes = undefined;
        //刷新数结构后设置第一个节点为激活状态
        // this.tree.setFirstActive();
    }
    /**
     * 选中树节点
     * @param data 
     */
    checkTree(data: any) {
        //选中树节点的单位为右侧列表的父节点，父节点、维度、截止时间为右侧列表的限制条件，时间范围在生效日期和截止日期之间
        if (data !== null) {
            // let con: any = {
            //     WHERE: "SPARENT_CODE =" + "'" + data.SCOMPANY_CODE + "'" + ' ' + "AND SDIM_CODE=" + "'" + this.companydimAny + "'" + ' ' + " and SBEGIN_DATE <= '" + this.senDateToString + ''  ' + "AND SEND_DATE >='" + this.senDateToString+"'",
            //     ORDER: 'NDISPLAYNO'
            // } 
            //TODO  为了测试 都没有添加失效日期 有效日期
            // let con: any = {
            //     WHERE: "SPARENT_CODE =" + "'" + data.SCOMPANY_CODE + "'" + ' ' + "AND SDIM_CODE=" + "'" + this.companyDimObj.CODE + "' " + "AND REND_DATE >='" + this.senDateToString + "'",
            //     ORDER: 'NDISPLAYNO'
            // } 
            let con: any = {
                WHERE: "{SPARENT_CODE:{eq:'" + data.SCOMPANY_CODE + "'},SDIM_CODE:{eq:'" + this.companyDimObj.CODE + "'}}",
                ORDER: 'NDISPLAYNO'
            }
            this.condition = JSON.stringify(con);
            //如果新增单位时，需要把选中的单位作为新增页面的父节点
            this.selectedCompanyObj = {
                CODE: data.SCOMPANY_CODE,
                NAME: data.SCOMPANY_NAME
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
                }, 1000);
        }
    }
    /**
     * 设立单位
     */
    listSetting() {
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
                dimCode: CacheService.getS("DefaultCompanyDim").CODE,
                dimName: CacheService.getS("DefaultCompanyDim").NAME,
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
     * 调整单位
     */
    listAdjust() {
        //列表选中id传入编辑页面
        if (this.selectedObject && this.selectedObject.length > 0) {
            var _selectedObject = this.selectedObject[0];
            this.navigate(this.getRouteUrl('Edit'), { ID: _selectedObject.ID, refresh: 'Y' });
        } else
            if (this.selectedTreeObj) {
                var _id = this.selectedTreeObj.ID;
                this.navigate(this.getRouteUrl('Edit'), { ID: _id, refresh: 'Y' });
            }
            else {
                SyscompanyBusiness.msgService.warm("请选择要调整的单位信息！");
            }
    }
    /**
     * 转移
     */
    listTansfer() {
        if (this.selectedObject && this.selectedObject.length > 0) {
            //将选择行的ID传入转移页面
            this.transfer_companyID = this.selectedObject[0].RID;
            CacheService.setS("DefaultCompanySenDate", this.senDateToString);

            CommonService.event(this.token1 + '-opened', '', '');
        } else {
            SyscompanyBusiness.msgService.warm("请选择要调整的单位信息！");
        }
    }
    /**
     * 撤销
     */
    listCancel() {
        if (this.selectedObject && this.selectedObject.length > 0) {
            //将选择行的ID传入撤销页面
            this.cancel_companyID = this.selectedObject[0].ID;
            CommonService.event(this.token2 + '-opened', '', '');
        } else {
            SyscompanyBusiness.msgService.warm("请选择要调整的单位信息！");
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
            SyscompanyBusiness.appService.findWithQuery("SYSCOMPANYRELATION", { WHERE: "{ ID:{eq:'" + param.RID + "'}}" }).subscribe((result) => {
                if (result.CODE === '0' && result.DATA.length > 0) {
                    var _beforeObj = result.DATA[0];
                    //获取第二个对象
                    SyscompanyBusiness.appService.findWithQuery("SYSCOMPANYRELATION", { WHERE: "{ ID:{eq:'" + tempItem['RID'] + "'}}" }).subscribe((result) => {
                        if (result.CODE === '0' && result.DATA.length > 0) {
                            var _afterObj = result.DATA[0];
                            //调换顺序
                            _beforeObj["NDISPLAYNO"] = tempItem["NDISPLAYNO"];
                            _afterObj["NDISPLAYNO"] = param["NDISPLAYNO"];

                            SyscompanyBusiness.changeSortByAppid(_beforeObj, _afterObj, "RID", "SYSCOMPANYRELATION").subscribe((result) => {
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
            SyscompanyBusiness.appService.findWithQuery("SYSCOMPANYRELATION", { WHERE: "{ ID:{eq:'" + param.RID + "'}}" }).subscribe((result) => {
                if (result.CODE === '0' && result.DATA.length > 0) {
                    var _beforeObj = result.DATA[0];
                    //获取第二个对象
                    SyscompanyBusiness.appService.findWithQuery("SYSCOMPANYRELATION", { WHERE: "{ ID:{eq:'" + tempItem1['RID'] + "'}}" }).subscribe((result) => {
                        if (result.CODE === '0' && result.DATA.length > 0) {
                            var _afterObj = result.DATA[0];
                            //调换顺序
                            _beforeObj["NDISPLAYNO"] = tempItem1["NDISPLAYNO"];
                            _afterObj["NDISPLAYNO"] = param["NDISPLAYNO"];

                            SyscompanyBusiness.changeSortByAppid(_beforeObj, _afterObj, "RID", "SYSCOMPANYRELATION").subscribe((result) => {
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
            SyscompanyBusiness.appService.findWithQuery("SYSCOMPANYRELATION", { WHERE: "{ ID:{eq:'" + param.RID + "'}}" }).subscribe((result) => {
                if (result.CODE === '0' && result.DATA.length > 0) {
                    var _beforeObj = result.DATA[0];
                    _beforeObj['NDISPLAYNO'] = firstDataSortIndex - 1;
                    SyscompanyBusiness.changeSortByAppid(_beforeObj, null, "RID", "SYSCOMPANYRELATION").subscribe((result) => {
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

            SyscompanyBusiness.appService.findWithQuery("SYSCOMPANYRELATION", { WHERE: "{ ID:{eq:'" + param.RID + "'}}" }).subscribe((result) => {
                if (result.CODE === '0' && result.DATA.length > 0) {
                    var _beforeObj = result.DATA[0];
                    _beforeObj['NDISPLAYNO'] = lastDataSortIndex + 1;
                    SyscompanyBusiness.changeSortByAppid(_beforeObj, null, "RID", "SYSCOMPANYRELATION").subscribe((result) => {
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
     * 刷新
     */
    listRefresh() {
        this.listWnd.fcReflesh();
    }
}
