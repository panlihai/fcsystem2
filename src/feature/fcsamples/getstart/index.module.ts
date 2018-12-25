import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { getstartRouters } from './index.route';
import { FcbasicModule, FclayoutModule, FcadModule, FcnavModule, FclistModule } from 'fccomponent2';
import { GetstartComponent } from './getstart.component';
import { GetstartdetailComponent } from './getstartdetail.component';
import { GetstarteditComponent } from './getstartedit.component';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(getstartRouters),
    FcbasicModule,
    FclayoutModule,
    FcadModule, 
    FcnavModule,
    FclistModule
  ],
  exports: [ 

  ],
  declarations: [
    GetstartComponent,
    GetstartdetailComponent,
    GetstarteditComponent
  ],
  providers: [

  ]
})
export class GetstartModule { }
