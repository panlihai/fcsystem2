import { Routes } from '@angular/router';
import { SysproductComponent } from './sysproduct/sysproduct.component';
import { SysproducteditComponent } from './sysproduct/sysproductedit.component';
import { SysmenuComponent } from './sysmenu/sysmenu.component';
import { SysdatasourceComponent } from './sysdatabase/sysdatasource.component';
import { SysdatasourceeditComponent } from './sysdatabase/sysdatasourceedit.component';
import { SysserviceComponent } from './sysservice/sysservice.component';
import { SysserviceeditComponent } from './sysservice/sysserviceedit.component';
import { SysinterfaceeditComponent } from './sysservice/sysinterfaceedit.component';
import { SysfuncComponent } from './sysfunc/sysfunc.component';
import { SysfunceditComponent } from './sysfunc/sysfuncedit.component';
import { SysvieweditComponent } from './sysfunc/sysviewedit.component';
import { SysviewelementeditComponent } from './sysfunc/sysviewelementedit.component';
import { SysdicComponent } from './sysdic/sysdic.component';
import { SysappComponent } from './sysapp/sysapp.component';
import { SysappeditComponent } from './sysapp/sysappedit.component';
import { SysappmodifyComponent } from './sysapp/sysappmodify.component';
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
