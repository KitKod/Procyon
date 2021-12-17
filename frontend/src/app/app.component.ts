import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { animationFrameScheduler, BehaviorSubject, combineLatest, interval } from 'rxjs';
import { filter, map, switchMapTo } from 'rxjs/operators';

import { onTextAppear } from '@core/animations/on-side-move';

interface NavLink {
    url: unknown[] | string | null | undefined;
    label: string;
    icon: string;
}

const NAV_MENU_COLLAPSED_B_Y_DEFAULT_MEDIA = '(min-width: 1700px)';

@Component({
    selector: 'procyon-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [onTextAppear],
})
export class AppComponent implements OnInit {
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

    readonly isMouseOnNavList$ = new BehaviorSubject(false);
    readonly isMenuNameShown = new BehaviorSubject(true);
    readonly _navTestManualVisibility = new BehaviorSubject(
        this.breakpointObserver.isMatched(NAV_MENU_COLLAPSED_B_Y_DEFAULT_MEDIA),
    );

    readonly navTestShown$ = combineLatest([this._navTestManualVisibility, this.isMouseOnNavList$]).pipe(
        map(visibility => visibility.includes(true)),
    );

    @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;

    trackContentChange$ = new BehaviorSubject(false);

    constructor(private breakpointObserver: BreakpointObserver) {}

    toggleVisibilityOfNavText(): void {
        this._navTestManualVisibility.next(!this._navTestManualVisibility.value);
    }

    ngOnInit(): void {
        // Animation workaround
        interval(1, animationFrameScheduler)
            .pipe(switchMapTo(this.trackContentChange$), filter(Boolean))
            .subscribe(() => {
                this.sidenavContainer.updateContentMargins();
            });
    }
}
