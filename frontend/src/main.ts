import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import ukLocale from '@angular/common/locales/uk';
import ukLocaleExtra from '@angular/common/locales/extra/uk';
import { registerLocaleData } from '@angular/common';

import { AppModule } from './app/app.module';
import { environment } from '@environment';

if (environment.production) {
    enableProdMode();
}

registerLocaleData(ukLocale, 'uk', ukLocaleExtra);

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
