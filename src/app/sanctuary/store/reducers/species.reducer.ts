
import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Species } from '../../graphql.schema';
import * as speciesActions from '../actions/species.action';

export interface SpeciesState extends EntityState<Species> {
  loadPending: boolean;
  allLoaded: boolean;
}

export const adapter: EntityAdapter<Species> =
  createEntityAdapter<Species>();

export const initialSpeciesState: SpeciesState = adapter.getInitialState({
  loadPending: false,
  allLoaded: false
});

const reducer = createReducer(
    initialSpeciesState,
    on(speciesActions.createSpecies, (state) => ({...state, loadPending: true })),
    on(speciesActions.speciesCreated, (state, { species }) => {
        return adapter.addOne(species, {...state, loadPending: false });
    }),
    on(speciesActions.getSpecies, (state) => ({...state, allLoaded: false, loadPending: true})),
    on(speciesActions.getSpeciesLoaded, (state, { species }) => {
        return adapter.addAll(species, {...state, allLoaded: true, loadPending: false });
  })
);

export function speciesReducer(state = initialSpeciesState , action: Action): SpeciesState {
  return reducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
