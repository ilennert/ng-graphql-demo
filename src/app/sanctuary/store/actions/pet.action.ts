import { createAction } from '@ngrx/store';

import { Pet } from '../../model/pet';
import { TransferPetForm } from '../../model/transfer-pet';

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

export const petTransfer = createAction(
    '[Sanctuary Pet Transfer Component] Transfer Pet',
    (transfer: TransferPetForm) => ({ transfer })
);

export const petTransferedToSanctuary = createAction(
    '[Sanctuary/API] Pet Transfered to Sanctuary',
    (sanctuaryId: string) => ({ sanctuaryId })
);
