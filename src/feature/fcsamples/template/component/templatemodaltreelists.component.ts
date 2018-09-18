import { Component} from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
@Component({
  selector: 'templateform',
  templateUrl: './templatemodaltreelists.component.html',
  styles: [``]
})
export class TemplatemodaltreelistsComponent extends ComponentParent {
  constructor(public mainService: ComponentService) {
    super('SYSCOMPONENT', mainService);
  }
}