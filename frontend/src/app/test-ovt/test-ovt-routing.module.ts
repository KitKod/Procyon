import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./test-ovt-list').then(m => m.TestOvtListModule),
    },
    {
        path: ':id',
        loadChildren: () => import('./test-ovt-info').then(m => m.TestOvtInfoModule),
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TestOvtRoutingModule {}
