
import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';

import { Pet } from '../../model/pet';
import * as actions from '../actions';

export interface PetsState extends EntityState<Pet> {
  allLoaded: boolean;
  petsSubscribed: boolean;
  loadPending: boolean;
}

export const adapter: EntityAdapter<Pet> =
  createEntityAdapter<Pet>();

export const initialPetState: PetsState = adapter.getInitialState({
  allLoaded: false,
  petsSubscribed: false,
  loadPending: false
});

const reducer = createReducer(
  initialPetState,
  on(actions.loadPetInfo, actions.createPet, (state) => ({ ...state, loadPending: true })),
  on(actions.loadFullPetInfo, (state) => ({ ...state, allLoaded: false, loadPending: true })),
  on(actions.petsSubscribed, (state) => ({ ...state, petsSubscribed: true })),
  on(actions.petInfoLoaded, actions.createPetSuccess, (state, { pet }) => {
      return adapter.addOne(pet, { ...state, loadPending: false });
  }),
  on(actions.periodInfoLoaded, (state, { period }) => {
    const subject = state.entities[period.petId];
    const changes = !subject.historyIds.some(p => p === period.id)
      ? { historyIds: [ ...subject.historyIds, period.id ] }
      : undefined;
    if (!changes) { return state; }
    const pet: Update<Pet> = { id: subject.id, changes };
    return adapter.updateOne(pet, { ...state });
  }),
  on(actions.petsInfoLoaded, (state, { pets }) => {
      return adapter.upsertMany(pets, { ...state, loadPending: false });
  }),
  on(actions.fullPetsInfoLoaded, (state, { pets }) => {
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
