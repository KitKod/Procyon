import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManufacturerListComponent } from './manufacturer-list.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ManufacturerListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class ManufacturerListRoutingModule {}
