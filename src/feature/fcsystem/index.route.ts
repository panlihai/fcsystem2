import { Routes } from '@angular/router';
import { SysroleComponent } from './components/sysrole/sysrole.component';
import { HomeComponent } from './components/home/home.component';
import { SysmessagedetailComponent } from './components/core/sysmessagedetail.component';
import { SysappComponent } from './components/sysapp/sysapp.component';
import { SysproductComponent } from './components/sysproduct/sysproduct.component';
import { SysmenuComponent } from './components/sysmenu/sysmenu.component';
import { SysappeditComponent } from './components/sysapp/sysappedit.component';
import { SyswizardComponent } from './components/syswizard/syswizard.component';
import { SysdatasourceComponent } from './components/sysdatasource/sysdatasource.component';
import { SysserviceComponent } from './components/sysservice/sysservice.component';
import { SysfuncComponent } from './components/sysfunc/sysfunc.component';
import { SysproducteditComponent } from './components/sysproduct/sysproductedit.component';
import { SysserviceeditComponent } from './components/sysservice/sysserviceedit.component';
import { SysinterfaceeditComponent } from './components/sysinterface/sysinterfaceedit.component';
import { SysappmodifyComponent } from './components/sysapp/sysappmodify.component';
import { SysfunceditComponent } from './components/sysfunc/sysfuncedit.component';
import { SysdatasourceeditComponent } from './components/sysdatasource/sysdatasourceedit.component';
import { SysvieweditComponent } from './components/sysfunc/sysviewedit.component';
import { SysviewelementeditComponent } from './components/sysfunc/sysviewelementedit.component';
import { SyscompanyComponent } from './components/syscompany/syscompany.component';
import { SysdepartmentComponent } from './components/sysdepartment/sysdepartment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SysemployeeComponent } from './components/sysemployee/sysemployee.component';
import { SysemployeeeditComponent } from './components/sysemployee/sysemployeeedit.component';
import { SyscompanyaddComponent } from './components/syscompany/syscompanyadd.component';
import { SyscompanyeditComponent } from './components/syscompany/syscompanyedit.component';
import { SysdepartmentaddComponent } from './components/sysdepartment/sysdepartmentadd.component';
import { SysdepartmenteditComponent } from './components/sysdepartment/sysdepartmentedit.component';
import { SysdepartmentDetailComponent } from './components/sysdepartment/sysdepartmentdetail.component';
import { SyscompanydetailComponent } from './components/syscompany/syscompanydetail.component';
import { SysorganizationdimensionComponent } from './components/sysorganizationdimension/sysorganizationdimension.component';
import { SysorganizationdimensioneditComponent } from './components/sysorganizationdimension/sysorganizationdimensionedit.component';
import { SyscompanychangeComponent } from './components/syscompanychange/syscompanychange.component';
import { SyscompanyrelationComponent } from './components/syscompanyrelation/syscompanyrelation.component';
export const Routers: Routes = [
    {
        path: 'home',
        component: HomeComponent
    }, {
        path: 'sysappList',//元数据
        component: SysappComponent
    }
    , {
        path: 'sysappEdit',//元数据编辑
        component: SysappeditComponent
    }, {
        path: 'sysappModify',//元数据修改
        component: SysappmodifyComponent
    }
    , {
        path: 'sysappModify',//元数据编辑
        component: SysappmodifyComponent
    }
    ,
    {
        path: 'sysproductList',//软件产品
        component: SysproductComponent
    }
    , {
        path: 'sysproductEdit',//软件产品
        component: SysproducteditComponent
    },
    {
        path: 'sysroleList',//系统参数
        component: SysroleComponent
    }, {
        path: 'sysmessageDetail',//消息查看
        component: SysmessagedetailComponent
    }, {
        path: 'sysmenuList',//导航栏列表
        component: SysmenuComponent
    }
    , {
        path: 'syswizardList',//概况
        component: SyswizardComponent
    }
    , {
        path: 'sysdatasourceList',//数据源
        component: SysdatasourceComponent
    },
    {
        path: 'sysdatasourceEdit',//数据源
        component: SysdatasourceeditComponent
    },
    {
        path: 'sysserviceList',//服务
        component: SysserviceComponent
    }, {
        path: 'sysserviceEdit',//服务编辑
        component: SysserviceeditComponent,
    }, {
        path: 'sysinterfaceEdit',//服务、模型的编辑接口
        component: SysinterfaceeditComponent
    }
    , {
        path: 'sysfuncList',//功能
        component: SysfuncComponent
    }
    , {
        path: 'sysfuncEdit',//功能编辑
        component: SysfunceditComponent
    }
    , {
        path: 'sysviewEdit',//视图
        component: SysvieweditComponent
    }
    , {
        path: 'sysviewelementEdit',//功能元素编辑
        component: SysviewelementeditComponent
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
        path: 'sysprofileList',//个人信息
        component: ProfileComponent
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
        path: 'syscompanydimList',//组织维度
        component: SysorganizationdimensionComponent,
    }, {
        path: 'syscompanydimEdit',//组织维度编辑
        component: SysorganizationdimensioneditComponent,
    }
    , {
        path: 'syscompanyrelationList',//单位维度关系
        component: SyscompanyrelationComponent,
    }
    // , {
    //     path: 'syscompanychangeList',//单位变更审批
    //     component: SyscompanychangeComponent,
    // }
];
