import { createAction } from '@ngrx/store';

import { Pet } from '../../model/pet';

export const loadPetInfo = createAction(
    '[SanctuaryListComponent] Load Pet Info'
);

export const petInfoLoaded = createAction(
    '[Sanctuary/API] Pet Info Loaded',
    (pet: Pet) => ({ pet })
);

export const petsInfoLoaded = createAction(
    '[Sanctuary/API] Pets Info Loaded',
    (pets: Pet[]) => ({ pets })
);
