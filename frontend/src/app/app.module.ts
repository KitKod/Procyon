import { A11yModule } from '@angular/cdk/a11y';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { EventPluginsModule } from '@tinkoff/ng-event-plugins';

import { environment } from '@environment';

import { DATE_FORMAT } from '@core/constants/ui';
import { ElementRefModule } from '@core/element-ref';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

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
        MatToolbarModule,
        ElementRefModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        A11yModule,
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
        { provide: LOCALE_ID, useValue: environment.locale },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
