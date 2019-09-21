import { createAction } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const go = createAction(
    '[Router] Go',
    (goto: {
        path: any[];
        query?: object;
        extras?: NavigationExtras;
    }) => ({ goto })
);

export const back = createAction(
    '[Router] Back'
);

export const forward = createAction(
    '[Router] Forward'
);
