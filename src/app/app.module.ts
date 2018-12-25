import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { AppRoutes } from './app.route';
import { HttpModule } from '@angular/http';
import { FcRouterService } from './services/router.service';
import { MessageService, FccoreModule } from 'fccore2';
import { ErrorComponent } from './components/error/error.component';
import { LockscreenComponent } from './components/lockscreen/lockscreen.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SystemService } from './services/services.services';
import { FccomponentModule } from 'fccomponent2';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import {  NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS,NgZorroAntdModule, NZ_I18N, zh_CN, NzIconService,NzMessageService } from 'ng-zorro-antd';
import { HomeComponent } from './components/home/home.component';
import { OverlayModule } from '@angular/cdk/overlay';

const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SigninComponent,
    SignupComponent,
    ErrorComponent,
    LockscreenComponent,
    ForgotComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    FccoreModule,
    FccomponentModule
  ],
  providers: [ 
    { provide: RouteReuseStrategy, useClass: FcRouterService },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // 不提供的话，即为 Ant Design 的主题蓝色
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public service: NzMessageService
    , public systemService: SystemService
    ,private _iconService: NzIconService) {
    MessageService.sender = service;
    // this._iconService.fetchFromIconfont({
    //   scriptUrl: '../assets/fonts/iconfont/iconfont.js'
    // });
  }
}
