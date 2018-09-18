import { Component} from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
@Component({
  selector: 'templateformlists',
  templateUrl: './templateformlists.component.html',
  styles: [`
  
  `]
})
export class TemplateformlistsComponent extends ComponentParent {
  //文本框
  comboValue: string = 'a';
  comboOptions: any[] = [{ icon: '', label: 'A', value: 'a' }, { icon: '', label: 'B', value: 'b' }, { icon: '', label: 'C', value: 'c' }];
  //自定义下拉单选
  anyValue: any = { "label": "A", "value": "a", "disabled": false };
  anyOptions: any[] = [{ icon: '', label: 'A', value: 'a' }, { icon: '', label: 'B', value: 'b' }, { icon: '', label: 'C', value: 'c' }];
  //多选
  checkValue: string = 'a';
  checkOptions: any[] = [{ icon: '', label: 'A', value: 'a' }, { icon: '', label: 'B', value: 'b' }, { icon: '', label: 'C', value: 'c' }];
  //下拉多选
  chosenValue: string = 'a';
  chosenOptions: any[] = [{ icon: '', label: 'A', value: 'a' }, { icon: '', label: 'B', value: 'b' }, { icon: '', label: 'C', value: 'c' }];
  //单选
  radioValue: string = 'a';
  radioOptions: any[] = [{ icon: '', label: 'A', value: 'a' }, { icon: '', label: 'B', value: 'b' }];
  //数值
  doubleValue: number = 5.5;
  //整数
  longValue: number = 5;
  //text
  content: string = '文本内容';
  addonbefore: string = '';
  //自定义下拉多选
  manyValue: any[] = [{ "label": "A", "value": "a", "disabled": false }];
  manyOptions: any[] = [{ icon: '', label: 'A', value: 'a' }, { icon: '', label: 'B', value: 'b' }, { icon: '', label: 'C', value: 'c' }];
  constructor(public mainService: ComponentService) {
    super('SYSCOMPONENT', mainService);
  }
}
