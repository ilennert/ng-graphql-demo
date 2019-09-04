
import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromOwner from '../reducers/owner.reducer';

export const selectOwnersState = createFeatureSelector<fromOwner.OwnersState>('owners');

export const selectOwnerById = (id: string) => createSelector(
    selectOwnersState,
    ownersState => ownersState.entities[id]
);

export const selectAllOwner = createSelector(
    selectOwnersState,
    fromOwner.selectAll
);

export const selectOwnerByIds = (ids: string[]) => createSelector(
    selectAllOwner,
    owners => owners.filter(owner => ids.some(ii => owner.id === ii))
);
