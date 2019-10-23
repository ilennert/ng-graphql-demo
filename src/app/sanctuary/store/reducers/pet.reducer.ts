
import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Pet } from '../../model/pet';
import * as petsActions from '../actions/pet.action';

export interface PetsState extends EntityState<Pet> {
  allLoaded: boolean;
  loadPending: boolean;
}

export const adapter: EntityAdapter<Pet> =
  createEntityAdapter<Pet>();

export const initialPetState: PetsState = adapter.getInitialState({
  allLoaded: false,
  loadPending: false
});

const reducer = createReducer(
  initialPetState,
  on(petsActions.loadPetInfo, petsActions.createPet, (state) => ({ ...state, loadPending: true })),
  on(petsActions.loadFullPetInfo, (state) => ({ ...state, allLoaded: false, loadPending: true })),
  on(petsActions.petInfoLoaded, petsActions.createPetSuccess, (state, { pet }) => {
      return adapter.addOne(pet, { ...state, loadPending: false });
  }),
  on(petsActions.petsInfoLoaded, (state, { pets }) => {
      return adapter.upsertMany(pets, { ...state, loadPending: false });
  }),
  on(petsActions.fullPetsInfoLoaded, (state, { pets }) => {
    return adapter.addAll(pets, { ...state, allLoaded: true, loadPending: false });
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
