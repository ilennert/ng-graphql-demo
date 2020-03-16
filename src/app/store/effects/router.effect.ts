
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import * as routerActions from '../actions/router.action';

@Injectable()
export class RouterEffects {

    navigate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerActions.go),
            map(action => action.goto),
            tap(({ path, query: queryParams, extras }) => {
                this.router.navigate(path, { queryParams, ...extras });
            })
        ),
        { dispatch: false }
    );

    navigateBack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerActions.back),
            tap(() => this.location.back())
        ),
        { dispatch: false }
    );

    navigateFoward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerActions.forward),
            tap(() => this.location.forward())
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) {}
}
