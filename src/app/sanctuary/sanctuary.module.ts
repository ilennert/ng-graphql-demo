import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { sanctuariesReducer } from '../sanctuary/store/reducers/sanctuary.reducer';
import { addressesReducer } from '../sanctuary/store/reducers/address.reducer';
import { historyReducer } from '../sanctuary/store/reducers/history.reducer';
import { ownersReducer } from '../sanctuary/store/reducers/owner.reducer';
import { petsReducer } from '../sanctuary/store/reducers/pet.reducer';
import { SanctuaryEffects } from '../sanctuary/store/effects/sanctuary.effect';
import { SanctuaryService } from '../sanctuary/services/sanctuary.service';

import { SanctuaryRoutingModule } from './sanctuary-routing.module';
import * as fromContainers from './containers';

@NgModule({
  declarations: [ ...fromContainers.containers ],
  imports: [
    CommonModule,
    SanctuaryRoutingModule,
    StoreModule.forFeature('sanctuaries', sanctuariesReducer),
    StoreModule.forFeature('addresses', addressesReducer),
    StoreModule.forFeature('history', historyReducer),
    StoreModule.forFeature('owners', ownersReducer),
    StoreModule.forFeature('pets', petsReducer),
    EffectsModule.forFeature([SanctuaryEffects]),
],
providers: [ SanctuaryService ]
})
export class SanctuaryModule { }
