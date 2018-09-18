import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { searchRouters } from './index.route';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { FcbasicModule, FclayoutModule, FcadModule, FcnavModule, FclistModule, FcsearchModule } from 'fccomponent2';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(searchRouters),
    FcbasicModule,
    FclayoutModule,
    FcadModule,
    FcnavModule, 
    FclistModule,
    FcsearchModule
  ],
  exports: [

  ],
  declarations: [
    SearchbarComponent,
    SearchboxComponent
  ],
  providers: [

  ]
})
export class SearchModule { }
