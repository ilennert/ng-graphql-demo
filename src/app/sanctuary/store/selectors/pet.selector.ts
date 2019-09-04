
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPet from '../reducers/pet.reducer';

export const selectPetsState = createFeatureSelector<fromPet.PetsState>('pets');

export const selectPetById = (id: string) => createSelector(
    selectPetsState,
    addressesState => addressesState.entities[id]
);

export const selectAllPets = createSelector(
    selectPetsState,
    fromPet.selectAll
);

export const selectPetByIds = (ids: string[]) => createSelector(
    selectAllPets,
    pets => pets.filter(pet => ids.some(ii => pet.id === ii))
);
