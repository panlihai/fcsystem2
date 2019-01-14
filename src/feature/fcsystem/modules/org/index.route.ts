import { Routes } from '@angular/router';
import { SyscompanydimComponent } from './companydim/syscompanydim.component'; 
import { SyscompanyComponent } from './syscompany.component';
import { SysdepartmentComponent } from './sysdepartment.component';
import { SyscompanydimeditComponent } from './companydim/syscompanydimedit.component';
export const Routers: Routes = [
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
    }, {
        path: 'syscompanyList',
        component: SyscompanyComponent
    }
];
