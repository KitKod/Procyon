import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tests',
    },
    {
        path: 'tests',
        loadChildren: () => import('./test').then(m => m.TestModule),
    },
    {
        path: 'ames',
        loadChildren: () => import('./ame').then(m => m.AmeModule),
    },
    {
        path: 'manufactures',
        loadChildren: () => import('./manufacturer').then(m => m.ManufacturerModule),
    },
    {
        path: '**',
        redirectTo: 'tests',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
