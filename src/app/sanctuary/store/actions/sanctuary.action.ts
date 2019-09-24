import { createAction } from '@ngrx/store';

import { Sanctuary } from '../../model/sanctuary';
import { CreatePetSanctuaryInput  } from '../../graphql.schema';

export const createSanctuary = createAction(
    '[AddEditSanctuaryComponent] Create Sanctuary',
    (sanctuaryInput: CreatePetSanctuaryInput ) => ({ sanctuaryInput })
);

export const createOwnerSuccess = createAction(
    '[Sanctuary/API] Sanctuary Create Success',
    (sanctuaryId: string) => ({ sanctuaryId })
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
