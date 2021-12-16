import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ElementRefDirective } from './element-ref.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ElementRefDirective],
    exports: [ElementRefDirective],
})
export class ElementRefModule {}
