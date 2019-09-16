
import { createReducer, on, Action } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import { Sanctuary } from '../../model/sanctuary';
import * as sanctuariesActions from '../actions/sanctuary.action';

export interface SanctuariesState extends EntityState<Sanctuary> {
  allLoaded: boolean;
  loadPending: boolean;
}

export const adapter: EntityAdapter<Sanctuary> =
  createEntityAdapter<Sanctuary>();

export const initialSanctuariesState: SanctuariesState = adapter.getInitialState({
  allLoaded: false,
  loadPending: false
});

export const reducer = createReducer(
    initialSanctuariesState,
    on(sanctuariesActions.loadSanctuaryInfo, (state) => ({...state, allLoaded: false, loadPending: true })),
    on(sanctuariesActions.sanctuaryInfoLoaded, (state, { sanctuaries }) => {
        return adapter.addAll(sanctuaries, {...state, allLoaded: true, loadPending: false });
  })
);

export function sanctuariesReducer(state = initialSanctuariesState , action: Action): SanctuariesState {
  return reducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
