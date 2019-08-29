
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SanctuaryDetailComponent } from './sanctuary-detail/sanctuary-detail.component';
import { SanctuaryListComponent } from './sanctuary-list/sanctuary-list.component';

const routes: Routes = [
    { path: '', component: SanctuaryListComponent },
    { path: 'sanctuary/:id', component: SanctuaryDetailComponent}
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ]
})
export class SanctuaryRoutingModule { }
