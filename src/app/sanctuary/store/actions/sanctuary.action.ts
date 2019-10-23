import { createAction } from '@ngrx/store';

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

export const loadSanctuaryInfo = createAction(
    '[SanctuaryListComponent] Load Sanctuary Info'
);

export const sanctuaryInfoLoaded = createAction(
    '[Sanctuary/API] Sanctuary Info Loaded',
    (sanctuaries: Sanctuary[]) => ({ sanctuaries })
);

export const graphLoadFail = createAction(
    '[Sanctuary/API] Graph Load Fail',
    (err: any) => ({ err })
);
