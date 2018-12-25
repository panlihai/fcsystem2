import { ParentlistComponent, TreeOptions, FctreeComponent } from 'fccomponent2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FCEVENT } from 'fccomponent2/fc';
import { CommonService } from 'fccore2/common/common';
import { SyscompanyBusiness } from '../../../business/syscompany.business';
import CacheService from 'fccore2/common/cache';

@Component({
    selector: 'syscompanyrelation',
    templateUrl: './syscompanyrelation.component.html',
    styles: [`
    
  `]
})
export class SyscompanyrelationComponent extends ParentlistComponent {


    //树组件
    @ViewChild('xz_Tree')
    xz_tree: FctreeComponent;
    //行政單位樹配置
    xz_treeOptions: any;
    //单位行政维度（默認維度）  
    compabyDimObj: any;
    //失效时间
    sendDate: any;
    //数据库存的失效时间格式
    senDateToString: string;
    //行政树选中节点
    xz_selectedTreeObj: any;

    //树组件
    @ViewChild('wd_Tree')
    wd_tree: FctreeComponent;
    //维度單位樹配置   
    wd_treeOptions: any;
    //维度树选中节点
    wd_selectedTreeObj: any;
    //转移单位的单位ID
    transfer_companyID: string;

    //维度下拉框选择值
    selectedDim: string;

    //转移弹窗标识符
    token1: string = CommonService.guid();
    //撤销弹窗标识符
    token2: string = CommonService.guid();

    constructor() {
        super("SYSTEM", "SYSCOMPANY");
    }

    init(): void {
        //失效日期 
        this.sendDate = CommonService.getDateByTimetamp(CommonService.getTimestamp());
        //把日期格式化为字符串
        this.senDateToString = CommonService.dateFormat(this.sendDate, 'yyyyMMdd');
        this.initXZ_TreeData();
        this.initWD_TreeData();
    }

    getDefaultQuery() {
    }

    event(eventName: string, context: any): void {

    }




    //#region 行政樹功能 
    /**
     * 初始化行政維度單位樹
     */
    initXZ_TreeData() {
        //初始化树数据
        if (CacheService.getS("DefaultCompanyDim")) {
            this.compabyDimObj = CacheService.getS("DefaultCompanyDim");
            //待数据请求成功后，根据默认维度和默认时间加载树和列表
            this.xz_treeOptions = SyscompanyBusiness.cloneTreeObj(this.compabyDimObj["CODE"], this.senDateToString);
            // this.xz_treeOptions.fcCheckable = true;
            // this.xz_treeOptions.fcMode = true;
            // this.xz_treeOptions.fcMutliple = true;
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
                    CacheService.setS("DefaultCompanyDim", { CODE: companydimAny, NAME: _defaultDimName });
                    //待数据请求成功后，根据默认维度和默认时间加载树和列表
                    this.xz_treeOptions = SyscompanyBusiness.cloneTreeObj(companydimAny, this.senDateToString);
                    // this.xz_treeOptions.fcCheckable = true;
                    // this.xz_treeOptions.fcMode = true;
                    // this.xz_treeOptions.fcMutliple = true;
                }
            })
        }
    }

    /**
      * 初始化行政維度單位樹
      */
    initWD_TreeData() {
        //初始化树数据
        if (CacheService.getS("DefaultCompanyDim")) {
            var _stopFlag = false;
            var _firstDim: any;
            SyscompanyBusiness.getAllCompanyDim().subscribe(result => {
                if (result.CODE === '0') {
                    for (var index = 0; index < result.DATA.length; index++) {
                        if (!_stopFlag && result.DATA[index].SDIM_CODE != this.compabyDimObj.CODE) {
                            _firstDim = {
                                CODE: result.DATA[index].SDIM_CODE,
                                NAME: result.DATA[index].SDIM_NAME
                            };
                            this.selectedDim = _firstDim.CODE;


                            //TODO 每次进入该功能的，就会执行SyscompanySelectHigherdialogComponent的init方法
                            //而且会执行多次，最后一次所有的@input参数都是undefined，这个问题需要解决
                            CacheService.setS("higherCompanyDialogDim", this.selectedDim);

                            _stopFlag = true;
                        }
                    }
                    //待数据请求成功后，根据默认维度和默认时间加载树和列表
                    this.wd_treeOptions = SyscompanyBusiness.cloneTreeObj(_firstDim["CODE"], this.senDateToString);

                }
            });
            //待数据请求成功后，根据默认维度和默认时间加载树和列表
            this.wd_treeOptions = SyscompanyBusiness.cloneTreeObj(_firstDim["CODE"], this.senDateToString);
        }
        else {
            setTimeout(() => {
                this.initWD_TreeData();
            }, 200);
        }
    }


    /**
        * 事件处理
        * @param event 树发生的事件
        */
    treeEvent(event: FCEVENT) {
        switch (event.eventName) {
            case 'click'://离开节点
                //选中树节点的数据
                //选中树节点后关联列表,再次选中置空树节点
                this.xz_selectedTreeObj = event.param.node.origin.DATA;
                break;
            // case 'moveNode'://离开节点
            // case 'focus':
            //     break;
            case 'initialized'://初始化

                break;

        }
    }

    /**
         * 事件处理
         * @param event 树发生的事件
         */
    wd_treeEvent(event: FCEVENT) {
        switch (event.eventName) {
            case 'click':
                //选中树节点的数据
                this.wd_selectedTreeObj = event.param.node.origin.DATA;
                break;
            case 'initialized'://初始化

                break;

        }
    }
    /**
  * 选择时间切换树结构
  */
    changeSendDate(event: any) {
        //截至日期转为字符串
        this.senDateToString = CommonService.dateFormat(this.sendDate, 'yyyyMMdd');
        //克隆树对象刷新树
        this.xz_treeOptions = SyscompanyBusiness.cloneTreeObj(this.compabyDimObj.CODE, this.senDateToString);

        if (this.selectedDim)
            this.wd_treeOptions = SyscompanyBusiness.cloneTreeObj(this.selectedDim, this.senDateToString);

        //设置树的fcNodes为undefined数节点才能重新请求数据进行刷新
        // this.xz_tree.fcNodes = undefined;
        // this.wd_tree.fcNodes = undefined;

        //刷新结构后设置第一个节点为激活状态
        //this.xz_tree.setFirstActive();
    }

    //#endregion 行政樹功能 

    //#region 維度下拉框
    /**
        * 维度下拉框变更事件
        * @param event 树发生的事件
        */
    changeDim(event: any) {
        this.wd_tree.fcNodes = undefined;
        this.selectedDim = event.SDIM_CODE;
        this.wd_selectedTreeObj = null;
        this.wd_treeOptions = SyscompanyBusiness.cloneTreeObj(this.selectedDim, this.senDateToString);
    }

    //#endregion 維度下拉框

    //#region
    /**
    * 将所选行政单位添加到维度单位中
    * @param event 树发生的事件
    */
    addNewComp() {
        if (this.xz_selectedTreeObj == null) {
            SyscompanyBusiness.msgService.message("请选择行政单位！");
        } else {
            var relationObj = {
                ID: undefined,
                SBEGIN_DATE: CommonService.dateFormat(CommonService.getDateByTimetamp(CommonService.getMilliseconds()), 'yyyyMMdd'),//生效日期
                SEND_DATE: '20991231',//失效日期
                SDIM_CODE: this.selectedDim,//维度代码
                SORG_CODE: this.xz_selectedTreeObj.SCOMPANY_CODE,//组织机构代码
                SPARENT_CODE: this.wd_selectedTreeObj ? this.wd_selectedTreeObj.SCOMPANY_CODE : '',//上级组织机构代码
                SPARENT_PATH: '' + ':' + '',//上级组织机构路径  TODO
                NDISPLAYNO: 0,//TODO 
                SCRATOR: SyscompanyBusiness.userService.getUserInfo().USERCODE,//创建人
                SCREATE_TIME: CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd'),//创建时间
                ISLAST: 'Y'
            }
            SyscompanyBusiness.save_Comp_Dim_Relation(relationObj).subscribe((result) => {
                if ((result.length == 1 && result[0].CODE == '0') ||
                    ((result.length == 2 && result[0].CODE == '0' && result[1].CODE == '0'))) {
                    SyscompanyBusiness.msgService.message("保存成功！");
                }
                else
                    SyscompanyBusiness.msgService.message("保存失败！");
            });
            // var s = SyscompanyBusiness.save_Comp_Dim_Relation(relationObj);
            // if (s == '1') {
            //     SyscompanyBusiness.msgService.message("保存成功！");
            // } else
            //     SyscompanyBusiness.msgService.message("保存失败！");
            // });
        }
    }
    //#endregion

    detele() {

        //如果网格中有选中数据
        if (this.wd_selectedTreeObj && this.wd_selectedTreeObj !== null) {
            var that = this;
            CommonService.event("openConfirm", {
                title: '确认删除记录吗？',
                okFunc: function () {
                    var _relation_Id = that.wd_selectedTreeObj.RID;
                    SyscompanyBusiness.appService.deleteObject("SYSCOMPANYRELATION", _relation_Id).subscribe(result => {
                        if (result.CODE === '0') {
                            SyscompanyBusiness.msgService.success("删除成功！");
                        } else {
                            SyscompanyBusiness.msgService.error(result.MSG);
                        }
                    });
                    that.condition += " ";
                },
                cancelFunc: function () { }
            });
        } else {
            SyscompanyBusiness.msgService.warm("请选择要删除的记录!");
        }
    }

    /**
     * 转移按钮 
     */
    transfer() {
        if (this.wd_selectedTreeObj && this.wd_selectedTreeObj !== null) {

            //将选择行的ID传入转移页面
            this.transfer_companyID = this.wd_selectedTreeObj.RID;
            CommonService.event(this.token1 + '-opened', '', '');
        } else {
            SyscompanyBusiness.msgService.warm("请选择要调整的单位信息！");
        }
    }

}
