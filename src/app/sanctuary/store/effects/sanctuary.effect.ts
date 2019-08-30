
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';

import * as adminActions from '../actions';
import * as fromCoreServices from '../../../core/services';

@Injectable()
export class AdminEffects {

    loadGraph$ = createEffect(() =>
        this.actions$.pipe(
            ofType(adminActions.graphLoad),
            mergeMap(() => this.graphService.getAdminGraph()),
            switchMap(appGraph => [
                adminActions.zonesRetrieved(appGraph.zones),
                adminActions.categoriesRetrieved(appGraph.categories),
                adminActions.productsRetrieved(appGraph.products),
                adminActions.imagesRetrieved(appGraph.images),
                adminActions.graphLoaded()
            ]),
            catchError(err => {
                console.log('Error loading Catalog Graph ', err);
                return of(adminActions.graphLoadFail(err));
            })
        )
    );

    constructor(
        private actions$: Actions,
        private graphService: fromCoreServices.AppGraphService
    ) {}
}
