import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routers } from './index.route';
import { ComponentService } from './services/component.service';
import { FccoreModule } from 'fccore2'; 
import { NgZorroAntdModule } from 'ng-zorro-antd';
@NgModule({
  imports: [
    RouterModule.forChild(Routers),
    FccoreModule,
    NgZorroAntdModule
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
