import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { sanctuariesReducer } from './store/reducers/sanctuary.reducer';
import { addressesReducer } from './store/reducers/address.reducer';
import { historyReducer } from './store/reducers/history.reducer';
import { ownersReducer } from './store/reducers/owner.reducer';
import { petsReducer } from './store/reducers/pet.reducer';
import { SanctuaryEffects } from './store/effects/sanctuary.effect';
// import * as fromServices from './services';
// import * as fromGuards from './guards';
import { SanctuaryService } from './services/sanctuary.service';
import { SanctuaryExistsGuard } from './guards/sanctuary-exists.guard';
import { SanctuariesGuard } from './guards/sanctuaries.guard';

import { SanctuaryRoutingModule } from './sanctuary-routing.module';
import * as fromContainers from './containers';

@NgModule({
  declarations: [ ...fromContainers.containers ],
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
    EffectsModule.forFeature([SanctuaryEffects]),
],
providers: [ SanctuaryService, SanctuariesGuard, SanctuaryExistsGuard ]
})
export class SanctuaryModule { }
