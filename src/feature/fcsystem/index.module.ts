import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routers } from './index.route';
import { FccoreModule } from 'fccore2';
import { FccomponentModule } from 'fccomponent2';
import { SysmessageService } from './services/sysmessage.service';
import { HomeComponent } from './components/home/home.component';
import { SysroleComponent } from './components/sysrole/sysrole.component';
import { SysmessagedetailComponent } from './components/core/sysmessagedetail.component';
import { SysappComponent } from './components/sysapp/sysapp.component';
import { SysproductComponent } from './components/sysproduct/sysproduct.component';
import { SysmenuComponent } from './components/sysmenu/sysmenu.component';
import { SysappeditComponent } from './components/sysapp/sysappedit.component';
import { SyswizardComponent } from './components/syswizard/syswizard.component';
import { MenueditdialogComponent } from './components/dialog/menueditdialog.component';
import { SysappmodalrelationdialogComponent } from './components/dialog/sysappmodalrelationdialog.component';
import { SysappmodaleventdialogComponent } from './components/dialog/sysappmodaleventdialog.component';
import { SysdatasourceComponent } from './components/sysdatasource/sysdatasource.component';
import { SysserviceComponent } from './components/sysservice/sysservice.component';
import { SysfuncComponent } from './components/sysfunc/sysfunc.component';
import { SysproducteditComponent } from './components/sysproduct/sysproductedit.component';
import { SysdatasourceeditComponent } from './components/sysdatasource/sysdatasourceedit.component';
import { SysicondialogComponent } from './components/dialog/sysicondialog.component';
import { DialogCardListComponent } from './components/dialog/dialogcardlist.component';
import { SysserviceeditComponent } from './components/sysservice/sysserviceedit.component';
import { SysinterfaceeditComponent } from './components/sysinterface/sysinterfaceedit.component';
import { SysappmodifyComponent } from './components/sysapp/sysappmodify.component';
import { SysfunceditComponent } from './components/sysfunc/sysfuncedit.component';
import { SysvieweditComponent } from './components/sysfunc/sysviewedit.component';
import { SysviewelementeditComponent } from './components/sysfunc/sysviewelementedit.component';
import { SysappfieldgroupdialogComponent } from './components/dialog/sysappfieldgroupdialog.component';
import { SysattributeeditdialogComponent } from './components/dialog/sysattributeEditdialog.component';
import { SysinterfaceparametersdialogComponent } from './components/dialog/sysinterfaceparametersdialog.component';
import { SysinterfacereturnvaluedialogComponent } from './components/dialog/sysinterfacereturnvaluedialog.component';
import { SysviewelementeditdialogComponent } from './components/dialog/sysviewelementeditdialog.component';
import { SyscompanyComponent } from './components/syscompany/syscompany.component';
import { SysdepartmentComponent } from './components/sysdepartment/sysdepartment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SysemployeeComponent } from './components/sysemployee/sysemployee.component';
import { SysemployeeeditComponent } from './components/sysemployee/sysemployeeedit.component';
import { SyscompanyaddComponent } from './components/syscompany/syscompanyadd.component';
import { SyscompanychangeComponent } from './components/syscompanychange/syscompanychange.component';
import { SyssetupdialogComponent } from './components/dialog/syssetupdialog.component';
import { SysadjustdialogComponent } from './components/dialog/sysadjustdialog.component';
import { SyscanceldialogComponent } from './components/dialog/syscanceldialog.component';
import { SystansferdialogComponent } from './components/dialog/systansferdialog.component';
import { SysdepartmentaddComponent } from './components/sysdepartment/sysdepartmentadd.component';
import { SysdepartmenteditComponent } from './components/sysdepartment/sysdepartmentedit.component';
import { DepartmenttransferdialogComponent } from './components/dialog/departmenttransferdialog.component';
import { DepartmentcanceldialogComponent } from './components/dialog/departmentcanceldialog.component';
import { SysdepartmentDetailComponent } from './components/sysdepartment/sysdepartmentdetail.component';
import { SyscompanycanceldialogComponent } from './components/dialog/syscompanycanceldialog.component';
import { syscompanytransferdialogComponent } from './components/dialog/syscompanytransferdialog.component';
import { SyscompanyeditComponent } from './components/syscompany/syscompanyedit.component';
import { SyscompanydetailComponent } from './components/syscompany/syscompanydetail.component';
import { SysorganizationdimensionComponent } from './components/sysorganizationdimension/sysorganizationdimension.component';
import { SysorganizationdimensioneditComponent } from './components/sysorganizationdimension/sysorganizationdimensionedit.component';
import { SyscompanyrelationComponent } from './components/syscompanyrelation/syscompanyrelation.component';
import { SyscompanyrelationtransferdialogComponent } from './components/dialog/syscompanyrelationtransferdialog.component';
import { SyscompanyrelationdeletedialogComponent } from './components/dialog/syscompanyrelationdeletedialog.component';
import { CompanyrelationtransferdialogComponent } from './components/dialog/companyrelationtransferdialog.component';
import { CompanyrelationdeletedialogComponent } from './components/dialog/companyrelationdeletedialog.component';
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
    SysappComponent,
    SysappeditComponent,
    SysappmodifyComponent,
    SysappfieldgroupdialogComponent,
    SysappmodalrelationdialogComponent,
    SysproductComponent,
    SysproducteditComponent,
    SysroleComponent,
    SysmessagedetailComponent,
    HomeComponent,
    SysmenuComponent,
    SysappeditComponent,
    SyswizardComponent,
    SysdatasourceComponent,
    SysserviceComponent,
    SysfuncComponent,
    MenueditdialogComponent,
    SysattributeeditdialogComponent,
    SysdatasourceeditComponent,
    SysserviceeditComponent,
    SysinterfaceeditComponent,
    SysinterfaceparametersdialogComponent,
    SysinterfacereturnvaluedialogComponent,
    SysfunceditComponent,
    SysvieweditComponent,
    SysviewelementeditComponent,
    SysicondialogComponent,
    DialogCardListComponent,
    SysappmodaleventdialogComponent,
    SysviewelementeditdialogComponent,
    SyscompanyComponent,
    SysdepartmentComponent,
    SysdepartmentDetailComponent,
    SysdepartmentaddComponent,
    SysdepartmenteditComponent,
    SysemployeeComponent,
    SysemployeeeditComponent,
    ProfileComponent,
    SyscompanyaddComponent,
    SyscompanyeditComponent,
    DepartmenttransferdialogComponent,
    DepartmentcanceldialogComponent,
    SyscompanycanceldialogComponent,
    syscompanytransferdialogComponent,
    SyscompanydetailComponent,
    SysorganizationdimensionComponent,
    SysorganizationdimensioneditComponent,
    SyscompanychangeComponent,
    SyscompanyrelationComponent,
    SyscompanyrelationtransferdialogComponent,
    SyscompanyrelationdeletedialogComponent,
    CompanyrelationtransferdialogComponent,
    CompanyrelationdeletedialogComponent,
    SyssetupdialogComponent,
    SysadjustdialogComponent,
    SyscanceldialogComponent,
    SystansferdialogComponent
  ],
  providers: [
    SysmessageService
  ]
})
export class SystemModule {

}
