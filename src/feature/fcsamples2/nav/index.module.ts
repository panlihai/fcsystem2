import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { navRouters } from './index.route';
import { NavbarComponent } from './navbar/navbar.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { NavsideComponent } from './navside/navside.component';
import { NavtabComponent } from './navtab/navtab.component';
import { FcbasicModule, FclayoutModule, FcadModule, FcnavModule, FclistModule } from 'fccomponent2';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(navRouters),
    FcbasicModule,
    FclayoutModule,
    FcadModule,
    FcnavModule, 
    FclistModule
  ],
  exports: [

  ],
  declarations: [
    NavbarComponent,
    NavmenuComponent,
    NavsideComponent,
    NavtabComponent
  ],
  providers: [

  ]
})
export class NavModule { }
