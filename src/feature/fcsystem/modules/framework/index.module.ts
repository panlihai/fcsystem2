import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FccoreModule } from 'fccore2';
import { SysappComponent } from './sysapp.component';
import { SysappeditComponent } from './sysappedit.component';
import { Routers } from './index.route';
import { FccomponentModule } from 'fccomponent2';
import { SysappmodifyComponent } from './sysappmodify.component'; 
import { SysappmodalrelationdialogComponent } from './dialog/sysappmodalrelationdialog.component';
import { DialogCardListComponent } from './dialog/dialogcardlist.component';
import { MenueditdialogComponent } from './dialog/menueditdialog.component';
import { SysappmodaleventdialogComponent } from './dialog/sysappmodaleventdialog.component';
import { SysattributeeditdialogComponent } from './dialog/sysattributeEditdialog.component';
import { SysdatasourceComponent } from './sysdatasource.component';
import { SysdatasourceeditComponent } from './sysdatasourceedit.component';
import { SysdicComponent } from './sysdic.component';
import { SysfuncComponent } from './sysfunc.component';
import { SysfunceditComponent } from './sysfuncedit.component';
import { SysicondialogComponent } from './sysicondialog.component';
import { SysinterfaceeditComponent } from './sysinterfaceedit.component';
import { SysinterfaceparametersdialogComponent } from './dialog/sysinterfaceparametersdialog.component';
import { SysinterfacereturnvaluedialogComponent } from './dialog/sysinterfacereturnvaluedialog.component';
import { SysmenuComponent } from './sysmenu.component';
import { SysproductComponent } from './sysproduct.component';
import { SysproducteditComponent } from './sysproductedit.component';
import { SysserviceComponent } from './sysservice.component';
import { SysserviceeditComponent } from './sysserviceedit.component';
import { SysvieweditComponent } from './sysviewedit.component';
import { SysviewelementeditComponent } from './sysviewelementedit.component';
import { SysviewelementeditdialogComponent } from './dialog/sysviewelementeditdialog.component';
import { SysappfieldgroupdialogComponent } from './dialog/sysappfieldgroupdialog.component';
 
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
    SysappComponent,
    SysappeditComponent,
    SysappmodifyComponent,
    SysappfieldgroupdialogComponent,
    SysappmodalrelationdialogComponent,
    SysattributeeditdialogComponent,
    DialogCardListComponent,
    MenueditdialogComponent,
    SysappmodalrelationdialogComponent,
    SysappmodaleventdialogComponent,
    SysdatasourceComponent,
    SysdatasourceeditComponent,
    SysdicComponent,
    SysfuncComponent,
    SysfunceditComponent,
    SysicondialogComponent,
    SysinterfaceeditComponent,
    SysinterfaceparametersdialogComponent,
    SysinterfacereturnvaluedialogComponent,
    SysmenuComponent,
    SysproductComponent,
    SysproducteditComponent,
    SysserviceComponent,
    SysserviceeditComponent,
    SysvieweditComponent,
    SysviewelementeditComponent,
    SysviewelementeditdialogComponent,
  ]
})
export class FcsystemframeworkModule{
}
