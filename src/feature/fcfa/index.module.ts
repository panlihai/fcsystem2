import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routers } from './index.route';
import { FccoreModule } from 'fccore2';
import { FccomponentModule } from 'fccomponent2';
import { FahomeComponent } from './components/home/home.component';
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
    FahomeComponent
  ],
  providers: [

  ]
})
export class FcfaModule {

}
