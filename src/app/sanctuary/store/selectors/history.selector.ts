
import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromHistory from '../reducers/history.reducer';

export const selectHistoryState = createFeatureSelector<fromHistory.HistoryState>('history');

export const selectHistoryById = (id: string) => createSelector(
    selectHistoryState,
    historyState => historyState.entities[id]
);

export const selectAllHistory = createSelector(
    selectHistoryState,
    fromHistory.selectAll
);

export const selectHistoryByIds = (ids: string[]) => createSelector(
    selectAllHistory,
    history => history.filter(range => ids.some(ii => range.id === ii))
);
