
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        canActivate: [fromGuards.SanctuariesGuard, fromGuards.OwnersGuard, fromGuards.PetsGuard, fromGuards.SpeciesGuard],
        component: fromContainers.SanctuaryCenterComponent,
        children: [
            {
                path: '',
                component: fromContainers.SanctuaryListComponent,
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
                component: fromContainers.PetTransferFormComponent
            },
            {
                path: 'addEditOwner',
                component: fromContainers.AddEditOwnerComponent
            },
            {
                path: 'addEditPet',
                component: fromContainers.AddEditPetComponent
            },
            {
                path: 'addEditSanctuary',
                component: fromContainers.AddEditSanctuaryComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ]
})
export class SanctuaryRoutingModule { }
