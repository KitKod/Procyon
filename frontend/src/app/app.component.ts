import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NavLink {
    url: any[] | string | null | undefined;
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
            label: 'Tests',
            icon: 'biotech',
        },
        {
            url: '/ames',
            label: 'Armament and military equipments',
            icon: 'flight',
        },
        {
            url: '/manufacturers',
            label: 'Manufactures',
            icon: 'factory',
        },
    ];
}
