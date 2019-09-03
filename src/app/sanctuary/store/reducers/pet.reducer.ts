
import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Pet } from '../../model/pet';
import * as petsActions from '../actions/pet.action';

export interface PetsState extends EntityState<Pet> {
  loadPending: boolean;
}

export const adapter: EntityAdapter<Pet> =
  createEntityAdapter<Pet>();

export const initialPetState: PetsState = adapter.getInitialState({
  loadPending: false
});

export const reducer = createReducer(
  initialPetState,
    on(petsActions.loadPetInfo, (state) => ({...state, loadPending: false })),
    on(petsActions.petInfoLoaded, (state, { pet }) => {
        return adapter.addOne(pet, state);
    }),
    on(petsActions.petsInfoLoaded, (state, { pets }) => {
        return adapter.addAll(pets, {...state, loadPending: false });
  })
);

export function petsReducer(state = initialPetState , action: Action): PetsState {
  return reducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
