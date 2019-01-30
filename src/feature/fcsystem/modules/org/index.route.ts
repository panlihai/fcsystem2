import { Routes } from '@angular/router';
import { SyscompanydimComponent } from './companydim/syscompanydim.component'; 
import { SyscompanyComponent } from "./company/SyscompanyComponent";
import { SysdepartmentComponent } from './sysdepartment.component';
import { SyscompanydimeditComponent } from './companydim/syscompanydimedit.component';
import { SyscompanyeditComponent } from './company/syscompanyedit.component';
import { SyscompanydetailComponent } from './company/syscompanydetail.component';
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
    } , {
        path: 'syscompanyDetail',
        component: SyscompanydetailComponent
    } 
];
