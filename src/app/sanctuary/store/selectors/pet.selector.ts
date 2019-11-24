
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPet from '../reducers/pet.reducer';

export const selectPetsState = createFeatureSelector<fromPet.PetsState>('pets');

export const selectPetById = (id: string) => createSelector(
    selectPetsState,
    petsState => petsState.entities[id]
);

export const selectPetByIdD = createSelector(
    selectPetsState,
    petsState => (id: string) => petsState.entities[id]
);

export const selectAllPets = createSelector(
    selectPetsState,
    fromPet.selectAll
);

export const selectPetByIds = (ids: string[]) => createSelector(
    selectAllPets,
    pets => pets.filter(pet => ids.some(ii => pet.id === ii))
);

export const selectAllPetsLoaded = createSelector(
    selectPetsState,
    petsState => petsState.allLoaded
);

export const selectPetsSubscribed = createSelector(
    selectPetsState,
    petsState => petsState.petsSubscribed
);
