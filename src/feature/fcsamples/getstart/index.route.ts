import { Routes } from '@angular/router';
import { GetstartComponent } from './getstart.component';
import { GetstarteditComponent } from './getstartedit.component';
import { GetstartdetailComponent } from './getstartdetail.component';
export const getstartRouters: Routes = [
    {
        path:'system/fcgetstartList',//getstart
        component: GetstartComponent
    },
    {
        path:'system/fcgetstartEdit',//getstart
        component: GetstarteditComponent
    },
    {
        path:'system/fcgetstartDetail',//getstart
        component: GetstartdetailComponent
    }
];
