
import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';

import { Sanctuary } from '../../model/sanctuary';
import * as actions from '../actions';

export interface SanctuariesState extends EntityState<Sanctuary> {
  allLoaded: boolean;
  sanctuariesSubscribed: boolean;
  loadPending: boolean;
}

export const adapter: EntityAdapter<Sanctuary> =
  createEntityAdapter<Sanctuary>();

export const initialSanctuariesState: SanctuariesState = adapter.getInitialState({
  allLoaded: false,
  sanctuariesSubscribed: false,
  loadPending: false
});

const reducer = createReducer(
    initialSanctuariesState,
    on(actions.createSanctuary, (state) => ({ ...state, loadPending: true })),
    on(actions.loadSanctuaryInfo, (state) => ({...state, allLoaded: false, loadPending: true })),
    on(actions.sanctuariesSubscribed, (state) => ({ ...state, sanctuariesSubscribed: true })),
    on(actions.createSanctuarySuccess, (state, { sanctuary }) => {
      return adapter.addOne(sanctuary, { ...state, loadPending: false });
    }),
    on(actions.periodInfoLoaded, (state, { period }) => {
      if (!period.sanctuaryId) { return state; }
      const subject = state.entities[period.sanctuaryId];
      const changes = !subject.petIds.some(p => p === period.petId)
        ? { petIds: [ ...subject.petIds, period.petId] }
        : period.toOwner
          ? { petIds: subject.petIds.filter(p => p !== period.petId) }
          : undefined;
      if (!changes) { return state; }
      const sanctuary: Update<Sanctuary> = { id: subject.id, changes };
      return adapter.updateOne(sanctuary, { ...state });
    }),
    on(actions.sanctuaryInfoLoaded, (state, { sanctuaries }) => {
        return adapter.addAll(sanctuaries, {...state, allLoaded: true, loadPending: false });
    }),
    on(actions.graphLoadFail, (state) => ({ ...state }))
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
