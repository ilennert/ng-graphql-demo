
import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';

import { Owner } from '../../model/owner';
import * as actions from '../actions';

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
    on(actions.loadOwnerInfo, actions.createOwner, (state) => ({...state, loadPending: true, lastAdded: null })),
    on(actions.loadFullOwnerInfo, (state) => ({...state, allLoaded: false, loadPending: true })),
    on(actions.ownersSubscribed, (state) => ({ ...state, ownwersSubscribed: true })),
    on(actions.ownerInfoLoaded, actions.createOwnerSuccess, (state, { owner }) => {
        return adapter.addOne(owner, {...state, loadPending: false, lastAdded: owner });
    }),
    on(actions.updateOwnerSuccess, (state, { owner }) => {
      const update: Update<Owner> = { id: owner.id, changes: owner };
      return adapter.updateOne(update, { ...state });
    }),
    on(actions.ownersInfoLoaded, (state, { owners }) => {
        return adapter.upsertMany(owners, {...state, loadPending: false });
    }),
    on(actions.ownersFullInfoLoaded, (state, { owners }) => {
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
