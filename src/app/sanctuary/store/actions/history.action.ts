import { createAction } from '@ngrx/store';

import { CatOwnerRange } from '../../graphql.schema';

export const historyInfoLoaded = createAction(
    '[Sanctuary/API] History Info Loaded',
    (history: CatOwnerRange[]) => ({ history })
);
