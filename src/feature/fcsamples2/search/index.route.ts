import { Routes } from '@angular/router';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
export const searchRouters: Routes = [
    {
        path:'system/fcsearchbarList',//全文查询
        component: SearchbarComponent
    }, {
        path:'system/fcsearchboxList',//列表查询
        component: SearchboxComponent
    }
];
