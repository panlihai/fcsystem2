import { Routes } from '@angular/router';
import { SysroleComponent } from './role/sysrole.component';
import { SyscompanyComponent } from './company/syscompany.component';
import { SysdepartmentComponent } from './department/sysdepartment.component';
import { SysdepartmentDetailComponent } from './department/sysdepartmentdetail.component';
import { SysdepartmentaddComponent } from './department/sysdepartmentadd.component';
import { SysdepartmenteditComponent } from './department/sysdepartmentedit.component';
import { SysemployeeComponent } from './employee/sysemployee.component';
import { SysemployeeeditComponent } from './employee/sysemployeeedit.component';
import { SyscompanyaddComponent } from './company/syscompanyadd.component';
import { SyscompanyeditComponent } from './company/syscompanyedit.component';
import { SyscompanydetailComponent } from './company/syscompanydetail.component';
import { SysorgdimrelationComponent } from './company/sysorgdimrelation.component';
import { SysorgdimrelationeditComponent } from './company/sysorgdimrelationedit.component';
import { SyscompanyrelationComponent } from './company/syscompanyrelation.component';
import { SyscontactComponent } from './employee/syscontact.component';

export const Routers: Routes = [ 
   
    {
        path: 'sysroleList',//角色
        component: SysroleComponent
    }
   
    , {
        path: 'syscompanyList',//单位
        component: SyscompanyComponent
    }
    , {
        path: 'sysdepartmentList',//部门
        component: SysdepartmentComponent
    }
    , {
        path: 'sysdepartmentView',//部门查看
        component: SysdepartmentDetailComponent
    }
    , {
        path: 'sysdepartmentAdd',//部门新增
        component: SysdepartmentaddComponent
    }
    , {
        path: 'sysdepartmentEdit',//部门修改
        component: SysdepartmenteditComponent
    }
    , {
        path: 'sysemployeeList',//员工管理
        component: SysemployeeComponent
    }, {
        path: 'sysemployeeEdit',//员工编辑
        component: SysemployeeeditComponent
    }
    
    , {
        path: 'syscompanyAdd',//单位设立
        component: SyscompanyaddComponent
    }
    , {
        path: 'syscompanyEdit',//单位调整
        component: SyscompanyeditComponent
    }
    , {
        path: 'syscompanyDetail',//单位查看
        component: SyscompanydetailComponent
    }
    , {
        path: 'sysorgdimList',//组织维度
        component: SysorgdimrelationComponent,
    }, {
        path: 'syscompanydimEdit',//组织维度编辑
        component: SysorgdimrelationeditComponent,
    }
    , {
        path: 'syscompanyrelationList',
        component: SyscompanyrelationComponent,
    },  {
        path: 'syscontactList',
        component: SyscontactComponent,
    },{
        path:'sysdepartmentdimList',
        component:SysdepartmentComponent
    }
];
