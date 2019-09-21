import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SanctuaryRoutingModule } from './sanctuary-routing.module';
import { sanctuariesReducer } from './store/reducers/sanctuary.reducer';
import { addressesReducer } from './store/reducers/address.reducer';
import { historyReducer } from './store/reducers/history.reducer';
import { ownersReducer } from './store/reducers/owner.reducer';
import { petsReducer } from './store/reducers/pet.reducer';
import * as fromContainers from './containers';
import * as fromEffects from './store/effects';
import * as fromGuards from './guards';
import * as fromServices from './services';
import { AddEditSanctuaryComponent } from './containers/add-edit-sanctuary/add-edit-sanctuary.component';
import { AddEditOwnerComponent } from './containers/add-edit-owner/add-edit-owner.component';
import { AddEditPetComponent } from './containers/add-edit-pet/add-edit-pet.component';
import { AddEditAddressComponent } from './component/add-edit-address/add-edit-address.component';

@NgModule({
  declarations: [ ...fromContainers.containers, AddEditSanctuaryComponent, AddEditOwnerComponent, AddEditPetComponent, AddEditAddressComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    SanctuaryRoutingModule,
    StoreModule.forFeature('sanctuaries', sanctuariesReducer),
    StoreModule.forFeature('addresses', addressesReducer),
    StoreModule.forFeature('history', historyReducer),
    StoreModule.forFeature('owners', ownersReducer),
    StoreModule.forFeature('pets', petsReducer),
    EffectsModule.forFeature([ ...fromEffects.effects ]),
],
providers: [ ...fromServices.services, ...fromGuards.guards ]
})
export class SanctuaryModule { }
