import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturerInfoComponent } from './manufacturer-info.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ManufacturerInfoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class ManufacturerInfoRoutingModule {}
