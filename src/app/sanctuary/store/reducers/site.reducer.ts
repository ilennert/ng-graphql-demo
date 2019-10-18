
import { createReducer, on, Action } from '@ngrx/store';

import { Sanctuary } from '../../model/sanctuary';
import * as fromActions from '../actions/site.action';

export interface SiteState {
    currentSanctuary: Sanctuary | null;
}

export const initialSiteState: SiteState = {
    currentSanctuary: null
};

const reducer = createReducer(
    initialSiteState,
      on(fromActions.currentSanctuarySelected, (state, { sanctuary }) => ({...state, currentSanctuary: sanctuary }))
);

export function siteReducer(state = initialSiteState , action: Action): SiteState {
    return reducer(state, action);
}
