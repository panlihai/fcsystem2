import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import { SysserviceBusiness } from '../../business/sysservice.business';
import { FCEVENT } from 'fccomponent2/fc';
import SearchUtil from '../../util/search.util';
import SysproductBusiness from '../../business/sysproduct.business';
import SystemBusiness from 'fccore2/classes/system.business';
@Component({
  selector: 'sysservice',
  templateUrl: './sysservice.component.html',
  styles: [`
   .sys-fast-select{
     width:160px;
   }
            `]
})
export class SysserviceComponent extends ParentlistComponent {
  //字母查找
  fastsearchWords: any[];
  //产品下拉
  productList: any[];
  constructor() {
    super("SYSTEM", "SYSSERVICE");
  }
  /**
   * 初始化条件
   */
  init(): void {
    //26个字母name,方法名,BUSTYPE为'fastsearch'
    this.fastsearchWords = SearchUtil.fastSearch();
    //初始化数据
    this.findByCondition(this.moduleId);
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
   * 
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
    if (this.searchObj.SERVICEID === item.ACTCODE + "%") {
      delete this.searchObj.SERVICEID;
    } else {
      this.searchObj.SERVICEID = item.ACTCODE + "%";
    }
    this.search();
  }
  /**
   * 
   */
  listEdit(sysservice: any): void {
    this.navigate(this.getRouteUrl('Edit'), { ID: sysservice.ID, refresh: 'Y', MENUICON: this.routerParam.MENUICON });
  }
  /**
    * 初始化数据，根据产品、数据源过滤元数据
    * @param product 
    * @param datasource 
    */
  findByCondition(pid: string): void {
    SysserviceBusiness.appService.findWithQuery("SYSSERVICE", { PID: pid, PAGESIZE: this.pageSize, PAGENUM: this.pageNum })
      .subscribe(result => {
        if (result.CODE === '0') {
          this.pageList = result.DATA;
          this.pageTotal = result.TOTALSIZE;
        }
      });
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
    // SysserviceBusiness.msgService.confirm("点赞功能正在开发中，敬请期待", () => {
    // }, () => { });
    // //阻止冒泡
    // event.stopPropagation();
    // event.preventDefault();
  }
  /**
   * 下载
   */
  download(): void {
    // SysserviceBusiness.msgService.confirm("下载功能正在开发中，敬请期待！", () => {
    // }, () => { });
    //阻止冒泡
    event.stopPropagation();
    event.preventDefault();
  }
  /**
   * 评论
   */
  evaluate(): void {
    // SysserviceBusiness.msgService.confirm("评论功能正在开发中，敬请期待！", () => {
    // }, () => { });
    //阻止冒泡
    event.stopPropagation();
    event.preventDefault();
  }
  /**
   * 统计
   */
  count(): void {
    // SysserviceBusiness.msgService.confirm("统计功能正在开发中，敬请期待！", () => {
    // }, () => { });
  }
}
