import { Component, ViewChild } from '@angular/core';
import { SysroleBusiness } from '../../business/sysrole.business';
import SystemBusiness from 'fccore2/classes/system.business';
import { CommonService } from 'fccore2/common/common';
import { FCEVENT } from '../../../fccomponent/fc';
@Component({
    selector: 'sysrole',
    templateUrl: 'sysrole.component.html',
    styles: [`
    .sys-auth{

    }
    :host ::ng-deep .sys-auth .fc-content1{
        height: 100%;
    }
    :host ::ng-deep .sys-auth .fc-content2{
        height: 100%;
    }
    .sys-auth .fc-content1{
        height:100%;
    }
    .left {
       
    }
    .fc-role-add{
        position: absolute;
        right: 5px;
        top: 5px;
        cursor: pointer;
    }
    :host ::ng-deep .left .fc-title{
        width: 100%;
        height: 47px;
        line-height: 47px;
        margin: 0;
    }
    .sys-auth-tab{
        height:100%;
        border-left: 1px solid #e8e8e8;
        position:relative;
        box-sizing:border-box;
    }
    :host ::ng-deep .sys-auth-tab .ant-tabs-bar{
        margin-bottom:5px;
    }
    :host ::ng-deep .sys-auth-tab .ant-tabs-content{
        height:calc(100% - 50px);
        position:relative;
    }
    :host ::ng-deep .sys-auth .text:after{
        top:-14px;
    }
    .sys-auth-adduser{
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 99;
    }
    .sys-auth-listdata{
        height:100%;
    }
    :host ::ng-deep .sysrole-auth .fc-content1,:host ::ng-deep .sysrole-auth .fc-content2{
        overflow:auto;
    }
    :host ::ng-deep .child-tab{
        height:100%;
    }
    :host ::ng-deep .child-tab .ant-tabs-content .ant-tabs-tabpane{
        width:100%; 
        height:100%;
    }
    :host ::ng-deep .child-tab .sysrole-auth-tree,:host ::ng-deep .child-tab .tree-node{
        height:100%;
    }
    :host ::ng-deep .child-tab .tree-node{
        overflow:auto;
    }
  `]
})
export class SysroleComponent extends ParentlistComponent {
    listdataOption: any = {
        //是否启用查询
        fcEnableSearch: false,
        //是否启用编辑
        fcEnableEdit: false,
        //皮肤默认为bootstrap风格
        fcClass: 'ag-theme-material',
        //每页显示条数
        fcPaginationPageSize: 10,
        //是否启用排序
        fcEnableSorting: true,
        //是否启用过滤
        fcEnableFilter: true,
        //是否自动设置表头大小
        fcEnableColResize: true,
        //是否显示工具栏
        fcShowToolPanel: false,
        //是否分页
        fcPagination: true,
        //是否显示分组
        fcRowGroupPanelShow: 'none',//'always',
        //是否启用状态栏
        fcEnableStatusBar: false,
        //是否启用区域选中
        fcEnableRangeSelection: true,
        //选中方式
        fcRowSelection: 'multiple',
        //是否启用操作列
        fcEnableAction: true,
        //选中有checkbox
        fcCheckboxSelection: true,
        //是否自动保存
        fcAutoSave: false
    };
    constructor() {
        super('SYSTEM', 'SYSROLE');
    }
    @ViewChild('menutree')
    menutree: FctreeComponent;
    //角色id
    selectedId: string;
    //左侧选中角色的ID
    selectedRoleId: string;
    //左侧选中角色的PID
    selectedRolePid: string;
    //左侧的选中对象
    selectedObject: any;
    menuTreeOptions: any;
    //选中角色的用户弹窗列表过滤条件
    userCondition: string = "{}";
    //选中角色的用户列表过滤条件
    roleUserCondition: any;
    // 选中的角色权限
    roleauthList: any[];
    //选中的角色用户
    roleuserList: any[];
    //列表条件
    listCondition: string;
    //弹窗唯一标识
    sysroleEditToken: string = CommonService.guid();
    //修改角色唯一标识
    sysroleModifyToken: string = CommonService.guid();
    // 所有节点数据
    fcNodes: any[] = [{ id: '0', name: '正在加载中...' }];
    // 工具栏按钮条件
    toolbarBtnCdc: string = '{"ALLOWTYPE":"AUTH"}';
    // 列表按钮条件
    listBtnCdc: string = '{"ALLOWTYPE":"AUTH"}';
    // 表单按钮条件
    formBtnCdc: string = '{"ALLOWTYPE":"AUTH"}';
    //主对象
    mainObj: any;
    //角色选中对象
    seletedRoleObj: any;
    //修改用户信息
    modifyRoleName: string;
    ngOnInit() {
        this.fcNodes = SysroleBusiness.getAllMenu();
    }
    /**
     * 初始化当前组件需要的数据
     * 初始状态默认选中第一个角色
     */
    init(): void {
        // 根据pid筛选出当前产品的所有角色并显示在左侧角色列表中
        let con1: any = {
            WHERE: "{PID:{eq:'" + SysroleBusiness.appService.moduleId + "'}}"
        }
        //默认取到当前产品的所有角色
        this.listCondition = JSON.stringify(con1);
        //根据pid获取当前所有的角色信息
        SysroleBusiness.getRole(SysroleBusiness.appService.moduleId).subscribe(result => {
            if (result.CODE === '0') {
                //获取第一个角色的roleid和pid
                this.selectedRoleId = result.DATA[0].ROLEID;
                this.selectedRolePid = result.DATA[0].PID;
                //左侧的list组件默认选中
                this.selectedId = result.DATA[0].ID;
                //角色选中对象
                this.seletedRoleObj = result.DATA[0];
                //初始化列表默认显示第一个角色的用户信息
                let con2: string = '{ and: [{ "ROLEID": "' + this.selectedRoleId + '" }, { "PID": "' + this.selectedRolePid + '" }] }';
                this.condition = con2;
                //根据角色id和产品的pid筛选出其他角色的用户（添加弹窗的内容）
                // let con3: any = {
                //     WHERE: '{ROLEID:{ne:"' + this.selectedRoleId + '"},PID:{eq:"' + this.selectedRolePid + '"}}'
                // }
                // this.userCondition = JSON.stringify(con3);
            }
        })
        this.menuTreeOptions = SysroleBusiness.menuTreeOptions;
    }
    getDefaultQuery() {

    }
    event(eventName: string, context: any): void {

    }
    /**
     * 点击工具栏新增事件
     * @param event 事件
     */
    listAdd(event: FCEVENT) {
        //置空新增角色弹窗的数据
        CommonService.event(this.sysroleEditToken + '-opened', {});
    }
    /**
     * 获取选中的角色信息
     * @param event 列表fclist事件句柄
     */
    listEvent(event: FCEVENT) {
        switch (event.eventName) {
            case 'loaded':
                if (event.param && event.param.length > 0) {
                    this.selectedObject = event.param[0];
                    SysroleBusiness.createUserConditionByRoleid(this.selectedObject.ROLEID);
                    this.getRoleAuth(true);
                }
                break;
            case 'select':
                //获取左侧选中角色的ID,选中高亮
                this.selectedId = event.param.ID;
                //获取左侧选中角色的PID
                this.selectedRolePid = event.param.PID;
                //修改角色信息
                this.seletedRoleObj = event.param;
                //根据角色的id和pid筛选出该角色的用户
                let con2: string = '{ and: [{ "ROLEID": "' + event.param.ROLEID + '" }, { "PID": "' + this.selectedRolePid + '" }]}';
                this.condition = con2;
                //根据角色id和产品的pid筛选出其他角色的用户
                let con3: string = '{ROLEID: { ne: "' + event.param.ROLEID + '" }, PID: { eq: "' + this.selectedRolePid + '" } }';
                // this.userCondition = con3;
                //获取用户权限
                // this.getRoleAuth(true);
                break;
            case 'listOneDelete':
                this.confirm("确认删除记录吗?", () => {
                    let mainObj = event.param;
                    //传where条件根据id删除数据
                    mainObj.WHERE = "{ID:{eq:'" + mainObj.ID + "'}}";
                    if (this.beforeDelete(mainObj)) {
                        SystemBusiness.appService.deleteObject("SYSROLE", mainObj.ID).subscribe(result => {
                            if (result.CODE === '0') {
                                this.afterDelete();
                                SystemBusiness.msgService.message('删除成功！');
                                //重新初始化list组件
                                if (this.listCondition) {
                                    if (this.listCondition.substring(this.listCondition.length - 1) === ' ') {
                                        this.listCondition = this.listCondition.replace(/(\s*$)/g, "");
                                    } else {
                                        this.listCondition = this.listCondition + " ";
                                    }
                                }
                            } else {
                                SystemBusiness.msgService.error('删除失败！');
                            }
                        });
                    }
                }, () => { });
                break;
            case 'listOneEdit':
                //角色对象
                this.seletedRoleObj = event.param;
                this.modifyRoleName = this.seletedRoleObj.ROLENAME;
                CommonService.event(this.sysroleModifyToken + '-opened', {});
                break;
        }
    }

    /**
     * @description 当前选中的角色获取此角色的所有权限
     * @param {是否点击后调用事件} isFirstLoad
     */
    getRoleAuth(isSelect?: boolean) {
        if (this.selectedObject && this.selectedObject.ROLEID) {
            let roleId = this.selectedObject.ROLEID;
            SysroleBusiness.getAuthByRoleid(roleId).subscribe(result => {
                if (result.CODE === '0') {
                    this.roleauthList = result.DATA;
                    if (isSelect) {
                        SysroleBusiness.getAuthMenu(this.menutree.fcTree.nzNodes, this.roleauthList);
                    }
                }
            })
        }
    }
    /**
     * @description 当前选中的角色获取此角色的所有用户
     * 
     */
    getRoleUser() {
        let roleId = this.selectedObject.ROLEID;
        SysroleBusiness.getUserByRoleid(roleId).subscribe(result => {
            if (result.CODE === '0') {
                this.roleuserList = result.DATA;
            }
        })
    }
    /**
    * 选中用户追加到当前选中的角色中，并保存到服务器
    * @param event 模态框列表事件句柄
    */
    modallistEvent(event: FCEVENT) {
        switch (event.eventName) {
            case 'success':
                //获取用户弹窗选中的数据
                let seletedUser: any[] = event.param;
                SysroleBusiness.saveRoleUser(seletedUser, this.seletedRoleObj.ROLEID).subscribe(result => {
                    if (result.CODE === '0') {
                        SystemBusiness.msgService.success("添加用户成功");
                        //刷新角色用户的列表
                        this.condition = ' ';
                        this.condition = '{ and: [{ "ROLEID": "' + this.seletedRoleObj.ROLEID + '" }, { "PID": "' + this.selectedRolePid + '" }] } ';
                    } else {
                        SystemBusiness.msgService.error("添加用户失败");
                    }
                });
                break;
        }
    }
    /**
     * 事件句柄处理
     * @param event 树发生的事件
     */
    menuTreeEvent(event: FCEVENT) {
        switch (event.eventName) {
            case 'check'://选中框
                let roleId = this.selectedObject.ROLEID;
                SysroleBusiness.postAuthToRole(roleId, event.param, this.roleauthList)
                    .subscribe(result => {
                        SystemBusiness.msgService.message('操作成功');
                        this.getRoleAuth(true);
                    });
                break;
            case 'select'://选中
                let data = event.param.data.DATA;
                if (data.MENUTYPE === 'APP') {
                    this.toolbarBtnCdc = '{"APPID":"' + data.APPID + '","BTNTYPE":"LIST","ALLOWTYPE":"AUTH"}';
                    this.listBtnCdc = '{"APPID":"' + data.APPID + '","BTNTYPE":"LISTONE","ALLOWTYPE":"AUTH"}';
                    this.formBtnCdc = '{"APPID":"' + data.APPID + '","BTNTYPE":"CARD","ALLOWTYPE":"AUTH"}';
                }
                break;
        }
    }
    /**
     * 修改角色弹窗事件
     * @param event 
     */
    modifySysroleEvent(event: FCEVENT) {
        switch (event.eventName) {
            case 'okFunc'://确定按钮
                SysroleBusiness.saveOrUpdateRole(this.seletedRoleObj).subscribe(result => {
                    if (result.CODE === '0') {
                        SystemBusiness.msgService.message("修改成功");
                        //重新初始化list组件
                        if (this.listCondition) {
                            this.listCondition = this.listCondition.replace(/(\s*$)/g, "") + " ";
                        }
                    } else {
                        SystemBusiness.msgService.error(result.MSG);
                    }
                })
                break;
            case 'cancelFunc'://取消按钮
                break;
        }
    }
}

