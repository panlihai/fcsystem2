
import ParentBusiness from "fccore2/classes/parent.business";
export default class SysemployeeBusiness extends ParentBusiness {
/**
 * 根据userid获取员工角色
 * @param employeeid 
 */
 static getemployeeRole(employeeid) {
    return SysemployeeBusiness.appService.findWithQuery('SYSROLEUSER', { WHERE:"{USERID:{eq:'"+employeeid+"'} }"})
  }
  /**
  * 将当前员工的角色信息全部删除
  * @param uerid 
  */
 static alldelete(userid) {
    userid = {WHERE:"{ID:{eq:'"+userid+"'}}"};
    return SysemployeeBusiness.appService.deleteObject('SYSROLEUSER',userid).subscribe(res => {
      if (res.CODE === '0') {
      } else if (res.CODE === '1') {
        SysemployeeBusiness.msgService.error("删除失败");
      }
    })
  }
  /**
   * 将新增员工的角色添加到数据库
   * @param obj 
   */
  static addEmployeerole(employeeroleValue, environment, mainObj) {
    //获取所有的员工角色
    let employeeroleArr: any[] = [];
    let arr = employeeroleValue.split(',');
    arr.forEach(element => {
      employeeroleArr.push({
        PID: environment.pid,
        ROLEID: element,
        USERID: mainObj.SEMPLOYEE_CODE,
        REMARK: ''
      });
    })
    return SysemployeeBusiness.appService.saveObject('SYSROLEUSER', employeeroleArr).subscribe(res => {
      if (res.CODE === '0') {
        SysemployeeBusiness.msgService.success('保存成功');
      } else if (res.CODE === '1') {
        SysemployeeBusiness.msgService.error('保存失败')
      }
    })
  }
  /**
  * 将修改的员工的角色添加到数据库
  * @param obj 
  */
 static editEmployeerole(obj) {
    return SysemployeeBusiness.appService.saveObject('SYSROLEUSER', obj).subscribe(res => {
      if (res.CODE === '0') {
        SysemployeeBusiness.msgService.success('保存成功');
      } else if (res.CODE === '1') {
        SysemployeeBusiness.msgService.error('保存失败')
      }
    })
  }
}