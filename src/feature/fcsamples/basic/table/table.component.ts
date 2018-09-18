import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
import { FctableOption } from 'fccomponent2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [``]
})
export class TableComponent extends ComponentParent {
  tableOption : any={}
  now = new Date();
  nownull = '';
  constructor(public mainService: ComponentService) {
    super('FCTIME', mainService);
    this.tableOption= { 
      fields: [{
        FIELDNAME:'名字','FIELDCODE':'NAME'}
        ,{FIELDNAME:'年龄','FIELDCODE':'AGE'},
        {FIELDNAME:'地址','FIELDCODE':'ADDRESS'}],
     data: [{'NAME':'东软','AGE':'code','ADDRESS':'西北旺'},{'NAME':'东软','AGE':'code','ADDRESS':'西北旺'},{'NAME':'东软','AGE':'code','ADDRESS':'西北旺'}]
     };
  }
}