import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

// tslint:disable-next-line: no-empty-interface
export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');


export const metaReducers: MetaReducer<State>[] =
  !environment.production ? [storeFreeze] : [];

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
