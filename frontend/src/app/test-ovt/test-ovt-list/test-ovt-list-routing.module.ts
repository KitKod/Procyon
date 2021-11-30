import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestOvtListComponent } from './test-ovt-list.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: TestOvtListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TestOvtListRoutingModule {}
