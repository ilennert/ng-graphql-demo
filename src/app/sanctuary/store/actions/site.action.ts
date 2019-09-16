import { createAction } from '@ngrx/store';

import { Sanctuary } from '../../model/sanctuary';

export const currentSanctuarySelected = createAction(
    '[SanctuaryListComponent] Sanctuary Choosen',
    (sanctuary: Sanctuary) => ({ sanctuary })
);
