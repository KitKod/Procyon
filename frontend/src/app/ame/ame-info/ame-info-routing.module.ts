import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AmeInfoComponent } from './ame-info.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AmeInfoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class AmeInfoRoutingModule {}
