import { createAction } from '@ngrx/store';

import { Range } from '../../model/range';

export const loadHistoryInfo = createAction(
    '[SanctuaryListComponent] Load History Info'
);

export const periodInfoLoaded = createAction(
    '[Sanctuary/API] History Item Info Loaded',
    (period: Range) => ({ period })
);

export const historyInfoLoaded = createAction(
    '[Sanctuary/API] History Info Loaded',
    (history: Range[]) => ({ history })
);
