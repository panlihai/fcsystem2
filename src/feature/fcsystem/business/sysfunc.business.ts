/* 	功能业务 */
import ParentBusiness from 'fccore2/classes/parent.business';
import SystemBusiness from 'fccore2/classes/system.business';
import { Observable } from 'rxjs';
export class SysfuncBusiness extends ParentBusiness {
    /** 
     * 根据
     * @param resId 
     */
    static getBizCodeByAid(pid: string): Observable<any>  {
        return this.daoService.getFromApi("SYSTEM/SYSBIZCODERULE/undefined", {});
    }
    /** 
     * 获取所有产品
     */
    static getAllProduct() : Observable<any> {
        return this.appService.findWithQuery('SYSPRODUCT', {})
    }
    // /**
    // * 打开窗口的函数方法
    // * @param dialogCardListArgs 
    // */
    // static openDialog(dialogCardListArgs: any) {
    //     let token = CommonService.guid();
    //     let modal: FcModalConfig = {
    //         title: dialogCardListArgs.configInterface.title ? dialogCardListArgs.configInterface.title : '',
    //         content: dialogCardListArgs.configInterface.content ?
    //             dialogCardListArgs.configInterface.content : '',
    //         okFunc: (result) => {

    //         },
    //         cancelFunc: (result) => {
    //         },
    //         componentParams: {
    //             options: dialogCardListArgs
    //         },
    //         width: dialogCardListArgs.configInterface.width,
    //         style: dialogCardListArgs.configInterface.style,
    //         zIndex: 995,
    //         token: token
    //     }
    //     CommonService.event(FccomponentEvent.modal.dialog, modal);
    // }
    /**
     * 根据服务ID获取接口数据
     * @param serviceId 服务id
     */
    static getsysBtns(id): Observable<any> {
        return SystemBusiness.appService.findWithQuery("SYSAPPBUTTONS",{WHERE:"{FUNCID:{eq:'"+id+"'}}"});
    }
     /**
     * 根据服务ID获取视图数据
     * @param serviceId 服务id
     */
    static getSysViews(id) : Observable<any>{
        return SystemBusiness.appService.findWithQuery("SYSVIEW",{WHERE:"{FUNCID:{eq:'"+id+"'}}"});
    }
}
