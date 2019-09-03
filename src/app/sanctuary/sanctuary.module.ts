import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { sanctuariesReducer } from '../sanctuary/store/reducers/sanctuary.reducer';
import { addressesReducer } from '../sanctuary/store/reducers/address.reducer';
import { historyReducer } from '../sanctuary/store/reducers/history.reducer';
import { ownersReducer } from '../sanctuary/store/reducers/owner.reducer';
import { petsReducer } from '../sanctuary/store/reducers/pet.reducer';

import { SanctuaryRoutingModule } from './sanctuary-routing.module';
import { SanctuaryListComponent } from './sanctuary-list/sanctuary-list.component';
import { SanctuaryDetailComponent } from './sanctuary-detail/sanctuary-detail.component';

@NgModule({
  declarations: [SanctuaryListComponent, SanctuaryDetailComponent],
  imports: [
    CommonModule,
    SanctuaryRoutingModule,
    StoreModule.forFeature('sanctuaries', sanctuariesReducer),
    StoreModule.forFeature('addresses', addressesReducer),
    StoreModule.forFeature('history', historyReducer),
    StoreModule.forFeature('owners', ownersReducer),
    StoreModule.forFeature('pets', petsReducer),
],
})
export class SanctuaryModule { }
