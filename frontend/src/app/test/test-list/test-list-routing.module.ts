import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestListComponent } from './test-list.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: TestListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TestListRoutingModule {}
