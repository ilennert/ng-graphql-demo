
import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Address } from '../../graphql.schema';
import * as addressesActions from '../actions/address.action';

export interface AddressesState extends EntityState<Address> {
  loadPending: boolean;
  lastAdded: Address | null;
}

export const adapter: EntityAdapter<Address> =
  createEntityAdapter<Address>();

export const initialAddressesState: AddressesState = adapter.getInitialState({
  loadPending: false,
  lastAdded: null
});

const reducer = createReducer(
    initialAddressesState,
    on(addressesActions.loadAddressInfo, addressesActions.createPersonAddress, (state) =>
      ({...state, loadPending: true, lastAdded: null })),
    on(addressesActions.addressInfoLoaded, (state, { address }) => {
        return adapter.addOne(address, {...state, loadPending: false, lastAdded: address });
    }),
    on(addressesActions.addressesInfoLoaded, (state, { addresses }) => {
        return adapter.upsertMany(addresses, {...state, loadPending: false });
  })
);

export function addressesReducer(state = initialAddressesState , action: Action): AddressesState {
  return reducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
