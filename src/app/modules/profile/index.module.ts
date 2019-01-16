import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FccoreModule } from 'fccore2';
import { Routers } from './index.route';
import { ProfileComponent } from './profile.component';
import { SysassignmentComponent } from './sysassignment.component';
import { SysmessageComponent } from './sysmessage.component';
import { SysmessagedetailComponent } from './sysmessagedetail.component';
import { SystelsmsComponent } from './systelsms.component';  
import { FccomponentModule } from 'fccomponent2';
import { SysworkplanComponent } from './sysworkplan.component';

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

  ],
  declarations: [
   ProfileComponent,
   SysassignmentComponent,
   SysmessageComponent,
   SysmessagedetailComponent,
   SystelsmsComponent, 
   SysworkplanComponent,

  ]
})
export class FcprofileModule {
}
