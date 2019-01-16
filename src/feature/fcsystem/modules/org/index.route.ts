import { Routes } from '@angular/router';
import { SyscompanydimComponent } from './companydim/syscompanydim.component'; 
import { SyscompanyComponent } from './company/syscompany.component';
import { SysdepartmentComponent } from './sysdepartment.component';
import { SyscompanydimeditComponent } from './companydim/syscompanydimedit.component';
import { SyscompanyeditComponent } from './company/syscompanyedit.component';
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
    }, {
        path: 'syscompanyEdit',
        component: SyscompanyeditComponent
    } 
];
