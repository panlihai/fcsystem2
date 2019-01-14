import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FccoreModule, DaoService, AppService } from 'fccore2';
import { Routers } from './index.route';
import { FccomponentModule } from 'fccomponent2';
import { SyscompanydimComponent } from './companydim/syscompanydim.component';
import { SyscompanyComponent } from './syscompany.component';
import { SysdepartmentComponent } from './sysdepartment.component';
import SystemBusiness from 'fccore2/classes/system.business';
import { SyscompanydimeditComponent } from './companydim/syscompanydimedit.component';
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
   SyscompanydimComponent,
   SyscompanydimeditComponent,
   SyscompanyComponent,
   SysdepartmentComponent
  ]
})
export class FcsystemorgModule {
  constructor(){
    
  }
}
