
import {createFeatureSelector, createSelector} from '@ngrx/store';

import { OwnersState } from '../reducers/owner.reducer';

export const selectOwnersState = createFeatureSelector<OwnersState>('owners');
