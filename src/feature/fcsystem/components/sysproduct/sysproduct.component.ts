import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import { FCEVENT } from 'fccomponent2/fc';
import CacheService from 'fccore2/common/cache';
import { CommonService } from 'fccore2/common/common';
import SysproductBusiness from '../../business/sysproduct.business';
import SystemBusiness from 'fccore2/classes/system.business';
@Component({
  selector: 'sysproduct',
  templateUrl: 'sysproduct.component.html',
  styles: [`
  .sys-card-btn{
    width:25%;
  }
  `]
})
export class SysproductComponent extends ParentlistComponent {
  /**
   * 初始化模型，产品对应的内容
   */
  constructor() {
    super('SYSTEM', 'SYSPRODUCT');
  }
  init(): void {

  }

  getDefaultQuery() {

  }
  /**
   * 
   * @param eventName 
   * @param context 
   */
  event(eventName: string, context: any): void {
    switch (eventName) {
    }
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
      this.navigate(this.getRouteUrl('Edit'), { ID: selectedObj.ID, refresh: 'Y',MENUICON:this.routerParam.MENUICON });
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
  thumbUp(): void {
    SystemBusiness.msgService.message("点赞功能正在开发中，敬请期待！");
    //阻止冒泡
    event.stopPropagation();
    event.preventDefault();
  }
  /**
   * 下载
   */
  download() : void{
    SystemBusiness.msgService.message("下载功能正在开发中，敬请期待！");
    //阻止冒泡
    event.stopPropagation();
    event.preventDefault();
  }
  /**
   * 评论
   */
  evaluate(): void {
    SystemBusiness.msgService.message("评论功能正在开发中，敬请期待！");
    //阻止冒泡
    event.stopPropagation();
    event.preventDefault();
  }
  /**
   * 统计
   */
  count(): void {
    SystemBusiness.msgService.message("统计功能正在开发中，敬请期待！");
    //阻止冒泡
    event.stopPropagation();
    event.preventDefault();
  }

}
