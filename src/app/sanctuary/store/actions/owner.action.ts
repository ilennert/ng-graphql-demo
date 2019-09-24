import { createAction } from '@ngrx/store';

import { Owner } from '../../model/owner';
import { PersonInput } from '../../graphql.schema';

export const createOwner = createAction(
    '[AddEditAddressComponent] Create Owner',
    (personInput: PersonInput) => ({ personInput })
);

export const createOwnerSuccess = createAction(
    '[Sanctuary/API] Owner Create Success',
    (personId: string) => ({ personId })
);

export const loadOwnerInfo = createAction(
    '[SanctuaryListComponent] Load Owner Info'
);

export const loadFullOwnerInfo = createAction(
    '[Owner Guard] Load Full Owner Info'
);

export const ownerInfoLoaded = createAction(
    '[Sanctuary/API] Owner Info Loaded',
    (owner: Owner) => ({ owner })
);

export const ownersInfoLoaded = createAction(
    '[Sanctuary/API] Owners Info Loaded',
    (owners: Owner[]) => ({ owners })
);

export const ownersFullInfoLoaded = createAction(
    '[Sanctuary/API] Owners Full Info Loaded',
    (owners: Owner[]) => ({ owners })
);
