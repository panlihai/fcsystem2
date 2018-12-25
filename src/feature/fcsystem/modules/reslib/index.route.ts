import { Routes } from '@angular/router';
import { SysreslibComponent } from './sysreslib.component';
import { SysreslibpicComponent } from './sysreslibpic.component';
import { SysreslibthumbnailComponent } from './sysreslibthumbnail.component';

export const Routers: Routes = [
    {
        path: 'sysreslibList',
        component: SysreslibComponent
    }
    , {
        path: 'sysreslibpicList',
        component: SysreslibpicComponent
    },{
        path: 'sysreslibthumbnailList',
        component: SysreslibthumbnailComponent
    }
];
