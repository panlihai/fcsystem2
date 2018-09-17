import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import { SysfuncBusiness } from '../../business/sysfunc.business';
import { FCEVENT } from 'fccomponent2/fc';
import SystemBusiness from 'fccore2/classes/system.business';
import SearchUtil from '../../util/search.util';
@Component({
  selector: 'sysfunc',
  templateUrl: 'sysfunc.component.html',
  styles: [`
   
  `]
})
export class SysfuncComponent extends ParentlistComponent {
  //字母查找
  fastsearchWords: any[];
  //产品数据集
  productList: any[];
  /**
   * 初始化模型，产品对应的内容 
   */
  constructor() {
    super('SYSTEM', 'SYSFUNC');
  }
  /**
 * 初始化构造对象，只执行一次
 */
  init(): void {
    //26个字母name,方法名
    this.fastsearchWords = SearchUtil.fastSearch();
    //查询产品信息
    this.findProduct();
     //分页大小
     this.pageSize = 23;
     // 默认启用自动查询
     this.enableAuthSearch = true;
  }
  /**
  * 显示的时候执行代码
  */
  ngOnInit() {
    this.search();
  }
  /**
   * 默认查询
   */
  getDefaultQuery() {

  }
  /**
    * @param eventName 事件名称
    * @param context 事件返回参数
    */
  event(eventName: string, event: FCEVENT): void {

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
   * 快速查询
   * @param item 
   */
  searchByWord(item: any): void {
    // 点击的首字母查询,高亮当前的字母并根据点击字母过滤,再点击当前字母,取消高亮并查询所有的数据
    if (this.searchObj.FUNCID  === item.ACTCODE+ "%") {
      delete this.searchObj.FUNCID;
    } else {
      this.searchObj.FUNCID = item.ACTCODE + "%";
    }
    this.search();
  }
  listEdit(sysfunc: any): void {
    this.navigate(this.getRouteUrl('Edit'), { ID: sysfunc.ID, refresh: 'Y', MENUICON: this.routerParam.MENUICON });
  }
  /**
   * 导入
   */
  import(): void {

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
  download(): void {
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
