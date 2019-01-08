import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
@Component({
  selector: 'adprint',
  templateUrl: './adprint.component.html',
  styles: [``]
})
export class AdprintComponent extends ComponentParent {
  //basicview
  basicview : string = `
  <fc-adprint/>
  `
  
  constructor(public mainService: ComponentService) {
    super('FCADPRINT', mainService);
  }
}