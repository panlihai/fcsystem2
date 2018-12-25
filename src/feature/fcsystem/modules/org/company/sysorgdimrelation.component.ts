import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import { CommonService } from 'fccore2/common/common';
import CacheService from 'fccore2/common/cache';
import { SyscompanyBusiness } from '../../../business/syscompany.business';
/* 组织维度 */
@Component({
    selector: 'sysorgdimrelation',
    templateUrl: './sysorgdimrelation.component.html',
    styles: [`
  `]
})

export class SysorgdimrelationComponent extends ParentlistComponent {
    fcData: any;
    constructor() {
        super("SYSTEM", "SYSCOMPANYDIM");
    }
    //维度列表配置
    dimListdataOption: any = {};
    /**
    * 跳转到新增页面
    * @param event
    */
    init(): void {
        this.dimListdataOption = SyscompanyBusiness.dimFclistdataOption;
        //var userInfo = this.userInfo;
        this.enableAutoSearch = true;
        //初始化查询条件
        /*  第一种方法  失败*/

        // let con: any = {
        //     WHERE: "{ID:{eq:'sdfafe'}}",
        //     PAGESIZE: 9999,
        //     PAGENUM: 1
        // }
        // this.condition = JSON.stringify(con);

        /*  第二种方法  失败*/
        // // this.searchObj= {
        // //         WHERE: " SCREATECOMPANY :{ eq : 'Y' }"
        // //       };

        /*  第三种方法  失败*/
        //   SyscompanyBusiness.getCompanyDimByCol("SCREATECOMPANY",userInfo.COMPANYCODE).subscribe(result=>{
        //     this.pageList=result.DATA;
        //    });

    }
    ngOnInit() {

        let con: any = {
            WHERE: "{SCREATECOMPANY:{eq:'" + this.userInfo.COMPANYCODE + "'}}",
            PAGESIZE: 9999,
            PAGENUM: 1
        }
        this.condition = JSON.stringify(con);

    }
    /**
    * 默认查询
    * @param event
    */
    getDefaultQuery() {
        /*  第四种方法  失败*/
        // let con: any = {
        //     WHERE: "{ID:{eq:'60b4b54f0f294c209e9e6bd155dd01a4'}}"
        // }
        // this.condition = JSON.stringify(con);

    }

    /**
   * 页面事件
   * @param event
   */
    event(eventName: string, context: any): void {
        switch (eventName) {
            case "listDetail":
                this.listEdit(context);
                break;
            case "listEdit":
                this.listOneEdit(context);
                this.stopPropagation(context);
                break;
        }
    }

    /**
    * 网格内按钮事件
    * @param event
    */
    /*componentEvents(event, action) {
        switch (action.eventName) {
            case 'listEdit':
                var _param = action.param;
                //把卡片的数据放入缓存中
                CacheService.setS(this.appId + "DATA", CommonService.cloneArray(this.pageList));
                //把id带入到编辑页面
                this.navigate(this.getRouteUrl('Edit'), { pageState: 'Edit', ID: _param.ID, refresh: 'Y', MENUICON: this.routerParam.MENUICON });
                break;
            case 'listOneDelete':
                this.listDelete(action.param);
                break;
            case 'selected':
                if (action.param.length > 0) {
                    this.selectedObject = action.param[0];
                    this.selectedObjects = action.param;
                } else {
                    this.selectedObject = [];
                    this.selectedObjects = [];
                }
                break;
        }
    }
*/
    /**
    * 跳转到新增页面
    * @param event
    */
    // listAdd(context: any): void {
    //     //把卡片的数据放入缓存中
    //     // CacheService.setS(this.appId + "DATA", CommonService.cloneArray(this.pageList));
    //     //把id带入到编辑页面
    //     this.navigate(this.getRouteUrl('Edit'), { pageState: 'Add', ID: this.pageList[0].ID, refresh: 'Y', MENUICON: this.routerParam.MENUICON });
    // }

    /**
     * 跳转到编辑页面
     * @param event
     */
    listEdit(context: any): void {
        //选中的对象
        if (this.selectedObjects && this.selectedObjects !== null && this.selectedObjects.length > 0) {
            //把卡片的数据放入缓存中
            CacheService.setS(this.appId + "DATA", CommonService.cloneArray(this.pageList));
            //把id带入到编辑页面
            this.navigate(this.getRouteUrl('Edit'), { pageState: 'Edit', ID: this.selectedObject[0].ID, refresh: 'Y', MENUICON: this.routerParam.MENUICON });
        } else {
            SyscompanyBusiness.msgService.warm("请选择要修改的记录!");
        }
    }

    /**
     * 删除记录
     * @param event
     */
    listDelete(context: any): void {
        //如果网格中有选中数据
        if (this.selectedObjects && this.selectedObjects !== null && this.selectedObjects.length > 0) {
            var that = this;
            CommonService.event("openConfirm", {
                title: '确认删除记录吗？',
                okFunc: function () {
                    var _dimId = that.selectedObject.ID;
                    SyscompanyBusiness.appService.deleteObject(that.appId, _dimId).subscribe(result => {
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
}
