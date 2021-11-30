import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestOvtInfoComponent } from './test-ovt-info.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: TestOvtInfoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TestOvtInfoRoutingModule {}
