
import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromHistory from '../reducers/history.reducer';
import { Range } from '../../model/range';

export const selectHistoryState = createFeatureSelector<fromHistory.HistoryState>('history');

export const selectHistoryById = (id: string) => createSelector(
    selectHistoryState,
    historyState => historyState.entities[id]
);

export const selectAllHistory = createSelector(
    selectHistoryState,
    fromHistory.selectAll
);

export const selectHistoryBySanctuaryD = createSelector(
    selectAllHistory,
    (history: Range[], id: string) => history.filter(range => range.sanctuaryId === id && !range.toOwner)
);

export const selectHistoryBySanctuary = (id: string) => createSelector(
    selectAllHistory,
    history => history.filter(range => range.sanctuaryId === id && !range.toOwner)
);

export const selectHistoryByIds = (ids: string[]) => createSelector(
    selectAllHistory,
    history => history.filter(range => ids.some(ii => range.id === ii))
);
