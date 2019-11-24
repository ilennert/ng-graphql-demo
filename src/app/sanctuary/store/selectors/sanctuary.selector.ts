
import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromSanctuary from '../reducers/sanctuary.reducer';
import * as fromRoot from '../../../store';
import { Sanctuary } from '../../model/sanctuary';

export const selectSanctuariesState = createFeatureSelector<fromSanctuary.SanctuariesState>('sanctuaries');

export const selectSanctuaryByIdD = createSelector(
    selectSanctuariesState,
    sanctuaryState => (id: string) => sanctuaryState.entities[id]
);

export const selectSanctuaryById = (id: string) => createSelector(
    selectSanctuariesState,
    sanctuaryState => sanctuaryState.entities[id]
);

export const selectAllSanctuaries = createSelector(
    selectSanctuariesState,
    fromSanctuary.selectAll
);

export const selectAllSantuaryEntities = createSelector(
    selectSanctuariesState,
    fromSanctuary.selectEntities
);

export const selectSanctuariesByIdD = createSelector(
    selectAllSanctuaries,
    sanctuaries => (ids: string[]) => sanctuaries.filter(sanctuary => ids.some(ii => sanctuary.id === ii))
);

export const selectSanctuaryInfoLoadPending = createSelector(
    selectSanctuariesState,
    sanctuaryState => sanctuaryState.loadPending
);

export const selectCurrentSanctuary = createSelector(
    selectAllSantuaryEntities,
    fromRoot.getRouterState,
    (entities, router): Sanctuary => {
        return router.state && entities[router.state.params.sanctuaryId];
    }
);

export const selectAllSanctuariesLoaded = createSelector(
    selectSanctuariesState,
    sanctuaryState => sanctuaryState.allLoaded
);

export const selectAllSanctuariesLoadPending = createSelector(
    selectSanctuariesState,
    sanctuaryState => sanctuaryState.allLoaded || sanctuaryState.loadPending
);

export const selectAllSanctuaryEntities = createSelector(
    selectSanctuariesState,
    fromSanctuary.selectEntities
);

export const selectSanctuariesSubscribed = createSelector(
    selectSanctuariesState,
    sanctuariesState => sanctuariesState.sanctuariesSubscribed
);
