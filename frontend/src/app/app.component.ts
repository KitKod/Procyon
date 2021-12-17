import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MatDrawerMode } from '@angular/material/sidenav/drawer';
import { NavigationEnd, Router } from '@angular/router';
import { animationFrameScheduler, BehaviorSubject, combineLatest, interval } from 'rxjs';
import { distinctUntilChanged, filter, map, scan, switchMapTo, tap } from 'rxjs/operators';

import { onTextAppear } from '@core/animations/on-side-move';

interface NavLink {
    url: unknown[] | string | null | undefined;
    label: string;
    icon: string;
}

const NAV_MENU_COLLAPSED_BY_DEFAULT_MEDIA = '(min-width: 1700px)';

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

    private readonly textAnimatingState$ = new BehaviorSubject<'inactive' | 'hover' | 'switch-state'>('inactive');
    private readonly isMouseOnNavList$ = new BehaviorSubject(false);
    private readonly navTestManualVisibility = new BehaviorSubject(
        this.breakpointObserver.isMatched(NAV_MENU_COLLAPSED_BY_DEFAULT_MEDIA),
    );

    readonly navTestShown$ = combineLatest([this.navTestManualVisibility, this.isMouseOnNavList$]).pipe(
        map(visibility => visibility.includes(true)),
    );

    readonly sideNavMode$ = combineLatest([
        this.navTestManualVisibility,
        this.textAnimatingState$,
        this.isMouseOnNavList$,
    ]).pipe(
        map(([navTestManualVisibility, textAnimatingState]): MatDrawerMode => {
            return navTestManualVisibility || textAnimatingState === 'switch-state' ? 'side' : 'over';
        }),
    );

    readonly activeNavItem$ = this.router.events.pipe(
        scan((acc, event) => {
            if (event instanceof NavigationEnd && event.url !== acc) {
                return event.url;
            }
            return acc;
        }, ''),
        distinctUntilChanged(),
        tap(url => console.log(url)),
    );

    @ViewChild(MatSidenavContainer) private sidenavContainer!: MatSidenavContainer;

    constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

    toggleVisibilityOfNavText(): void {
        this.textAnimatingState$.next('switch-state');
        this.navTestManualVisibility.next(!this.navTestManualVisibility.value);
    }

    ngOnInit(): void {
        // Animation workaround
        interval(1, animationFrameScheduler)
            .pipe(
                switchMapTo(this.textAnimatingState$),
                filter(state => state !== 'inactive'),
            )
            .subscribe(() => {
                this.sidenavContainer.updateContentMargins();
            });
    }

    startTextAppearAnimation(): void {
        if (this.textAnimatingState$.value === 'inactive') {
            this.textAnimatingState$.next('hover');
        }
    }

    stopTextAppearAnimation(): void {
        this.textAnimatingState$.next('inactive');
    }

    onNavListHover(): void {
        this.isMouseOnNavList$.next(true);
    }

    onNavListLeave(): void {
        this.isMouseOnNavList$.next(false);
    }
}
