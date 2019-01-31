import { Component, OnInit } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { SysuserBusiness } from '../../../business/sysuser.business';
import { DaoService, FCCONFIG } from 'fccore2';
import SystemBusiness from "fccore2/classes/system.business";
import { ObjStatus } from "fccore2/common/constant";
import { CommonService } from 'fccore2/common/common';
@Component({
	selector: 'sysuserEdit',
	templateUrl: './sysuseredit.component.html',
  styles:[`
  `]
})
export class SysusereditComponent extends ParentEditComponent {
	event(eventName: string, param: any): void {
		throw new Error("Method not implemented.");
	}

	fcListdata: any[];
	selectdata: any[];
	list :any= [];
	selectdatas:any=[];
	addNew(mainObj: any): boolean {
		return true;
	}
	constructor() {
		super(SysuserBusiness.pid, SysuserBusiness.appId);
	}
	init(): void {
		this.mainObj.PID = FCCONFIG.pid;
		this.getData();
		this.mainObj.Department=this.dataSet; //

	}
	// 角色选择
	getData(): void {
		const ret = [];
		SysuserBusiness.appService.findWithQuery("SYSROLE", {}).subscribe(result => {
			if(result.CODE === '0') {
				this.fcListdata = result.DATA;
				for(let i = 0; i < this.fcListdata.length; i++) {
					ret.push({
						key: i.toString(),
						title: this.fcListdata[i].ROLENAME,
						direction: Math.random() * 2 > 1 ? 'right' : '',
					});
				}
				this.list = ret;
			this.list.filter(item=>{
				 if(item.direction!=''){
					 let comtemtdata:any=[];
					this.selectdatas=comtemtdata.push(item)
				 }
			})
			}
		})
	}
	select(ret: {}): void {
		console.log(ret);
		
	}

	change(ret: {}): void {
		console.log('nzChange', ret);
	
	}	
	getDefaultQuery(): any {
		return {};
	}
// 管控单位
	i = 1;
	editCache = {};
	dataSet = [
	  {
		key    : '0',
		name   : '哈尔滨集团公司',
	  },
	  {
		key    : '1',
		name   : '哈尔滨铁路局合资',
	  }
	];
  
	addRow(): void {
	  this.i++;
	  this.dataSet = [ ...this.dataSet, {
		key    : `${this.i}`,
		name   : `Edward King ${this.i}`,
	  } ];
	}
	deleteRow(i: string): void {
	  const dataSet = this.dataSet.filter(d => d.key !== i);
	  this.dataSet = dataSet;
	}
	selectObj: any= {};
	modalClose(event) {
	  this.selectObj = event;
		this.selectObj = event;
		let selestdata=this.selectObj.param
			for(let i = 0; i < selestdata.length; i++) {
			this.i++;
			this.dataSet = [ ...this.dataSet, {
				key    : `${this.i}`,
				name   : selestdata[i].SCOMPANY_NAME,
				} ];		
			}
	}
	beforeSave(): boolean {
		if (this.mainObj.SBEGIN_DATE || this.mainObj.SEND_DATE ) {
		this.mainObj.SBEGIN_DATE = CommonService.dateFormat(this.mainObj.SBEGIN_DATE, "yyyy-MM-dd");
		this.mainObj.SEND_DATE = CommonService.dateFormat(this.mainObj.SEND_DATE, "yyyy-MM-dd");
		
		}
		return true;
		}
	/**
     * 保存新建
     * @param action
     */
    saveNew(action:string):void { 
			console.log('89')
			if (!this.validator()) {
					// return;
			}
			if (this.beforeSave()) {
				console.log('dghjj')
				let userobj:any=[{USER:[{}],COMPANYEMPLOYEE:[{}],USERROLE:[{}]}]
						userobj[0].USER[0]=this.mainObj;
						userobj[0].COMPANYEMPLOYEE[0]=this.selectdatas;
						userobj[0].USERROLE[0]=this.dataSet;
						console.log(userobj)
				SysuserBusiness.createUser(this.appId, userobj,'SYSROLE').subscribe(function (result) {
							if (result.CODE === '0') {
									SystemBusiness.msgService.message('保存成功！');
								this.afterSave();
								this.objStatus = ObjStatus.ADDED;
								this.mainObj = SystemBusiness.appService.initObjDefaultValue(this.mainApp);
							}
							else {
									SystemBusiness.msgService.message('保存失败！');
							}
					});
			}
	};
}