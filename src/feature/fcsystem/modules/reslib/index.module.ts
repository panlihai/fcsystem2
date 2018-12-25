import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FccoreModule } from 'fccore2';
import { Routers } from './index.route';
import { FccomponentModule } from 'fccomponent2';
import { SysreslibComponent } from './sysreslib.component';
import { SysreslibpicComponent } from './sysreslibpic.component';
import { SysreslibthumbnailComponent } from './sysreslibthumbnail.component';
 
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
   SysreslibComponent,
   SysreslibpicComponent,
   SysreslibthumbnailComponent
  ]
})
export class FcsystemreslibModule {
}
