import { Component } from '@angular/core';

interface NavLink {
    url: unknown[] | string | null | undefined;
    label: string;
    icon: string;
}

@Component({
    selector: 'procyon-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    readonly links: NavLink[] = [
        {
            url: '/tests',
            // label: 'Tests',
            label: 'Випробування',
            icon: 'biotech',
        },
        {
            url: '/ames',
            // label: 'Armament and military equipments',
            label: 'Озброєння та військова техніка',
            icon: 'flight',
        },
        {
            url: '/manufacturers',
            // label: 'Manufactures',
            label: 'Виробники',
            icon: 'factory',
        },
    ];
}
