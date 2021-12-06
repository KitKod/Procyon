import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./manufacturer-list').then(m => m.ManufacturerListModule),
    },
    {
        path: ':id',
        loadChildren: () => import('./manufacturer-info').then(m => m.ManufacturerInfoModule),
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class ManufacturerRoutingModule {}
