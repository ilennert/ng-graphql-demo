import { createAction } from '@ngrx/store';

import { Owner } from '../../model/owner';

export const loadOwnerInfo = createAction(
    '[SanctuaryListComponent] Load Owner Info'
);

export const ownerInfoLoaded = createAction(
    '[Sanctuary/API] Owner Info Loaded',
    (owner: Owner) => ({ owner })
);

export const ownersInfoLoaded = createAction(
    '[Sanctuary/API] Owners Info Loaded',
    (owners: Owner[]) => ({ owners })
);
