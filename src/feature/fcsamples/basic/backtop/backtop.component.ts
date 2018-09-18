import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'app-backtop',
  templateUrl: './backtop.component.html',
  styles: [`
  :host ::ng-deep .long-div {
    height: 300px;
    overflow-y: scroll;
    background-image: url(//zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg);
  }

  :host ::ng-deep .long-div-inner {
    height: 1500px;
  }

  :host ::ng-deep .long-div .ant-back-top {
    right: 150px;
  }

  :host ::ng-deep strong {
    color: rgba(64, 64, 64, 0.6);
  }
  `]
})
export class BacktopComponent extends ComponentParent {
  constructor(public mainService: ComponentService) {
    super('FCBACKTOP', mainService);
  }
}