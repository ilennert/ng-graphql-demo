
import {createFeatureSelector, createSelector} from '@ngrx/store';

import { PetsState } from '../reducers/pet.reducer';

export const selectPetsState = createFeatureSelector<PetsState>('pets');
