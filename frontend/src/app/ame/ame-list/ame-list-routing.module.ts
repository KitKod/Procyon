import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AmeListComponent } from './ame-list.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AmeListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class AmeListRoutingModule {}
