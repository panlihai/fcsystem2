import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styles: [``]
})
export class TextareaComponent extends ComponentParent {
  fcOption:any[]=[{
    APPNAME:'模型1',
    APPID:"ID1",
  },{
    APPNAME:'模型2',
    APPID:"ID2",
  },{
    APPNAME:'模型3',
    APPID:"ID3",
  },{
    APPNAME:'模型4',
    APPID:"ID4",
  }];
  content: string;
  basicjs: string = `
  import { Component, OnInit } from '@angular/core';
  @Component({
    selector: 'textarea',
    templateUrl: './textarea.component.html',
    styleUrl:'./textarea.component.css'
  })
  export class TextareaComponent{
    content: string;
  }
  `
  constructor(public mainService: ComponentService) {
    super('FCTEXTAREA', mainService);
    this.content = '文本内容';
  }
}