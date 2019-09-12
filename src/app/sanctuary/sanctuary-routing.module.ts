
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
    { path: '', component: fromContainers.SanctuaryListComponent },
    { path: 'sanctuary/:id', component: fromContainers.SanctuaryDetailComponent},
    { path: 'pet/:id', component: fromContainers.PetDetailComponent },
    { path: 'pet-transfer/:id', component: fromContainers.PetTransferFormComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ]
})
export class SanctuaryRoutingModule { }
