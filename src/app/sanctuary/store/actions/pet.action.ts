import { createAction } from '@ngrx/store';

import { Pet } from '../../model/pet';
import { TransferPetForm } from '../../model/transfer-pet';
import { CreateCatInput } from '../../graphql.schema';

export const createPet = createAction(
    '[AddEditAddressComponent] Create Pet',
    (petInput: CreateCatInput) => ({ petInput })
);

export const createPetSuccess = createAction(
    '[Sanctuary/API] Pet Create Success',
    (petId: string) => ({ petId })
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
