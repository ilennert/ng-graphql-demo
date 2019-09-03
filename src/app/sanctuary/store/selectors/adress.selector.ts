
import {createFeatureSelector, createSelector} from '@ngrx/store';

import { AddressesState } from '../reducers/address.reducer';

export const selectAdderssesState = createFeatureSelector<AddressesState>('addresses');
