
import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromAddress from '../reducers/address.reducer';

export const selectAdderssesState = createFeatureSelector<fromAddress.AddressesState>('addresses');

export const selectAddressById = createSelector(
    selectAdderssesState,
    addressesState => (id: string) => addressesState.entities[id]
);

export const selectAllAddresses = createSelector(
    selectAdderssesState,
    fromAddress.selectAll
);

export const selectAddressByIds = (ids: string[]) => createSelector(
    selectAllAddresses,
    addresses => addresses.filter(address => ids.some(ii => address.id === ii))
);
