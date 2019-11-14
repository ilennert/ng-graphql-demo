import { createAction } from '@ngrx/store';

import { Range } from '../../model/range';
import { TransferPetInput } from '../../graphql.schema';

export const changePetOwnership = createAction(
    '[PetTransferFormComponent] Change Pet Ownership',
    (transferPet: TransferPetInput) => ({ transferPet })
);

export const loadHistoryInfo = createAction(
    '[SanctuaryListComponent] Load History Info'
);

export const petChangesSubscribed = createAction(
    '[PetSubscriptionGuard] Pet Changes Subscribed'
);

export const periodInfoLoaded = createAction(
    '[Sanctuary/API] History Item Info Loaded',
    (period: Range) => ({ period })
);

export const historyInfoLoaded = createAction(
    '[Sanctuary/API] History Info Loaded',
    (history: Range[]) => ({ history })
);
