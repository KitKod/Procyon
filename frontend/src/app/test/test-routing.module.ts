import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./test-list').then(m => m.TestListModule),
    },
    {
        path: ':id',
        loadChildren: () => import('./test-info').then(m => m.TestInfoModule),
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TestRoutingModule {}
