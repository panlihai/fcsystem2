import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { LicenseManager } from "ag-grid-enterprise";
import { FccoreModule } from 'fccore2';
import { AppModule } from './app/app.module';
LicenseManager.setLicenseKey("Evaluation_License_Valid_Until_1_August_2018__MTUzMzA3ODAwMDAwMA==8c0b423295f5960e7d0f3cbb4292e068");
FccoreModule.forRoot(environment);
if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
