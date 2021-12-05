import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EventPluginsModule } from '@tinkoff/ng-event-plugins';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DATE_FORMAT, DEFAULT_LOCALE } from '@core/constants/ui';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        EventPluginsModule,
        AppRoutingModule,
        NgxsModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        MatSidenavModule,
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
        { provide: MAT_DATE_LOCALE, useValue: DEFAULT_LOCALE },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
