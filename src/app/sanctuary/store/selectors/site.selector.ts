
import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromSite from '../reducers/site.reducer';

export const selectSiteState = createFeatureSelector<fromSite.SiteState>('site');

export const selectCurrentStateSanctuary = createSelector(
    selectSiteState,
    siteState => siteState.currentSanctuary
);
