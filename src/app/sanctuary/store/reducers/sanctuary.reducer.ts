
import { createReducer, on, Action } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import { Sanctuary } from '../../model/sanctuary';
import * as sanctuariesActions from '../actions/sanctuary.action';

export interface SanctuariesState extends EntityState<Sanctuary> {
  allSanctuariesLoaded: boolean;
  loadPending: boolean;
}

export const adapter: EntityAdapter<Sanctuary> =
  createEntityAdapter<Sanctuary>();

export const initialSanctuariesState: SanctuariesState = adapter.getInitialState({
  allSanctuariesLoaded: false,
  loadPending: false
});

export const reducer = createReducer(
    initialSanctuariesState,
    on(sanctuariesActions.loadSanctuaryInfo, (state) => ({...state, allSanctuariesLoaded: false, loadPending: false })),
    on(sanctuariesActions.sanctuaryInfoLoaded, (state, { sanctuaries }) => {
        return adapter.addAll(sanctuaries, {...state, allSanctuariesLoaded: true, loadPending: false });
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
