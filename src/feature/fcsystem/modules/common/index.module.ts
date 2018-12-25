import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routers } from './index.route'; 
import { FccoreModule } from 'fccore2';
import { FccomponentModule } from 'fccomponent2';
import { SysbackcodeComponent } from './sysbackcode.component';
import { SysbizcoderuleComponent } from './sysbizcoderule.component';
import { SysiconComponent } from './sysicon.component';
import { SysparamComponent } from './sysparam.component';
import { SysregionComponent } from './sysregion.component';
import { SyssessionComponent } from './syssession.component';
import { SysversionComponent } from './sysversion.component';
import { SyswizardComponent } from './syswizard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(Routers),
    FccoreModule,
    FccomponentModule
  ],
  declarations: [
   
    SysbackcodeComponent,
    SysbizcoderuleComponent,
    SysiconComponent,
    SysparamComponent,
    SysregionComponent,
    SyssessionComponent,
    SysversionComponent,
    SyswizardComponent,
  ]
})
export class FcsystemcommonModule {
}
