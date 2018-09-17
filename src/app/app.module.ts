import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageService } from 'ng-zorro-antd'; 
import { FormsModule } from '@angular/forms';
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
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SigninComponent,
    SignupComponent,
    ErrorComponent,
    LockscreenComponent,
    ForgotComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    FccoreModule,
    FccomponentModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: FcRouterService },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public service: NzMessageService, public systemService: SystemService) {
    MessageService.sender = service;
  }
}
