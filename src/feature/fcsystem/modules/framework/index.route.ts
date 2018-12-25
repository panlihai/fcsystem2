import { Routes } from '@angular/router';
import { SysproductComponent } from './sysproduct.component';
import { SysproducteditComponent } from './sysproductedit.component';
import { SysmenuComponent } from './sysmenu.component';
import { SysdatasourceComponent } from './sysdatasource.component';
import { SysdatasourceeditComponent } from './sysdatasourceedit.component';
import { SysserviceComponent } from './sysservice.component';
import { SysserviceeditComponent } from './sysserviceedit.component';
import { SysinterfaceeditComponent } from './sysinterfaceedit.component';
import { SysfuncComponent } from './sysfunc.component';
import { SysfunceditComponent } from './sysfuncedit.component';
import { SysvieweditComponent } from './sysviewedit.component';
import { SysviewelementeditComponent } from './sysviewelementedit.component';
import { SysdicComponent } from './sysdic.component';
import { SysappComponent } from './sysapp.component';
import { SysappeditComponent } from './sysappedit.component';
import { SysappmodifyComponent } from './sysappmodify.component';
export const Routers: Routes = [
    {
        path: 'sysappList',
        component: SysappComponent
    }
    ,
    {
        path: 'sysappEdit',
        component: SysappeditComponent
    }
    , 
    {
        path: 'sysappModify',
        component: SysappmodifyComponent
    },
    {
        path: 'sysproductList',//软件产品
        component: SysproductComponent
    }
    , {
        path: 'sysproductEdit',//软件产品
        component: SysproducteditComponent
    }, {
        path: 'sysmenuList',//导航栏列表
        component: SysmenuComponent
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
    },{
        path: 'sysdicList',
        component: SysdicComponent
    }
];
