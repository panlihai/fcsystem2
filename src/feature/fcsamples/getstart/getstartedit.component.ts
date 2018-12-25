import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../services/component.service';
import { ComponentParent } from '../componentparent';
@Component({
  selector: 'getstartedit',
  templateUrl: './getstartedit.component.html',
  styles: [`
    
  `]
})
export class GetstarteditComponent extends ComponentParent {
  constructor(public mainService: ComponentService) {
    super('SYSCOMPONENT', mainService);
  }
}