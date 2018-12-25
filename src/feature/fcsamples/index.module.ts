import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routers } from './index.route';
import { ComponentService } from './services/component.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FccomponentModule } from 'fccomponent2';
import { FccoreModule } from 'fccore2';
@NgModule({
  imports: [
    RouterModule.forChild(Routers),
    NgZorroAntdModule,
    FccoreModule,
    FccomponentModule
  ],
  exports: [

  ],
  declarations: [
  ],
  providers: [
    ComponentService
  ]
})
export class FcsamplesModule { }
