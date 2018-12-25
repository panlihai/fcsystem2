import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


export const Routers: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },{
        path: '',
        loadChildren: './modules/common/index.module#FcsystemcommonModule'
    },{
        path: '',
        loadChildren: './modules/framework/index.module#FcsystemframeworkModule'
    },{
        path: '',
        loadChildren: './modules/org/index.module#FcsystemorgModule'
    },{
        path: '',
        loadChildren: './modules/reslib/index.module#FcsystemreslibModule'
    }
];
