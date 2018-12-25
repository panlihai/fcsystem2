import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FccoreModule } from 'fccore2';
import { Routers } from './index.route';
import { FccomponentModule } from 'fccomponent2';
import { SyslogComponent } from './syslog.component';
import { SyslogcreateComponent } from './syslogcreate.component';
import { SyslogremoveComponent } from './syslogremove.component';
import { SyslogupdateComponent } from './syslogupdate.component';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(Routers),
    FccoreModule,
    FccomponentModule
  ],
  exports: [

  ],entryComponents:[
  ],
  declarations: [
   SyslogComponent,
   SyslogcreateComponent,
   SyslogremoveComponent,
   SyslogupdateComponent,
  ]
})
export class FclogModule {
}
