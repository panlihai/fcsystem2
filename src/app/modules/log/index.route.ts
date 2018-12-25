import { Routes } from '@angular/router';

import { SyslogComponent } from './syslog.component';
import { SyslogcreateComponent } from './syslogcreate.component';
import { SyslogremoveComponent } from './syslogremove.component';
import { SyslogupdateComponent } from './syslogupdate.component';
export const Routers: Routes = [
    {
        path: 'system/syslogList',
        component: SyslogComponent
    }
    , {
        path: 'system/syslogcreateList',
        component: SyslogcreateComponent
    },{
        path: 'system/syslogremoveList',
        component: SyslogremoveComponent
    },{
        path: 'system/syslogupdateList',
        component: SyslogupdateComponent
    }
];
