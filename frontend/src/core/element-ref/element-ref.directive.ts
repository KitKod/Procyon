import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[procyonElementRef]',
    exportAs: 'procyonElementRef',
})
export class ElementRefDirective {
    readonly element: HTMLElement = this.template.nativeElement;

    constructor(public template: ElementRef<HTMLElement>) {}
}
