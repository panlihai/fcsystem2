import { Component} from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
@Component({
  selector: 'templatelist',
  templateUrl: './templatelist.component.html',
  styles: [`
  `]
})
export class TemplatelistComponent extends ComponentParent {
  //下拉单选
  comboValue: string = 'a';
  comboOptions: any[] = [{ icon: '', label: 'A', value: 'a' }, { icon: '', label: 'B', value: 'b' }, { icon: '', label: 'C', value: 'c' }];
  //单选
  radioValue: string = 'a';
  radioOptions: any[] = [{ icon: '', label: 'A', value: 'a' }, { icon: '', label: 'B', value: 'b' }, { icon: '', label: 'C', value: 'c' }];
  constructor(public mainService: ComponentService) {
    super('SYSCOMPONENT', mainService);
  }
}