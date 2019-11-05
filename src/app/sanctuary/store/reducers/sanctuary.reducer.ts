
import { createReducer, on, Action } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState, Update} from '@ngrx/entity';

import { Sanctuary } from '../../model/sanctuary';
import * as sanctuariesActions from '../actions/sanctuary.action';

export interface SanctuariesState extends EntityState<Sanctuary> {
  allLoaded: boolean;
  loadPending: boolean;
}

export const adapter: EntityAdapter<Sanctuary> =
  createEntityAdapter<Sanctuary>();

export const initialSanctuariesState: SanctuariesState = adapter.getInitialState({
  allLoaded: false,
  loadPending: false
});

const reducer = createReducer(
    initialSanctuariesState,
    on(sanctuariesActions.createSanctuary, (state) => ({ ...state, loadPending: true })),
    on(sanctuariesActions.loadSanctuaryInfo, (state) => ({...state, allLoaded: false, loadPending: true })),
    on(sanctuariesActions.createSanctuarySuccess, (state, { sanctuary }) => {
      return adapter.addOne(sanctuary, { ...state, loadPending: false });
    }),
    on(sanctuariesActions.updateSanctuaryPets, (state, { range }) => {
      const subject = state.entities[range.sanctuaryId];
      const changes = !subject.petIds.some(p => p === range.petId)
        ? { petIds: [ ...subject.petIds, range.petId] }
        : range.toOwner
          ? { petIds: subject.petIds.filter(p => p !== range.petId) }
          : undefined;
      if (!changes) { return state; }
      const sanctuary: Update<Sanctuary> = { id: subject.id, changes };
      return adapter.updateOne(sanctuary, { ...state });
    }),
    on(sanctuariesActions.sanctuaryInfoLoaded, (state, { sanctuaries }) => {
        return adapter.addAll(sanctuaries, {...state, allLoaded: true, loadPending: false });
    }),
    on(sanctuariesActions.graphLoadFail, (state) => ({ ...state }))
);

export function sanctuariesReducer(state = initialSanctuariesState , action: Action): SanctuariesState {
  return reducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
