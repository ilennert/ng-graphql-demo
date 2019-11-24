
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSpecies from '../reducers/species.reducer';

export const selectSpeciesState = createFeatureSelector<fromSpecies.SpeciesState>('species');

export const selectSpeciesById = (id: string) => createSelector(
    selectSpeciesState,
    petsState => petsState.entities[id]
);

export const selectSpeciesByIdD = createSelector(
    selectSpeciesState,
    speciesState => (id: string) => speciesState.entities[id]
);

export const selectAllSpecies = createSelector(
    selectSpeciesState,
    fromSpecies.selectAll
);

export const selectSpeciesByIds = (ids: string[]) => createSelector(
    selectAllSpecies,
    speciess => speciess.filter(species => ids.some(ii => species.id === ii))
);

export const selectAllSpeciesLoaded = createSelector(
    selectSpeciesState,
    speciesState => speciesState.allLoaded
);

export const selectSpeciesSubscribed = createSelector(
    selectSpeciesState,
    speciesState => speciesState.speciesSubscribed
);
