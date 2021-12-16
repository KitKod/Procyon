import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestInfoComponent } from './test-info.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: TestInfoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TestInfoRoutingModule {}
