import * as router from '@angular/router';
import { SyscompanydimComponent } from './companydim/syscompanydim.component'; 
import { SyscompanyComponent } from './syscompany.component';
import { SyscompanydimeditComponent } from './companydim/syscompanydimedit.component'; 
import { SysdepartmentComponent } from './department/sysdepartment.component';
import { SysdepartmenteditComponent } from './department/sysdepartmentedit.component';

export const Routers: router.Routes = [
    {
        path: 'syscompanydimList',
        component: SyscompanydimComponent
    }, 

    {
        path: 'syscompanydimEdit',
        component: SyscompanydimeditComponent
    },
    {
        path: 'sysdepartmentList',
        component: SysdepartmentComponent
    },
 
    {
        path: 'syscompanyList',
        component: SyscompanyComponent
    },
    {
        path: 'sysdepartmentEdit',
        component: SysdepartmenteditComponent
       
    },

];
