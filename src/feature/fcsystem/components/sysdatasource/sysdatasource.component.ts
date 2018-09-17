import { Component } from '@angular/core';
import CacheService from 'fccore2/common/cache';
import { ParentlistComponent } from 'fccomponent2';
import SysdatasourceBusiness from '../../business/sysdatasource.business';
import { FCEVENT } from 'fccomponent2/fc';
import { CommonService } from 'fccore2/common/common';
import SystemBusiness from 'fccore2/classes/system.business';
@Component({
  selector: 'sysdatasource',
  templateUrl: './sysdatasource.component.html',
  styles: [`
  .sys-card-btn{
    width:25%;
  }
  `]
})
export class SysdatasourceComponent extends ParentlistComponent {
  //产品数据集
  productList: any[];
  /**
   * 初始化模型，产品对应的内容
   */
  constructor() {
    super('SYSTEM', 'SYSDATASOURCE');
  }
  init(): void {
    //分页大小
    this.pageSize = 23;
    // 默认启用自动查询
    this.enableAuthSearch = true;
    //查询产品信息
    this.findProduct();
  }
  /**
  * 显示的时候执行代码
  */
  ngOnInit() {
    this.search();
  }
  getDefaultQuery() {

  }

  /**
   * 主对象的事件
   * @param eventName 事件名 
   * @param context 返回参数
   */
  event(eventName: string, context: any): void {
    switch (eventName) {

    }
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
  }
  /**
   * 新增
   */
  listAdd(event: FCEVENT): void {
    this.navigateAdd({ refresh: 'Y', MENUICON: this.routerParam.MENUICON, PID: this.searchObj.PID });
  }
  /**
  * 跳转到编辑页面
  * @param event 
  */
  listEdit(event: FCEVENT): void {
    //选中的对象
    let selectedObj: any = event;
    if (selectedObj && selectedObj !== null) {
      //把卡片的数据放入缓存中
      CacheService.setS(this.appId + "DATA", CommonService.cloneArray(this.pageList));
      //把id带入到编辑页面
      this.navigate(this.getRouteUrl('Edit'), { ID: selectedObj.ID, refresh: 'Y', MENUICON: this.routerParam.MENUICON });
    }
  }
  /**
   * 导入
   */
  import() {

  }
  /**
   * 点赞
   */
  thumbUp() {
    SystemBusiness.msgService.message("点赞功能正在开发中，敬请期待！");
    //阻止冒泡
    event.stopPropagation();
    event.preventDefault();
  }
  /**
   * 下载
   */
  download() {
    SystemBusiness.msgService.message("下载功能正在开发中，敬请期待！");
    //阻止冒泡
    event.stopPropagation();
    event.preventDefault();
  }
  /**
   * 评论
   */
  evaluate() {
    SystemBusiness.msgService.message("评论功能正在开发中，敬请期待！");
    //阻止冒泡
    event.stopPropagation();
    event.preventDefault();
  }
  /**
   * 统计
   */
  count() {
    SystemBusiness.msgService.message("统计功能正在开发中，敬请期待！");
    //阻止冒泡
    event.stopPropagation();
    event.preventDefault();
  }

}
