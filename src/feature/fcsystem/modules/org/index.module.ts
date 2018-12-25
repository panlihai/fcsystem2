import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FccoreModule } from 'fccore2';
import { Routers } from './index.route';
import { FccomponentModule } from 'fccomponent2';
import { CompanyrelationdeletedialogComponent } from './dialog/companyrelationdeletedialog.component';
import { CompanyrelationtransferdialogComponent } from './dialog/companyrelationtransferdialog.component';
import { DepartmentcanceldialogComponent } from './dialog/departmentcanceldialog.component';
import { SysadjustdialogComponent } from './dialog/sysadjustdialog.component';
import { SyscompanyrelationtransferdialogComponent } from './dialog/syscompanyrelationtransferdialog.component';
import { DepartmenttransferdialogComponent } from './dialog/departmenttransferdialog.component';
import { SyscanceldialogComponent } from './dialog/syscanceldialog.component';
import { SyscompanycanceldialogComponent } from './dialog/syscompanycanceldialog.component';
import { SyscompanyrelationdeletedialogComponent } from './dialog/syscompanyrelationdeletedialog.component';
import { syscompanytransferdialogComponent } from './dialog/syscompanytransferdialog.component';
import { SysdepartmentSelectHigherdialogComponent } from './dialog/sysdepartmentSelectHigherdialog.component';
import { SyssetupdialogComponent } from './dialog/syssetupdialog.component';
import { SystransferdialogComponent } from './dialog/systransferdialog.component';
import { SyscompanychangeComponent } from './company/syscompanychange.component';
import { SyscompanyComponent } from './company/syscompany.component';
import { SyscompanyaddComponent } from './company/syscompanyadd.component';
import { SyscompanychangeauditComponent } from './company/syscompanychangeaudit.component';
import { SyscompanydetailComponent } from './company/syscompanydetail.component';
import { SyscompanyrelationComponent } from './company/syscompanyrelation.component';
import { SysdepartmentComponent } from './department/sysdepartment.component';
import { SysdepartmentaddComponent } from './department/sysdepartmentadd.component';
import { SysdepartmenteditComponent } from './department/sysdepartmentedit.component';
import { SyscompanyeditComponent } from './company/syscompanyedit.component';
import { SyscontactComponent } from './employee/syscontact.component';
import { SysdepartmentDetailComponent } from './department/sysdepartmentdetail.component';
import { SysemployeeComponent } from './employee/sysemployee.component';
import { SysemployeeeditComponent } from './employee/sysemployeeedit.component';
import { SysorganizationdimensionComponent } from './company/sysorganizationdimension.component';
import { SysorganizationdimensioneditComponent } from './company/sysorganizationdimensionedit.component';
import { SysorgdimrelationeditComponent } from './company/sysorgdimrelationedit.component';
import { SysorgdimrelationComponent } from './company/sysorgdimrelation.component';
import { SysroleComponent } from './role/sysrole.component';
import { SyscompanySelectHigherdialogComponent } from './dialog/syscompanySelectHigherdialog.component';
import { SysroleeditdialogComponent } from './dialog/sysroleeditdialog.component';
 
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
    CompanyrelationdeletedialogComponent,
    CompanyrelationtransferdialogComponent,
    DepartmentcanceldialogComponent,
    DepartmenttransferdialogComponent,
    SysadjustdialogComponent,
    SyscanceldialogComponent,
    SyscompanycanceldialogComponent,
    SyscompanyrelationdeletedialogComponent,
    SyscompanyrelationtransferdialogComponent,
    syscompanytransferdialogComponent,
    SyscompanySelectHigherdialogComponent,
    SyscompanyrelationtransferdialogComponent,
    SysdepartmentSelectHigherdialogComponent,
    SyssetupdialogComponent,
    SystransferdialogComponent,
    SyscompanyComponent,
    SyscompanyaddComponent,
    SyscompanychangeComponent,
    SyscompanychangeauditComponent,
    SyscompanydetailComponent,
    SyscompanyeditComponent,
    SyscompanyrelationComponent,
    SyscontactComponent,
    SysdepartmentComponent,
    SysdepartmentaddComponent,
    SysdepartmenteditComponent,
    SysdepartmentDetailComponent,
    SysemployeeComponent,
    SysemployeeeditComponent,
    SysorganizationdimensionComponent,
    SysorganizationdimensioneditComponent,
    SysorgdimrelationeditComponent,
    SysorgdimrelationComponent,
    SysroleComponent,
    SysroleeditdialogComponent,
  ]
})
export class FcsystemorgModule {
}
