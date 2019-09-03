
import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Owner } from '../../model/owner';
import * as ownersActions from '../actions/owner.action';

export interface OwnersState extends EntityState<Owner> {
  loadPending: boolean;
}

export const adapter: EntityAdapter<Owner> =
  createEntityAdapter<Owner>();

export const initialOwnerState: OwnersState = adapter.getInitialState({
  loadPending: false
});

export const reducer = createReducer(
    initialOwnerState,
    on(ownersActions.loadOwnerInfo, (state) => ({...state, loadPending: false })),
    on(ownersActions.ownerInfoLoaded, (state, { owner }) => {
        return adapter.addOne(owner, state);
    }),
    on(ownersActions.ownersInfoLoaded, (state, { owners }) => {
        return adapter.addAll(owners, {...state, loadPending: false });
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
