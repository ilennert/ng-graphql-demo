
import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Owner } from '../../model/owner';
import * as ownersActions from '../actions/owner.action';

export interface OwnersState extends EntityState<Owner> {
  allLoaded: boolean;
  ownersSubscribed: boolean;
  loadPending: boolean;
  lastAdded: Owner | null;
}

export const adapter: EntityAdapter<Owner> =
  createEntityAdapter<Owner>();

export const initialOwnerState: OwnersState = adapter.getInitialState({
  allLoaded: false,
  ownersSubscribed: false,
  loadPending: false,
  lastAdded: null
});

const reducer = createReducer(
    initialOwnerState,
    on(ownersActions.loadOwnerInfo, ownersActions.createOwner, (state) => ({...state, loadPending: true, lastAdded: null })),
    on(ownersActions.loadFullOwnerInfo, (state) => ({...state, allLoaded: false, loadPending: true })),
    on(ownersActions.ownersSubscribed, (state) => ({ ...state, ownwersSubscribed: true })),
    on(ownersActions.ownerInfoLoaded, ownersActions.createOwnerSuccess, (state, { owner }) => {
        return adapter.addOne(owner, {...state, loadPending: false, lastAdded: owner });
    }),
    on(ownersActions.ownersInfoLoaded, (state, { owners }) => {
        return adapter.upsertMany(owners, {...state, loadPending: false });
    }),
    on(ownersActions.ownersFullInfoLoaded, (state, { owners }) => {
      return adapter.addAll(owners, {...state, allLoaded: true, loadPending: false });
    })
);

export function ownersReducer(state = initialOwnerState , action: Action): OwnersState {
  return reducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
