import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FccoreModule} from 'fccore2';
import { Routers } from './index.route';
import { FccomponentModule } from 'fccomponent2';
import { SysusereditComponent } from './user/sysuseredit.component';
import { SysuserComponent } from './user/sysuser.component';
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

  ] ,
  declarations: [
    SysuserComponent,
    SysusereditComponent
  ]
})
export class FcsystemuserModule {v
}
