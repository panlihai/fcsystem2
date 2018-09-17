import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'line',
  templateUrl: './line.component.html',
  styles: [``]
})
export class LineComponent extends ComponentParent {
  constructor(public mainService: ComponentService) {
    super('FCLINE', mainService);
  }
}