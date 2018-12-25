import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styles: [``]
})
export class PaginationComponent extends ComponentParent {
  constructor(public mainService: ComponentService) {
    super('PAGINATION', mainService);
  }
}