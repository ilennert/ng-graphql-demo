import { createAction } from '@ngrx/store';

import { Range } from '../../model/range';
import { Sanctuary } from '../../model/sanctuary';
import { PetSanctuaryInput  } from '../../graphql.schema';

export const createSanctuary = createAction(
    '[AddEditSanctuaryComponent] Create Sanctuary',
    (sanctuaryInput: PetSanctuaryInput) => ({ sanctuaryInput })
);

export const createSanctuarySuccess = createAction(
    '[Sanctuary/API] Sanctuary Create Success',
    (sanctuary: Sanctuary) => ({ sanctuary })
);

export const sanctuariesSubscribed = createAction(
    '[SanctuarySubscriptionGuard]  Sanctuary Adds Subscribed'
);

export const loadSanctuaryInfo = createAction(
    '[SanctuaryListComponent] Load Sanctuary Info'
);

export const sanctuaryInfoLoaded = createAction(
    '[Sanctuary/API] Sanctuary Info Loaded',
    (sanctuaries: Sanctuary[]) => ({ sanctuaries })
);

export const updateSanctuarySuccess = createAction(
    '[Sanctuary/API] Sanctuary Update Success',
    (sanctuary: Partial<Sanctuary>) => ({ sanctuary })
);

export const graphLoadFail = createAction(
    '[Sanctuary/API] Graph Load Fail',
    (err: any) => ({ err })
);
