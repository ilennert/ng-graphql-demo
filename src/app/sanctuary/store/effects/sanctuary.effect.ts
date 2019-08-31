
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';

import * as applicationActions from '../actions';
import { SanctuaryService } from '../../services/sanctuary.service';

@Injectable()
export class AdminEffects {

    loadGraph$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.loadSanctuaryInfo),
            mergeMap(() => this.sanctuaryService.getAllSanctuaryInfo()),
            switchMap(appGraph => [
                applicationActions.zonesRetrieved(appGraph.zones),
                applicationActions.categoriesRetrieved(appGraph.categories),
                applicationActions.productsRetrieved(appGraph.products),
                applicationActions.imagesRetrieved(appGraph.images),
                applicationActions.graphLoaded()
            ]),
            catchError(err => {
                console.log('Error loading Catalog Graph ', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    constructor(
        private actions$: Actions,
        private sanctuaryService: SanctuaryService
    ) {}
}
