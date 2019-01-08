import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FccoreModule } from 'fccore2';
import { SysappComponent } from './sysapp/sysapp.component';
import { SysappeditComponent } from './sysapp/sysappedit.component';
import { Routers } from './index.route';
import { FccomponentModule } from 'fccomponent2';
import { SysappmodifyComponent } from './sysapp/sysappmodify.component'; 
import { SysappmodalrelationdialogComponent } from './dialog/sysappmodalrelationdialog.component';
import { DialogCardListComponent } from './dialog/dialogcardlist.component';
import { MenueditdialogComponent } from './dialog/menueditdialog.component';
import { SysappmodaleventdialogComponent } from './dialog/sysappmodaleventdialog.component';
import { SysattributeeditdialogComponent } from './dialog/sysattributeEditdialog.component';
import { SysdatasourceComponent } from './sysdatabase/sysdatasource.component';
import { SysdatasourceeditComponent } from './sysdatabase/sysdatasourceedit.component';
import { SysdicComponent } from './sysdic/sysdic.component';
import { SysfuncComponent } from './sysfunc/sysfunc.component';
import { SysfunceditComponent } from './sysfunc/sysfuncedit.component';
import { SysicondialogComponent } from './dialog/sysicondialog.component';
import { SysinterfaceeditComponent } from './sysservice/sysinterfaceedit.component';
import { SysinterfaceparametersdialogComponent } from './dialog/sysinterfaceparametersdialog.component';
import { SysinterfacereturnvaluedialogComponent } from './dialog/sysinterfacereturnvaluedialog.component';
import { SysmenuComponent } from './sysmenu/sysmenu.component';
import { SysproductComponent } from './sysproduct/sysproduct.component';
import { SysproducteditComponent } from './sysproduct/sysproductedit.component';
import { SysserviceComponent } from './sysservice/sysservice.component';
import { SysserviceeditComponent } from './sysservice/sysserviceedit.component';
import { SysvieweditComponent } from './sysfunc/sysviewedit.component';
import { SysviewelementeditComponent } from './sysfunc/sysviewelementedit.component';
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
