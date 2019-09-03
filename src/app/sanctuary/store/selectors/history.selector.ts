
import {createFeatureSelector, createSelector} from '@ngrx/store';

import { HistoryState } from '../reducers/history.reducer';

export const selectHistoryState = createFeatureSelector<HistoryState>('history');
