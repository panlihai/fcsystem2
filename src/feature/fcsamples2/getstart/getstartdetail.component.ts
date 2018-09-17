import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../services/component.service';
import { ComponentParent } from '../componentparent';
@Component({
  selector: 'getstartdetail',
  templateUrl: './getstartdetail.component.html',
  styles: [`
    
  `]
})
export class GetstartdetailComponent extends ComponentParent {
  constructor(public mainService: ComponentService) {
    super('SYSCOMPONENT', mainService);
  }
}