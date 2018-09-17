import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import { SysappBusiness } from '../../business/sysapp.business';
import { SysmenuBusiness } from '../../business/sysmenu.business';
import SystemBusiness from 'fccore2/classes/system.business';
import { Sysmenu } from 'fccore2/common/beanclass';
import { FCEVENT } from 'fccomponent2/fc';
@Component({
    selector: 'sysmenu',
    templateUrl: './sysmenu.component.html',
    styles: [`
.sys-menus {
    overflow: hidden;
}
.sysmenu{
    font-size: 20px;
    color: #333;
}
.clearFloat{
    overflow:hidden;
    position: relative;
    margin-bottom: 20px;
    width:100%;
}
.floatLeft{
    float:left;
    margin-left:50px;
    padding-bottom: 60px;
    margin-bottom: 10px;
    width:28%;
}
.sysmenu-first{
    float: left;
    position: relative;
    width: 28%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 18px;
    padding-left: 20px;
}
.levelLine-1{
    color: #FFE566;
    position: absolute;
    right: 50px;
    font-size: 22px;
}
.levelLine-2{
    color: #FFA573;
    position: absolute;
    right: 50px;
    font-size: 22px;
}
.syssecondMenu{
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding-left: 20px;
    background-color: #fff;
    margin-bottom: 10px;
}
.anticon {
    color:#ccc;
}
.menutype-app{
    background-color: #49a9ee;
    color:white;
    border: 1px solid transparent;
    border-radius:3px;
}
.sys-menus div{
    width: 100px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    width: 150px;
    float: left;
    font-weight: bold;
}
.secondMenu {
    margin-left: 68px;
}
.dragAreafirst{
    position: absolute;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 2px dashed #eee;
    border-radius: 3px;
    width: 28%;
}
.funcStyle{
    background-color: #49a9ee;
    border: 1px solid #49a9ee;
}
.dragAreasecondSL{
    position: absolute;
    width: 28%;
    height: 40px;
    line-height: 40px;
    border: 2px dashed #eee;
    border-radius: 3px;
}
.dragsecondMenuNL{
    position: absolute;
    width: 28%;
    height: 40px;
    line-height: 40px;
    border: 2px dashed #eee;
    border-radius: 3px;
    top: 0px;
    left: 400px;
}
.openIcon{
    float: left;
    position: absolute;
    top: -1px;
    left: 105%;
    cursor: pointer;
}
.secondopenIcon{
    float:left;
    margin-left:18px; 
    position: absolute;
    left:115px;
    top:0px;
    cursor: pointer;
}
.openMenu{
    display: block;
}
.closeIcon{
    float: left;
    position: absolute;
    left: 105%;
    top: -1px;
    cursor: pointer;
}
.secondcloseIcon{
    float:left;
    margin-left:18px;
    position: absolute;
    left:115px;
    top:0px;
    cursor: pointer;
}
.showIcon{
    display: block;  
}
.dragArea{
    position: fixed;
    width:20%;
}
.menuButton{
    margin-top: 20px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ccc;
    color: #1890ff;
    border-radius: 3px;
    font-size: 18px;
    padding-left: 5%;
}
.menuButtonLine{
    color: #eee;
    display: inline-block;
    float: right;
    margin-right: 50px;
}
.functionMenu{
    width:100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ccc;
    color: #1890ff;
    border-radius: 3px;
    font-size: 18px;
    padding-left: 5%;
    cursor:move;
}
.spanFont{
    font-size:18px; 
}
.functionMenuLine{
    color: #eee;
    display: inline-block;
    float: right;
    margin-right: 50px;
}
.anticon{
    font-size:14px;
}
:host ::ng-deep .functionMenu .ant-btn{
    width:150px;
    height:30px;
    background-color: #49a9ee;
    border: 1px solid #49a9ee;
}
.thirdMenutext {
    margin-left: 60px;
}
.thirdMenu{
    float: left;
    background-color: #49a9ee;
    color: white;
    border-radius: 3px;
    left: 210px;
    position: absolute;
    top: 0px;
    width: 150px;
}
.sys-fast-list {
    width: 100%;
}
.selectProduct {
    width: 371px;
    float:right;
    margin-right: 20px;
}
:host ::ng-deep .navMenu .fc-layoutcol {
    background-color: #fff;
    border-radius: 4px;
    height: 100%;
    ackground: #fff;
    overflow: auto;
    padding-bottom: 60px;
    padding-left: 20px;
}
:host ::ng-deep .showLine .fc-content1{
    border-right:1px solid  #CBCBCC;
    padding:20px 20px 80px 20px;
    position: relative;
}
:host ::ng-deep .navMenu .fc-content2{
    padding:20px 2%;
}
ul.menuZone {
    position: absolute;
    right: 20px;
    list-style:none;
}
.menuZone>li {
    float: left;
    margin-right: 20px;
}
.levelnav{
    width: 16px;
    height: 9px;
    display: inline-block;
    margin-right: 10px;
}
.firstMenu{
    margin-top:37px;
    border-right:1px solid #ccc;
}
.levelnav-1 {
    background-color:#FFE566;
}
.levelnav-2 {
    background-color:#FF6E1E;
}
.levelnav-3 {
    background-color:#314161;
}
.levelnav-4 {
    background-color:#EEEEEE;
}
.selectProduct fc-combo {
    width: 100%;
}
.arrow .anticon-arrow-up {
    position: absolute;
    top: 1px;
    right: 20px;
    color: #9e9999;
    cursor:pointer;
}
.arrow .anticon:hover {
    cursor: pointer;
    color: #1890ff;
}
.arrow .anticon-arrow-down {
    position: absolute;
    right: 20px;
    bottom: 3px;
    color: #9e9999;
    cursor:pointer;
}
:host ::ng-deep .edit i.icon.iconfont.fc-icon-amend.fc-icon-default {
    font-size: 12px;
    cursor:pointer;
    margin-left:5px;
}
:host ::ng-deep .delete i{
    font-size:12px;
    cursor:pointer;
}
  `]
})
export class SysmenuComponent extends ParentlistComponent {
    //产品数据集
    productList: any[];
    //菜单
    sysmenus: any[] = [];
    //pid
    pid: string;
    //没有任何内容
    noResult: boolean;
    //新增加的功能
    addFunction: string;
    //新增加的菜单
    addMenu: string;
    //弹窗里面的对象
    dialogObj:any;
    /**
    * 初始化模型，产品对应的内容
    */
    constructor() {
        super('SYSTEM', 'SYSMENU');
    }
    init(): void {
    }
    ngOnInit(): void {
        this.sysmenus = [];
        //产品下拉
        this.findProduct();
    }
    getDefaultQuery(): void {
    }
    event(eventName: string, context: any): void {
    }
    /**
    * 查询产品信息
    */
    findProduct(): void {
        //产品下拉
        SystemBusiness.appService.findWithQuery("SYSPRODUCT", {}).subscribe(result => {
            if (result.CODE === '0') {
                this.productList = result.DATA;
            }
        });
    }
    /**
     * 获取菜单
     * @param pid
     */
    getMenu(pid:string): void {
        this.sysmenus = [];
        SysmenuBusiness.getMenu().subscribe((result: any[]) => {
            result.filter(item => item.PID === pid).forEach(item => {
                //一级菜单
                this.sysmenus = this.sysmenus.concat(item.P_CHILDMENUS);
                this.sysmenus.forEach(element => {
                    //默认一级菜单是闭合状态
                    element.isOpened = false;
                })
            })
        })
    }
    /**
     *  根据产品查询模型
     * @param item 
     */
    searchByPid(item: any): void {
        if (this.searchObj.PID === item.PID) {
            delete this.searchObj.PID;
        } else {
            this.searchObj.PID = item.PID;
        }
        this.search();
        this.getMenu(item.PID);
    }
    /**
    * 展开菜单
    * @param sysmenu 
    */
    open(sysmenu:any,event:MouseEvent): void {
        event.stopPropagation();
        sysmenu.isOpened = true;
    }
    /**
    * 收缩菜单
    * @param sysmenu
    */
    close(sysmenu:any,event:MouseEvent): void {
        event.stopPropagation();
        sysmenu.isOpened = false;
    }
    /**
    * 两个菜单对象交换排序
    * @param menu1 交互对象1
    * @param menu2 交互对象2
    * @param index 对应索引
    * @param menus 
    */
    changeSort(menu1: Sysmenu, menu2: Sysmenu, index: number, menus:any): void {
        SysmenuBusiness.changeSort(menu1, menu2, index, menus).subscribe(result => {
            if (result.CODE === '0') {
                SysmenuBusiness.msgService.success("交换成功");
            }
        })
    }
    /**
    * 打开导航编辑弹窗
    * @param sysmenu 点击的菜单
    */
    openMenuDialog(sysmenu: any): void {
        if (sysmenu !== null) { 
            this.dialogObj = Object.assign({}, sysmenu);
        }
    }
    /**
   * 弹窗事件
   * @param event 
   */
    modalEvent(event: FCEVENT): void {
        switch (event.eventName) {
            case 'okFunc'://确认
                SysmenuBusiness.msgService.message("弹窗确认事件");
                break;
            case 'cancelFunc'://取消
                SysmenuBusiness.msgService.message("弹窗取消事件");
                break;
        }
    }
    /**
    * dragstart规定当元素被拖动时，会发生什么。drag规定了被拖动的数据
    * @param ev 
    * @param obj 拖拽的对象
    */
    dragstart(ev, obj: any): void {
        ev.dataTransfer.effectAllowed = "copy";
        //存入数据
        ev.dataTransfer.setData("Text", ev.target.id);
    }
    /**
     * 将菜单和功能拖拽到一级菜单
     */
    dragoverFirst(ev): void {//拖拽目标身上的效果
        ev.preventDefault();
        // Set the dropEffect to move
        ev.dataTransfer.dropEffect = "copy"
    }
    /**
     * 当放置被拖数据时，会发生 drop 事件。
     * @param ev 
     */
    dropFirst(ev): void {
        ev.preventDefault();
        //获取目标id并新增dom
        let data = ev.dataTransfer.getData("Text");
        let a = ev.dataTransfer.getData("Text");
        SysappBusiness.logService.debug(a);
        //复制目标
        let item = document.getElementById(data).cloneNode();
        ev.target.appendChild(item);
        if (data === 'functionMenuId') {//拖拽功能
            let obj = {
                ENABLE: "Y",
                HASCHILD: "N",
                MENUICON: "",
                MENUID: "",
                MENUNAME: this.addFunction,
                MENUTYPE: "APP",
                PARENT: "SYSCOMP",
                PID: "SYSTEM",
                WXMENU: "N"
            }
            //完成前端页面的效果
            this.sysmenus = this.sysmenus.concat(obj);
            //功能输入框置空
            this.addFunction = '';
            //实现数据库的存储
            // this.mainService.addMenu(obj).subscribe(result=>{
            //     if(result.CODE==='0'){

            //     }else{
            //         this.mainService.providers.msgService.error('添加菜单失败');
            //     }
            // })
        } else if (data === 'menuButtonId') {//拖拽菜单
            let obj = {
                ENABLE: "Y",
                HASCHILD: "Y",
                MENUICON: "",
                MENUID: "",
                MENUNAME: this.addMenu,
                MENUTYPE: "MENU",
                PARENT: "SYSCOMP",
                PID: "SYSTEM",
                P_CHILDMENUS: [],
                WXMENU: "N",
                REMARK: '',
                isOpened: true,
            }
            //完成前端页面的效果
            this.sysmenus = this.sysmenus.concat(obj);
        }
        //拖拽后抛出事件
        SysmenuBusiness.msgService.message('拖拽成功');
    }
    /**
    * 将菜单和功能拖拽到二级菜单
    */
    dragoverSecond(ev): void {//拖拽目标身上的效果
        ev.preventDefault();
        // Set the dropEffect to move
        ev.dataTransfer.dropEffect = "copy"
    }
    /**
     * 当放置被拖数据时，会发生 drop 事件。
     * @param ev 
     */
    dropSecond(ev, P_CHILDMENUS): void {
        ev.preventDefault();
        //获取目标id并新增dom
        let data = ev.dataTransfer.getData("Text");
        //复制目标
        let item = document.getElementById(data).cloneNode();
        ev.target.appendChild(item);
        if (data === 'functionMenuId') {//拖拽功能
            let obj = {
                ENABLE: "Y",
                HASCHILD: "N",
                MENUID: "",
                MENUNAME: this.addFunction,
                MENUTYPE: "APP",
                PARENT: P_CHILDMENUS[0].PARENT,
                PID: "SYSTEM",
                ROUTER: "",
                WXMENU: "N",
            }
            //完成前端页面的效果
            P_CHILDMENUS = P_CHILDMENUS.concat(obj);
            //功能输入框置空
            this.addFunction = '';
        } else if (data === 'menuButtonId') {//拖拽菜单
            // let obj = {
            //     ENABLE: "Y",
            //     HASCHILD: "Y",
            //     MENUICON: "",
            //     MENUID: "",
            //     MENUNAME: this.addMenu,
            //     MENUTYPE: "MENU",
            //     PARENT: "SYSCOMP",
            //     PID: "SYSTEM",
            //     P_CHILDMENUS: [],
            //     WXMENU: "N",
            //     REMARK: '',
            //     isOpened: true,
            // }
            // //完成前端页面的效果
            // this.sysmenus = this.sysmenus.concat(obj);
        }
        //拖拽后抛出事件
        SysappBusiness.msgService.message('拖拽成功');
    }
}
