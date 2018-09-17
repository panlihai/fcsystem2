
import { Observable } from "rxjs";
import ParentBusiness from "fccore2/classes/parent.business";
import { isArray, isObject } from "util";
import { DialogCardListArgs } from "../components/dialog/dialogcardlist.component";
export class SysviewBusiness extends ParentBusiness {
    nzModal: any;
    saveField(param) {
        let infoCounted: boolean = false;
        let arr: any = [];
        if (isArray(param)) {
            arr = param;
        } else if (isObject(param)) {
            arr.push(param)
        }
        arr.forEach(el => {
            let obj: any = {};
            for (let attr in param) {
                switch (attr) {
                    case 'FIELDCODE':
                        obj['ELEMENTID'] = param[attr];
                        break;
                    case 'FIELDNAME':
                        obj['ELEMENTNAME'] = param[attr];
                        break;
                    case 'ENABLESEARCH':
                        break;
                    case 'ENABLELOG':
                        break;
                    case 'SHOWLIST':
                        break;
                    case 'SHOWCARD':
                        break;
                    case 'COLSPAN':
                        break;
                    case 'COLNUM':
                        break;
                    case 'ROWNO':
                        break;
                    case 'COLUMNNAME':
                        break;
                    case 'ID':
                        break;
                    default:
                        obj[attr] = param[attr];
                        break;
                }
            }
            // this.appService.saveObject('SYSVIEWELMENT', obj).subscribe(res => {
            //     if (res.CODE === '0') {
            //         if (!infoCounted) {
            //             this.messageService.success('数据已实时生成');
            //             infoCounted = true;
            //         }
            //     } else {
            //         this.messageService.error('数据实时生成失败');
            //     }
            // })
        });
    }
    // /** 
    //   *弹窗事件
    //   *@param event 
    //   *@param title
    //   *@param content 
    //   */
    // static WindowEvent(obj: any, title, content): void {
    //     let token = CommonService.guid();
    //     let modal: FcModalConfig = {
    //         title: title,
    //         content: content,
    //         okFunc: (result) => {
    //             this.logService.debug("ok");
    //         },
    //         cancelFunc: (result) => {
    //             this.logService.debug("ok");
    //         },
    //         // footer?: any;
    //         token: token
    //     }
    //     CommonService.event(FccomponentEvent.modal.dialog, modal);
    // }
    static getDetailByFieldCode(appId, fieldCode): Observable<any>  {
        return this.appService.findWithQuery('SYSAPPFIELDS', { APPID: appId, FIELDCODE: fieldCode });
    }
    /** 
   * 打开窗口的函数方法
   * @param dialogCardListArgs 
   */
    static openDialog(dialogCardListArgs: DialogCardListArgs) {
        // return this.nzModal.open({
        //     title: dialogCardListArgs.configInterface.title ? dialogCardListArgs.configInterface.title : '',
        //     content: dialogCardListArgs.configInterface.content ? dialogCardListArgs.configInterface.content : DialogListComponent,
        //     onOk() { },
        //     onCancel() { },
        //     footer: false,
        //     width: dialogCardListArgs.configInterface.width,
        //     style: dialogCardListArgs.configInterface.style,
        //     componentParams: {
        //         options: dialogCardListArgs
        //     }
        // })
    }
}
