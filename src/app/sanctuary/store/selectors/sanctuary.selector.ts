
import {createFeatureSelector, createSelector} from '@ngrx/store';

import { SanctuariesState } from '../reducers/sanctuary.reducer';

export const selectSanctuariesState = createFeatureSelector<SanctuariesState>('sanctuaries');
