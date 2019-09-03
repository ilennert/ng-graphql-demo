
import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Range } from '../../model/range';
import * as historyActions from '../actions/history.action';

export interface HistoryState extends EntityState<Range> {
  loadPending: boolean;
}

export const adapter: EntityAdapter<Range> =
  createEntityAdapter<Range>();

export const initialHistoryState: HistoryState = adapter.getInitialState({
  loadPending: false
});

export const reducer = createReducer(
    initialHistoryState,
    on(historyActions.loadHistoryInfo, (state) => ({...state, loadPending: false })),
    on(historyActions.periodInfoLoaded, (state, { period }) => {
        return adapter.addOne(period, state);
    }),
    on(historyActions.historyInfoLoaded, (state, { history }) => {
        return adapter.addAll(history, {...state, loadPending: false });
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
