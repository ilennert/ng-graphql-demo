
import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Range } from '../../model/range';
import * as historyActions from '../actions/history.action';

export interface HistoryState extends EntityState<Range> {
  loadPending: boolean;
  allLoaded: boolean;
}

export const adapter: EntityAdapter<Range> =
  createEntityAdapter<Range>();

export const initialHistoryState: HistoryState = adapter.getInitialState({
  loadPending: false,
  allLoaded: false
});

const reducer = createReducer(
    initialHistoryState,
    on(historyActions.loadHistoryInfo, historyActions.changePetOwnership, (state) => ({ ...state, loadPending: true, allLoaded: false })),
    on(historyActions.periodInfoLoaded, (state, { period }) => {
        return adapter.addOne(period, { ...state, loadPending: false });
    }),
    on(historyActions.historyInfoLoaded, (state, { history }) => {
        return adapter.upsertMany(history, { ...state, loadPending: false, allLoaded: true });
  })
);

export function historyReducer(state = initialHistoryState , action: Action): HistoryState {
  return reducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
