import { registerLocaleData } from '@angular/common';
import ukLocaleExtra from '@angular/common/locales/extra/uk';
import ukLocale from '@angular/common/locales/uk';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from '@environment';

import { AppModule } from './app/app.module';

if (environment.production) {
    enableProdMode();
}

registerLocaleData(ukLocale, 'uk', ukLocaleExtra);

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
