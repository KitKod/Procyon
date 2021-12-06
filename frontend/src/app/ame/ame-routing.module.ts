import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./ame-list').then(m => m.AmeListModule),
    },
    {
        path: ':id',
        loadChildren: () => import('./ame-info').then(m => m.AmeInfoModule),
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class AmeRoutingModule {}
