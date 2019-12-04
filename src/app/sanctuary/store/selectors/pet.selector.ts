
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPet from '../reducers/pet.reducer';
import * as fromRoot from '../../../store';
import { Pet } from '../../model/pet';

export const selectPetsState = createFeatureSelector<fromPet.PetsState>('pets');

export const selectAllPetEntities = createSelector(
    selectPetsState,
    fromPet.selectEntities
);

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

export const selectCurrentPet = createSelector(
    selectAllPetEntities,
    fromRoot.getRouterState,
    (entities, router): Pet => {
        return router.state && entities[router.state.params.petId];
    }
);
