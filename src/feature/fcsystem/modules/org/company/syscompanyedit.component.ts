import { Component, OnInit } from '@angular/core';
import { CommonService } from 'fccore2/common/common';
import { SyscompanyBusiness } from '../../../business/syscompany.business';
import SystemBusiness from 'fccore2/classes/system.business';
import { ParentEditComponent } from 'fccomponent2'; 
@Component({
    selector: 'syscompanyedit',
    templateUrl: './syscompanyedit.component.html',
    styles: [`

  `]
})
export class SyscompanyeditComponent extends ParentEditComponent {
    //开票信息对象
    ivoiceObj: any = {};
    //注册信息对象
    registerObj: any = {};
    //隶属关系对象
    // syscompanyrelationObj: any;
    // 生效日期
    sbeginDate: Date;
    // 成立日期
    sestDate: Date;
    // 注销日期
    sendDate: Date;
    //上传附件
    // sysresUpload: string;
    //父级编码
    // parentCode: string;
    //维度编码
    // dimCode: string;
    //单位隶属关系的id
    // rId: string;
    constructor() {
        super("SYSTEM", "SYSCOMPANY");
    }
    ngOnInit() {
        // this.ivoiceObj = SyscompanyBusiness.appService.getListFieldsByAppid("SYSCOMPANYINVOICE");//SyscompanyBusiness.getApppFieldByAppID("SYSCOMPANYINVOICE");
    }
    init(): void {
        // this.ivoiceObj={
        //     ID: '',
        //     SBANK: '',
        //     SADDRESS: '',
        //     SCREATE_TIME: '',
        //     SMODIFIER:   '',
        //     SCOMP_ID: '',
        //     SCONTACT_TEL: '',
        //     STIN: '',
        //     SACCOUNT: '',
        //     SCRATOR: '',
        //     SMODIFY_TIME: ''
        // }
        // //上级单位代码
        // this.parentCode = this.routerParam.parentCode;
        // //维度代码
        // this.dimCode = this.routerParam.dimCode;

        SyscompanyBusiness.getDataByAppID_Col_Val("SYSCOMPANY", "ID", this.routerParam.ID).subscribe((result) => {
            if (result.CODE === '0' && result.DATA.length > 0) {
                this.mainObj = result.DATA[0];

                //成立日期转成date格式
                // this.sestDate = CommonService.stringToDate(this.mainObj.SEST_DATE);
                this.mainObj.SEST_DATE = CommonService.stringToDate(this.mainObj.SEST_DATE);
                //生效日期转成date格式
                // this.sbeginDate = CommonService.stringToDate(this.mainObj.SBEGIN_DATE);
                this.mainObj.SBEGIN_DATE = CommonService.stringToDate(this.mainObj.SBEGIN_DATE);
                //注销日期转成date格式
                // this.sendDate = CommonService.stringToDate(this.mainObj.SEND_DATE);
                this.mainObj.SEND_DATE = CommonService.stringToDate(this.mainObj.SEND_DATE);

                SyscompanyBusiness.getDataByAppID_Col_Val("SYSCOMPANYREGISTER", "SCOMP_ID", this.mainObj.ID).subscribe((result) => {
                    if (result.CODE === '0' && result.DATA.length > 0) {
                        this.registerObj = result.DATA[0];
                    }
                });
                SyscompanyBusiness.getDataByAppID_Col_Val("SYSCOMPANYINVOICE", "SCOMP_ID", this.mainObj.ID).subscribe((result) => {
                    if (result.CODE === '0' && result.DATA.length > 0) {
                        this.ivoiceObj = result.DATA[0];
                    }
                });
            }
        });
        // //隶属单位id
        // this.rId = this.routerParam.RID;
    }
    addNew(mainObj: any): boolean {
        return true;
    }
    event(eventName: string, param: any): void {

    }

    /**
  * 事件
  * @param eventName 事件名
  * @param param 返回参数
  */
    pageEvent(eventName: string): void {
        switch (eventName) {
            case 'BASE':
                this.saveBaseInfo();
                break;
            case 'KP':
                this.saveKpInfo();
                break;
            case 'ZC':
                this.saveZcInfo();
                break;
            default:
                break;
        }
    }

    /**
     * 保存前验证
     */
    beforeSave(): boolean {
        //成立日期
        // this.mainObj.SEST_DATE = this.sestDate;
        //生效日期
        // this.mainObj.SBEGIN_DATE = this.sbeginDate;
        //注销日期
        // this.mainObj.SEND_DATE = this.sendDate;
        //自定义时间验证,生效日期不能大于成立日期，注销日期不能大于生效日期
        SyscompanyBusiness.validator(this.mainObj, this.mainValid);
        //平台不能空和最长输入长度的验证
        return this.validator();
    }

    /**
   * 保存基本信息
   */
    saveBaseInfo() {
        this.mainObj.SMODIFIER = SyscompanyBusiness.userService.getUserInfo().USERCODE;//创建人
        this.mainObj.SMODIFY_TIME = CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd');//创建时间
        if (null == this.mainObj['SPARENT_CODE'] || 'null' == this.mainObj['SPARENT_CODE'])
            this.mainObj['SPARENT_CODE'] = '';

        SyscompanyBusiness.saveOrUpdateCompany(this.mainObj, "", "")
            .subscribe(result => {
                if (result[0].CODE === '0') {
                    SystemBusiness.msgService.message('保存成功');
                    // this.cardBack(action);

                } else {
                    SystemBusiness.msgService.error("保存失败," + result[0].MSG + ',' + result[1].MSG);
                }
            })
    }

    /**
      * 保存开票信息
      */
    saveKpInfo() {
        this.ivoiceObj.SCOMP_ID = this.mainObj.ID;// CommonService.guid();
        this.ivoiceObj.SMODIFIER = SyscompanyBusiness.userService.getUserInfo().USERCODE;//创建人
        this.ivoiceObj.SMODIFY_TIME = CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd');//创建时间
        SyscompanyBusiness.saveOrUpdateExtendCompany("SYSCOMPANYINVOICE", this.ivoiceObj)
            .subscribe(result => {
                if (result[0].CODE === '0') {
                    SyscompanyBusiness.getDataByAppID_Col_Val("SYSCOMPANYINVOICE", "SCOMP_ID", this.mainObj.ID).subscribe((result) => {
                        if (result.CODE === '0' && result.DATA.length > 0) {
                            this.ivoiceObj = result.DATA[0];
                        }
                    });
                    SystemBusiness.msgService.message('保存成功');
                } else {
                    SystemBusiness.msgService.error("保存失败," + result[0].MSG + ',' + result[1].MSG);
                }
            })
    }

    /**
        * 保存注册信息
        */
    saveZcInfo() {
        this.registerObj.SCOMP_ID = this.mainObj.ID;// CommonService.guid();
        this.registerObj.SMODIFIER = SyscompanyBusiness.userService.getUserInfo().USERCODE;//创建人
        this.registerObj.SMODIFY_TIME = CommonService.timestampFormat(CommonService.getTimestamp() * 1000, 'yyyyMMdd');//创建时间
        SyscompanyBusiness.saveOrUpdateExtendCompany("SYSCOMPANYREGISTER", this.registerObj)
            .subscribe(result => {
                if (result[0].CODE === '0') {
                    SyscompanyBusiness.getDataByAppID_Col_Val("SYSCOMPANYREGISTER", "SCOMP_ID", this.mainObj.ID).subscribe((result) => {
                        if (result.CODE === '0' && result.DATA.length > 0) {
                            this.registerObj = result.DATA[0];
                        }
                    });
                    SystemBusiness.msgService.message('保存成功');
                } else {
                    SystemBusiness.msgService.error("保存失败," + result[0].MSG + ',' + result[1].MSG);
                }
            })

    }

}
