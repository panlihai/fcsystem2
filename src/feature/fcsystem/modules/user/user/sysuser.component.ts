import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import { SysuserBusiness } from '../../../business/sysuser.business';
import { CommonService } from 'fccore2/common/common';
import { FcModalConfig } from 'fccomponent2/business/fcmodel.business';
import FccomponentEvent from 'fccomponent2/business/fccomponet.event';
import SystemBusiness from "fccore2/classes/system.business";
// import { AnyComponent } from 'src/feature/fcsamples/basic/any/any.component';
// import { Modalcard } from '';
@Component({
    selector: 'sysuserlist',
    templateUrl: './sysuser.component.html',
    styles: [`
  `]
})
export class SysuserComponent extends ParentlistComponent {
    fcData: any[];
    keyworldname:any;
    keyworlddepartment:any;
    keyworldunit:any;
    constructor() {
        super(SysuserBusiness.pid, SysuserBusiness.appId);
    }
    init(): void {
      

    }
    getDefaultQuery(): any {
        return {};
    }
    /**
      * 列表批量删除
      * @param event
      */
    listDelete(event) {
        var _this = this;
        if (this.selectedObjects.length === 0) {
            SystemBusiness.msgService.warm('请选择至少一条记录！');
            console.log('删除')
            return;
        }
        var canDo = true;
        for (var i = 0; i < this.selectedObjects.length; i++) {
            console.log(this.selectedObjects)
            var mainObj = this.selectedObjects[i];
            if (!this.beforeDelete(mainObj)) {
                canDo = false;
                break;
            }
        }
        if (!canDo) {
            return;
        }
        var ids = [];
        this.selectedObjects.forEach(function (obj) {
            console.log(obj)
            ids.push({ ID: obj.ID });
            console.log(ids)
        });
        CommonService.event(FccomponentEvent.modal.confirm, {
            title: '确认删除记录吗？',
            okFunc: function () {
                SysuserBusiness.deleteUser(_this.mainApp.APPID, ids, 'SYSROLE').subscribe(function (result) {
                    console.log('dshugdhsu')
                    if (result.CODE === '0') {
                        _this.afterDelete();
                        _this.selectedObjects.forEach(function (obj) {
                            /** this.listWnd.deleteRowDataById([obj.ID]);*/
                        });
                        SystemBusiness.msgService.message('删除成功！');
                        //重新渲染列表
                    }
                    else {
                        SystemBusiness.msgService.message('删除失败！');
                    }
                });
            },
            cancelFunc: function () { }
        });
    };
    /**
        * 启用（批量）
        * @param event
        */
    listEnable(event) {
        var _this = this;
        if (this.selectedObjects.length === 0) {
            SystemBusiness.msgService.warm('请选择至少一条记录！');
            console.log('启用')
            return;
        }
        var listids = [];
        this.selectedObjects.forEach(function (obj) {
            listids.push({ ID: obj.ID });
        });
        SysuserBusiness.enableUser(_this.mainApp.APPID, listids, 'SYSROLE').subscribe(function (result) {
            if (result.CODE === '0') {
                _this.selectedObjects.forEach(function (obj) {
                    /** this.listWnd.deleteRowDataById([obj.ID]);*/
                });
                SystemBusiness.msgService.message('启用成功！');
                //重新渲染列表
            }
            else {
                SystemBusiness.msgService.message('启用失败！');
            }
        });
    }
    /**
         * 禁用（批量）
         * @param event
         */
    listDisable(event) {
        var _this = this;
        if (this.selectedObjects.length === 0) {
            SystemBusiness.msgService.warm('请选择至少一条记录！');
            console.log('hshshh')
            return;
        }
        var ids = [];
        this.selectedObjects.forEach(function (obj) {
            ids.push({ ID: obj.ID });
        });
        SysuserBusiness.disableUser(_this.mainApp.APPID, ids, 'SYSROLE').subscribe(function (result) {
            if (result.CODE === '0') {
                _this.selectedObjects.forEach(function (obj) {
                    /** this.listWnd.deleteRowDataById([obj.ID]);*/
                });
                SystemBusiness.msgService.message('禁用成功！');
                //重新渲染列表
            }
            else {
                SystemBusiness.msgService.message('禁用失败！');
            }
        });
    }
     /**
         * 解锁（可批量解锁）
         * @param event
         */
    listUnlock(event) {
        var _this = this;
        if (this.selectedObjects.length === 0) {
            SystemBusiness.msgService.warm('请选择至少一条记录！');
            return;
        }
        var ids = [];
        this.selectedObjects.forEach(function (obj) {
            ids.push({ ID: obj.ID });
        });
        SysuserBusiness.unlockUser(_this.mainApp.APPID, ids, 'SYSROLE').subscribe(function (result) {
            if (result.CODE === '0') {
                _this.selectedObjects.forEach(function (obj) {
                    /** this.listWnd.deleteRowDataById([obj.ID]);*/
                });
                SystemBusiness.msgService.message('解锁成功！');
                //重新渲染列表
            }
            else {
                SystemBusiness.msgService.message('解锁失败！');
            }
        });
    }
    event(eventName: string, context: any): void {
        switch (eventName) {
            case 'SEARCH':                //查询
                let condition:any = {};
                condition.NAME=this.keyworldname;
                condition.SDEPTCODE=this.keyworlddepartment;
                condition.SCOMPANYCODE=this.keyworldunit;
                console.log(condition)
                SysuserBusiness.findUser(condition).subscribe(result=>{
                   if(result.CODE === '0'){
                    console.log(result)
                    console.log(result)
                   }
                })
                break;   
            case 'RESET':     // 查询重置
                this.reset();
                break;    
            case 'listEnable':      // 启用
                this.listEnable('listEnable')
                break;
            case 'listDisable':           //禁用
                this.listDisable('listDisable')
                break;
            case 'listUnlock':             //解鎖
                this.listUnlock('listUnlock')  
                break;
        }
    }
}

