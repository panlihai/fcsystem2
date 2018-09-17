import { Component } from '@angular/core';
import { ParentlistComponent } from 'fccomponent2';
import { FCEVENT } from 'fccomponent2/fc';
import { CommonService } from 'fccore2/common/common';
import CacheService from 'fccore2/common/cache';
import SystemBusiness from 'fccore2/classes/system.business';
import SearchUtil from '../../util/search.util';
@Component({
  selector: 'sysapp',
  templateUrl: './sysapp.component.html',
  styles: [`
  .sys-card-btn{
    width:25%;
  }
  .sys-fast-list {
    cursor: pointer;
  }
  `]
})
export class SysappComponent extends ParentlistComponent {
  //字母查找
  fastsearchWords: any[];
  //数据源
  datasource: string;
  //数据源列表
  datasourceList: any[];
  //产品数据集
  productList: any[];
  /**
   * 初始化模型，产品对应的内容 
   */
  constructor() {
    super('SYSTEM', 'SYSAPP');
  }
  /**
   * 初始化构造对象，只执行一次
   */
  init(): void {
    //根据26个字母查询数据
    this.fastsearchWords = SearchUtil.fastSearch();
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
    if (this.routerParam && this.routerParam.PID) {
      this.searchObj.PID = this.routerParam.PID;
    }
    this.search();
  }
  getDefaultQuery(): any {
    return {

    };
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
   * 获取数据源列表
   */
  findDataSource(): void {
    if (this.searchObj.APPMODEL) {
      SystemBusiness.appService.findWithQuery("SYSDATASOURCE", { WHERE: "{PID:{eq:'" + this.searchObj.APPMODEL + "'}}" }).subscribe(result => {
        if (result.CODE === '0') {
          this.datasourceList = result.DATA;
        }
      });
    } else {
      this.datasourceList = [];
    }
  }
  /**
    * 快速查询
    * @param item 
    */
  searchByWord(item: any): void {
    // 点击的首字母查询,高亮当前的字母并根据点击字母过滤,再点击当前字母,取消高亮并查询所有的数据
    if (this.searchObj.APPID === item.ACTCODE + "%") {
      delete this.searchObj.APPID;
    } else {
      this.searchObj.APPID = item.ACTCODE + "%";
    }
    this.search();
  }
  /**
   *  根据产品查询模型
   * @param item 
   */
  searchByPid(item: any): void {
    if (this.searchObj.APPMODEL === item.PID) {
      delete this.searchObj.APPMODEL;
    } else {
      this.searchObj.APPMODEL = item.PID;
    }

    //  获取数据源列表
    this.findDataSource();
    this.search();

  }
  /**
   *  根据数据源查询模型
   * @param item 
   */
  searchByDsid(item: any): void {
    if (this.searchObj.DATASOURCE === item.DSID) {
      delete this.searchObj.DATASOURCE;
    } else {
      this.searchObj.DATASOURCE = item.DSID;
    }
    this.search();
  }
  /**
       * 删除之后的操作
       */
  afterDelete(): void {
    this.search();
  }
  /**
   * 跳转到编辑页面
   * @param event 
   */
  listEdit(item:any): void {
    //选中的对象
    let selectedObj: any = event;
    if (selectedObj && selectedObj !== null) {
      //把卡片的数据放入缓存中
      CacheService.setS(this.appId + "DATA", CommonService.cloneArray(this.pageList));
      //把id带入到编辑页面
      this.navigate(this.getRouteUrl('Edit'), { ID: item.ID, refresh: 'Y', MENUICON: this.routerParam.MENUICON });
    }
  }
  /**
   * 跳转到选择数据源页面
   * @param event 
   */
  quickstart(event: FCEVENT): void {
    this.navigate(this.getRouteUrl('Modify'), event.param);
  }

  /**
   * 导入
   */
  import(): void {

  }
  /**
   * 点赞
   */
  thumbUp(event: any): void {
    SystemBusiness.msgService.message("点赞功能正在开发中，敬请期待！");
    //阻止冒泡
    this.stopPropagation(event);
  }
  /**
   * 下载
   */
  download(event: any): void {
    SystemBusiness.msgService.message("下载功能正在开发中，敬请期待！");
    //阻止冒泡
    this.stopPropagation(event);
  }
  /**
   * 评论
   */
  evaluate(event: any): void {
    SystemBusiness.msgService.message("评论功能正在开发中，敬请期待！");
    //阻止冒泡
    this.stopPropagation(event);
  }
  /**
   * 统计
   */
  count(event: any): void {
    SystemBusiness.msgService.message("统计功能正在开发中，敬请期待！");
    //阻止冒泡
    this.stopPropagation(event);
  }
}
