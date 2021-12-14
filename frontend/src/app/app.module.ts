import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EventPluginsModule } from '@tinkoff/ng-event-plugins';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DATE_FORMAT } from '@core/constants/ui';
import { ElementRefModule } from '@core/element-ref';
import { environment } from '@environment';

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
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
        { provide: LOCALE_ID, useValue: environment.locale },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
