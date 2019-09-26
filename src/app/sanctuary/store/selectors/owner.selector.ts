
import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromOwner from '../reducers/owner.reducer';

export const selectOwnersState = createFeatureSelector<fromOwner.OwnersState>('owners');

export const selectOwnerById = (id: string) => createSelector(
    selectOwnersState,
    ownersState => ownersState.entities[id]
);

export const selectAllOwners = createSelector(
    selectOwnersState,
    fromOwner.selectAll
);

export const selectOwnerByIds = (ids: string[]) => createSelector(
    selectAllOwners,
    owners => owners.filter(owner => ids.some(ii => owner.id === ii))
);

export const selectAllOwnersLoaded = createSelector(
    selectOwnersState,
    ownersState => ownersState.allLoaded
);

export const selectLastOwnerLoaded = createSelector(
    selectOwnersState,
    ownersState => ownersState.lastAdded
);
