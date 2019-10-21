import { createAction } from '@ngrx/store';

import { Pet } from '../../model/pet';
import { TransferPetForm } from '../../model/transfer-pet';
import { PetInput } from '../../graphql.schema';

export const createPet = createAction(
    '[AddEditPetComponent] Create Pet',
    (petInput: PetInput) => ({ petInput })
);

export const createPetSuccess = createAction(
    '[Sanctuary/API] Pet Create Success',
    (pet: Pet) => ({ pet })
);

export const loadPetInfo = createAction(
    '[SanctuaryListComponent] Load Pet Info'
);

export const loadFullPetInfo = createAction(
    '[PetGuard] Load Full Pet Info'
);

export const petInfoLoaded = createAction(
    '[Sanctuary/API] Pet Info Loaded',
    (pet: Pet) => ({ pet })
);

export const fullPetsInfoLoaded = createAction(
    '[Sanctuary/API] Full pet Info Loaded',
    (pets: Pet[]) => ({ pets })
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
