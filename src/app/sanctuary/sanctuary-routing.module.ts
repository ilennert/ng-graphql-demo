
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        canActivate: [fromGuards.SanctuariesGuard, fromGuards.OwnersGuard, fromGuards.PetsGuard],
        component: fromContainers.SanctuaryListComponent
    },
    {
        path: 'sanctuary/:sanctuaryId',
        canActivate: [fromGuards.SanctuaryExistsGuard],
        component: fromContainers.SanctuaryDetailComponent
    },
    {
        path: 'pet/:petId',
        canActivate: [fromGuards.PetsGuard],
        component: fromContainers.PetDetailComponent
    },
    {
        path: 'pet-transfer/:sanctuaryId',
        canActivate: [fromGuards.SanctuaryExistsGuard, fromGuards.OwnersGuard, fromGuards.PetsGuard],
        component: fromContainers.PetTransferFormComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ]
})
export class SanctuaryRoutingModule { }
