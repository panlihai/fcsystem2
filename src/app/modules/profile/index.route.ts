import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { SysassignmentComponent } from './sysassignment.component';
import { SysmessagedetailComponent } from './sysmessagedetail.component';
import { SysmessageComponent } from './sysmessage.component';
import { SystelsmsComponent } from './systelsms.component';
import { SysuserComponent } from './sysuser.component';
import { SysworkplanComponent } from './sysworkplan.component';
export const Routers: Routes = [
    {
        path: 'profile',
        component: ProfileComponent
    }
    , {
        path: 'system/sysassignmentList',
        component: SysassignmentComponent
    },{
        path: 'system/sysmessageList',
        component: SysmessageComponent
    },{
        path: 'system/sysmessageDetail',
        component: SysmessagedetailComponent
    },{
        path: 'system/systelsmsList',
        component: SystelsmsComponent
    },{
        path: 'system/sysworkplanList',
        component: SysworkplanComponent
    },{
        path: 'system/sysuserList',
        component: SysuserComponent
    } 
];
