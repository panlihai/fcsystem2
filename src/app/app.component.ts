import { Component } from '@angular/core';
import { SystemService } from './services/services.services';
@Component({
  selector: 'app-root',
  template: `<router-outlet ></router-outlet>`
})
export class AppComponent {
  constructor(public systemService: SystemService) {

  }
}
