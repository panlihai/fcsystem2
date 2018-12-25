import { Routes } from '@angular/router';

import { SysbackcodeComponent } from './sysbackcode.component';
import { SysbizcoderuleComponent } from './sysbizcoderule.component';
import { SysiconComponent } from './sysicon.component';
import { SysparamComponent } from './sysparam.component';
import { SysregionComponent } from './sysregion.component';
import { SyssessionComponent } from './syssession.component';
import { SysversionComponent } from './sysversion.component';
import { SyswizardComponent } from './syswizard.component';
export const Routers: Routes = [
    {
        path: 'sysbackcodeList',
        component: SysbackcodeComponent
    },
    {
        path: 'sysbizcoderuleList',
        component: SysbizcoderuleComponent
    },
    {
        path: 'sysiconList',
        component: SysiconComponent
    },
    {
        path: 'sysparamList',
        component: SysparamComponent
    },
    {
        path: 'sysregionList',
        component: SysregionComponent
    },
    {
        path: 'syssessionList',
        component: SyssessionComponent
    },
    {
        path: 'sysversionList',
        component: SysversionComponent
    },
    {
        path: 'syswizardList',
        component: SyswizardComponent
    },

];
