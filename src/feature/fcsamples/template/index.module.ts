import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { templateRouters } from './index.route';
import { FcbasicModule, FclayoutModule, FcadModule, FcnavModule, FclistModule, FctlbModule, FcchartModule } from 'fccomponent2';
import { TemplateformComponent } from './component/templateform.component';
import { TemplatemodaltreeformlistsComponent } from './component/templatemodaltreeformlists.component';
import { TemplatemodalformlistsComponent } from './component/templatemodalformlists.component';
import { TemplatemodaltreeformComponent } from './component/templatemodaltreeform.component';
import { TemplatemodallistsComponent } from './component/templatemodallists.component';
import { TemplatemodalformComponent } from './component/templatemodalform.component';
import { TemplatetreeformlistsComponent } from './component/templatetreeformlists.component';
import { TemplatetreelistsComponent } from './component/templatetreelists.component';
import { TemplateformlistsComponent } from './component/templateformlists.component';
import { TemplatetabformComponent } from './component/templatetabform.component';
import { TemplatehomeComponent } from './component/templatehome.component';
import { TemplatesigninComponent } from './component/templatesignin.component';
import { TemplatesignupComponent } from './component/templatesignup.component';
import { TemplatelistComponent } from './component/templatelist.component';
import { TemplatetreeformsComponent } from './component/templatetreeforms.component';
import { TemplatevalidateComponent } from './component/templatevalidate.component';
import { TemplatetablistComponent } from './component/templatetablist.component';
import { TemplatetreetablistComponent } from './component/templatetreetablist.component';
import { TemplatefastpositionComponent } from './component/templatefastposition.component';
import { TemplatemodaltreelistsComponent } from './component/templatemodaltreelists.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(templateRouters),
    FcbasicModule,
    FclayoutModule,
    FcadModule,
    FcnavModule,
    FclistModule,
    FcchartModule,
    FctlbModule,
    NgZorroAntdModule
  ],
  exports: [

  ],
  declarations: [
    TemplatelistComponent,
    TemplateformComponent,
    TemplatetreeformsComponent,
    TemplatemodaltreeformlistsComponent,
    TemplatemodalformlistsComponent,
    TemplatemodaltreelistsComponent,
    TemplatemodaltreeformComponent,
    TemplatemodallistsComponent,
    TemplatemodalformComponent,
    TemplatetreeformlistsComponent,
    TemplatetreelistsComponent,
    TemplateformlistsComponent,
    TemplatefastpositionComponent,
    TemplatetabformComponent,
    TemplatehomeComponent,
    TemplatesigninComponent,
    TemplatesignupComponent,
    TemplatevalidateComponent,
    TemplatetablistComponent,
    TemplatetreetablistComponent
  ],
  providers: [

  ]
})
export class TemplateModule { }
