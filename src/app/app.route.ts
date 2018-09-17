import { Routes } from '@angular/router';
import { UserService } from 'fccore2';
import { SigninComponent } from './components/signin/signin.component';
import { ErrorComponent } from './components/error/error.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { LockscreenComponent } from './components/lockscreen/lockscreen.component'; 
import { LayoutComponent } from './components/layout/layout.component';
export const AppRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [UserService],
        children: [
            {
                path: 'error',//错误
                component: ErrorComponent
            },
            {
                path: '',//例子
                loadChildren: 'fcfa/index.module#FcfaModule'
            },
            {
                path: 'system',//平台功能
                loadChildren: 'fcsystem/index.module#SystemModule'
            }
        ]
    }
    , {
        path: 'signin',
        component: SigninComponent
    }, {
        path: 'forgot',//忘记密码
        component: ForgotComponent,
    }, {
        path: 'lockscreen',//锁屏
        component: LockscreenComponent
    }
];
