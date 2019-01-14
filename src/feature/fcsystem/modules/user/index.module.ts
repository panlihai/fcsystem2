import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FccoreModule, DaoService, AppService } from 'fccore2';
import { Routers } from './index.route';
import { FccomponentModule } from 'fccomponent2';
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
  ]
})
export class FcsystemorgModule {
  constructor(){
    
  }
}
