
import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromSanctuary from '../reducers/sanctuary.reducer';

export const selectSanctuariesState = createFeatureSelector<fromSanctuary.SanctuariesState>('sanctuaries');

export const selectSanctuaryById = (id: string) => createSelector(
    selectSanctuariesState,
    sanctuaryState => sanctuaryState.entities[id]
);

export const selectAllSanctuaries = createSelector(
    selectSanctuariesState,
    fromSanctuary.selectAll
);

export const selectSanctuariesById = (ids: string[]) => createSelector(
    selectAllSanctuaries,
    sanctuaries => sanctuaries.filter(sanctuary => ids.some(ii => sanctuary.id === ii))
);
