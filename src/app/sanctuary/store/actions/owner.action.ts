import { createAction } from '@ngrx/store';

import { Owner } from '../../graphql.schema';

export const petInfoLoaded = createAction(
    '[Sanctuary/API] Pet Info Loaded',
    (owner: Owner) => ({ owner })
);
