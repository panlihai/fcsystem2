import { Component, ViewChild } from '@angular/core';
import { ParentlistComponent, FctreeComponent, TreeOptions } from 'fccomponent2';
import { CommonService } from 'fccore2/common/common';
import { SyscompanyBusiness } from '../../business/syscompany.business';
import { FCEVENT } from 'fccomponent2/fc';
import CacheService from 'fccore2/common/cache';
import SystemBusiness from 'fccore2/classes/system.business';
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

    //单位数据集
    companyList: any[];
    //单位列
    companyFieldsList: any[];
    //转移
    token1: string = CommonService.guid();
    //撤销
    token2: string = CommonService.guid();
    //单位维度
    companydimAny: string;
    //失效时间
    sendDate: any;
    //数据库存的失效时间格式
    senDateToString: string;
    //树组件
    @ViewChild('tree')
    tree: FctreeComponent;
    //树选中id
    selectedCompanyId: string;
    // 树选中code
    selectedCompanyCode: string;
    // 所有节点数据
    fcNodes: any[] = [{ id: '', name: '正在加载中...' }];
    //树选中节点
    selectedTreeObj: any;
    listOptions: any;
    constructor() {
        super("SYSTEM", "SYSCOMPANY");
    }
    treeSelectObj: any = {};
    treeOptions: any;
    init(): void {
        //获取单位数据集
        SystemBusiness.appService.findWithQuery("SYSCOMPANY", {}).subscribe(result => {
            if (result.CODE === '0') {
                this.companyList = result.DATA;
            }
        })
        //获取单位的列
        this.companyFieldsList = SystemBusiness.appService.getListFieldsByAppid("SYSCOMPANY");
        //失效日期 
        this.sendDate = CommonService.getDateByTimetamp(CommonService.getTimestamp());
        //把日期格式化为字符串
        this.senDateToString = CommonService.dateFormat(this.sendDate, 'yyyyMMdd');
        //防止列表闪烁,列表初始化时默认为空数据
        let con: any = {
            WHERE: "{SPARENT_CODE:{eq:'-'}}"
        }
        this.condition = JSON.stringify(con);
        //初始化树结构和列表
        this.initOrgData();
        //初始化列表数据
        this.listOptions = SyscompanyBusiness.fclistdataOption;
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
                //调整,选择树或者列表的单条数据时都能修改，同时选中树和列表时，以列表选中的单条数据优先修改
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
                this.listCancel();
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
                this.listOneMovedown(context.param);
                break;
            case 'listOneSettop':
                //不在最顶部的才置顶
                this.listOneSettop(context.param);
                break;
            case 'listOneSetDown':
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
            case 'check':
                //选择多选框时
                break;
            case 'moveNode'://离开节点
            case 'focus':
                //选中树节点的数据
                //选中树节点后关联列表,再次选中置空树节点
                this.selectedTreeObj = event.param.node.data.DATA;
                this.checkTree(this.selectedTreeObj);
                break;
            case 'initialized'://初始化
                if (this.tree.fcTree.treeModel.roots && this.tree.fcTree.treeModel.roots.length !== 0) {
                    //如果树结构不为空时,初始化树结构和列表
                    let initData = this.tree.fcTree.treeModel.roots[0].data.DATA;
                    if (initData !== undefined) {
                        this.checkTree(initData);
                    }
                } else {
                    //如数结构数据为空时，置空列表数据
                    this.checkTree(null);
                }
                break;

        }
    }
    /**
     * 初始化组织机构数据
     */
    initOrgData() {
        //初始化树数据
        this.treeOptions = SyscompanyBusiness.companyTreeOptions;
        //请求单位维度的数据
        SyscompanyBusiness.getCompanyDim().subscribe(result => {
            if (result.CODE === '0') {
                //默认维度设置为Y的
                let dimDefaultIsY: any[] = [];
                //循环单位维度，设置为Y的添加到数据中
                result.DATA.forEach(item => {
                    if (item.BISDEFAULT === 'Y') {
                        dimDefaultIsY.push(item);
                        //只有一个默认维度的，取设置为Y的维度
                        if (dimDefaultIsY.length === 1) {
                            this.companydimAny = dimDefaultIsY[0].SDIM_CODE;
                        } else {
                            // 维度表里面没有默认维度或者默认维度不只一个的，取维度表的第一条数据作为默认维度
                            this.companydimAny = result.DATA[0].SDIM_CODE;;
                        }
                        //待数据请求成功后，根据默认维度和默认时间加载树和列表
                        SyscompanyBusiness.cloneTreeObj(this.companydimAny, this.senDateToString);
                    }
                });
            }
        })
    }
    /**
     * 选择不同的维度切换树结构
     * @param event 
     */
    changeCompanydim(event: any) {
        //单位维度
        this.companydimAny = event.SDIM_CODE;
        //克隆树对象
        SyscompanyBusiness.cloneTreeObj(this.companydimAny, this.senDateToString);
        this.tree.fcNodes = undefined;
        //默认选中第一个树节点
        // this.tree.setFirstActive();
    }
    /**
     * 选择时间切换树结构
     */
    changeSendDate(event: any) {
        //截至日期转为字符串
        this.senDateToString = CommonService.dateFormat(this.sendDate, 'yyyyMMdd');
        //克隆树对象刷新树
        SyscompanyBusiness.cloneTreeObj(this.companydimAny, this.senDateToString);
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
            let con: any = {
                WHERE: "SPARENT_CODE =" + "'" + data.SCOMPANY_CODE + "'" + ' ' + "AND SDIM_CODE=" + "'" + this.companydimAny + "'" + ' ' + " and SBEGIN_DATE <= " + this.senDateToString + ' ' + "AND SEND_DATE >=" + this.senDateToString,
                ORDER: 'NDISPLAYNO'
            }
            this.condition = JSON.stringify(con);
            //如果新增单位时，需要把选中的单位作为新增页面的父节点
            this.selectedCompanyCode = data.SCOMPANY_CODE;
            this.listWnd.fcReflesh();
        } else {
            //未选中树节点时，列表数据设置为空
            let con: any = {
                WHERE: "{SPARENT_CODE:{eq:'-'}}"
            }
            this.condition = JSON.stringify(con);
            this.listWnd.fcReflesh();
        }
    }
    /**
     * 设立单位
     */
    listSetting() {
        //树节点选中的当前单位为新增页面的父节点,新增页面根据带入的父节点、维度进行新增
        let param: any = {
            refresh: 'Y',
            parentCode: this.selectedCompanyCode, dimCode: this.companydimAny
        }
        this.navigate(this.getRouteUrl('Add'), param);
        // if (this.selectedCompanyCode !== undefined && this.selectedCompanyCode !== '') {
        //     this.navigate(this.getRouteUrl('Add'), param);
        // } else {
        //     //未选择数据时，提示用户
        //     SystemBusiness.msgService.error("请选择父节点！");
        // }
    }
    /**
     * 调整单位
     */
    listAdjust() {
        //列表选中id传入编辑页面
        this.navigate(this.getRouteUrl('Modify'), { ID: this.selectedObject.ID, RID: this.selectedObject.RID, refresh: 'Y', parentCode: this.selectedCompanyCode, dimCode: this.companydimAny });
        let companyData: any[];
        // //请求单位数据
        // SystemBusiness.appService.findWithQuery("SYSCOMPANY", {}).subscribe(result => {
        //     if (result.CODE === '0') {
        //         //单位数据
        //         companyData = result.DATA;
        //         //从列表中选中
        //         if (this.selectedObject && this.selectedObject !== null) {
        //             if (this.selectedObject.ID !== undefined && this.selectedObject.ID !== '') {
        //                 //把列表数据放入缓存
        //                 CacheService.setS(this.appId + "DATA", CommonService.cloneArray(companyData));
        //                 //列表选中id传入编辑页面
        //                 this.navigate(this.getRouteUrl('Modify'), { ID: this.selectedObject.ID, RID: this.selectedObject.RID, refresh: 'Y', parentCode: this.selectedCompanyCode, dimCode: this.companydimAny });
        //             }
        //         } else if (this.selectedTreeObj && this.selectedTreeObj !== null) {
        //             //从树结构中选中
        //             if (this.selectedTreeObj.ID !== undefined && this.selectedTreeObj.ID !== '') {
        //                 //把数据放到缓存,把数据，选中id传到修改页面
        //                 CacheService.setS(this.appId + "DATA", CommonService.cloneArray(companyData));
        //                 this.navigate(this.getRouteUrl('Modify'), { ID: this.selectedTreeObj.ID, RID: this.selectedTreeObj.RID, refresh: 'Y', parentCode: this.selectedCompanyCode, dimCode: this.companydimAny });
        //             }
        //         } else if (this.selectedObjects && this.selectedObjects.length > 1) {
        //             // 列表选中不只一条记录时，提示用户
        //             SystemBusiness.msgService.error("只能选择一条数据！");
        //             // 树结构和列表没有选中数据,提示用户
        //         } else if (this.selectedObjects === undefined && this.selectedTreeObj === null) {
        //             SystemBusiness.msgService.error("必须选择一条数据！");
        //         }
        //     }
        // })
    }
    /**
     * 转移
     */
    listTansfer() {
        CommonService.event(this.token2, '', '');
    }
    /**
     * 撤销
     */
    listCancel() {
        CommonService.event(this.token2, '', '');
        // this.confirm('是否确认撤销本单位？', () => {
        //     if (this.selectedObject && this.selectedObject !== null) {
        //         SyscompanyBusiness.cancelCompany(this.selectedObject).subscribe(result => {
        //             if (result.CODE === '0') {
        //                 SystemBusiness.msgService.message("单位撤销成功！");
        //             } else {
        //                 SystemBusiness.msgService.error("单位撤销失败！");
        //             }
        //         })
        //     } else if (this.selectedObjects.length > 1) {
        //         SystemBusiness.msgService.error("只能选择一条数据！");
        //     } else if (this.selectedObjects.length === 0) {
        //         SystemBusiness.msgService.error("必须选择一条数据！");
        //     }
        // }, () => { });
    }
    /**
     * 上移
     * @param param 排序的一条记录
     */
    listOneMoveup(param: any) {
        let tempItem = {};
        this.listWnd.fcRowData.filter(item => {
            if (item.RID == param.RID) {
                return true;
            } else {
                tempItem = item;
            }
        })
        SyscompanyBusiness.changeSortByAppid(param, tempItem, "RID", "SYSCOMPANYRELATION").subscribe(result => {
            if (result.CODE === '0') {
                SystemBusiness.msgService.message("上移成功！");
            } else {
                SystemBusiness.msgService.error("上移失败！");
            }
        });
        this.listWnd.fcReflesh();
    }
    /**
     * 下移
     * @param param 排序的一条记录
     */
    listOneMovedown(param: any) {
        let tempItem1 = {};
        this.listWnd.fcRowData.filter((item, index) => {
            if (this.listWnd[index + 1]) {
                tempItem1 = this.listWnd[index + 1];
            }
            if (item.RID == param.RID) {
                return true;
            }
        })
        //点击下移，下移一格，如在最底部，不能继续下移
        SyscompanyBusiness.changeSortByAppid(param, tempItem1, "RID", "SYSCOMPANY").subscribe(result => {
            if (result.CODE === '0') {
                SystemBusiness.msgService.message("下移成功！");
            } else {
                SystemBusiness.msgService.error("下移失败！");
            }
        });;
        this.listWnd.fcReflesh();
    }
    /**
     * 置顶
     * @param param 排序的一条记录
     */
    listOneSettop(param: any) {
        SyscompanyBusiness.changeSortByAppid(param, this.listWnd.fcRowData[0], "RID", "SYSCOMPANY").subscribe(result => {
            if (result.CODE === '0') {
                SystemBusiness.msgService.message("置顶成功！");
            } else {
                SystemBusiness.msgService.error("置顶失败！");
            }
        });;
        this.listWnd.fcReflesh();
    }
    /**
     * 置底
     * @param param 排序的一条记录
     */
    listOneSetDown(param: any) {
        //不在最底部的才能置底
        SyscompanyBusiness.changeSortByAppid(param, this.listWnd.fcRowData[this.listWnd.fcRowData.length - 1], "RID", "SYSCOMPANY").subscribe(result => {
            if (result.CODE === '0') {
                SystemBusiness.msgService.message("置底成功！");
            } else {
                SystemBusiness.msgService.error("置底失败！");
            }
        });;
        this.listWnd.fcReflesh();
    }
    /**
     * 刷新
     */
    listRefresh() {

    }
}
