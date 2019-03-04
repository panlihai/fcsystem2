import { Routes } from '@angular/router';
import { SysuserComponent } from './user/sysuser.component';
import { SysusereditComponent } from './user/sysuseredit.component';
export const Routers: Routes = [
  {
        path: 'sysuserList',
        component: SysuserComponent
    },
    {
        path: 'sysuserEdit',
        component: SysusereditComponent
    } 
];
