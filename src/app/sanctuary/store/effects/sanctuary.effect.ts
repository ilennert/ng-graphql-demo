
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
            mergeMap(() => {
                applicationActions.loadSanctuaryInfo();
                applicationActions.loadAddressInfo();
                applicationActions.loadPetInfo();
                applicationActions.loadOwnerInfo();
                return this.sanctuaryService.getAllSanctuaryInfo();
            }),
            switchMap(sanctuaryGraph => [
                applicationActions.addressesInfoLoaded(sanctuaryGraph.addresses),
                applicationActions.petsInfoLoaded(sanctuaryGraph.pets),
                applicationActions.historyInfoLoaded(sanctuaryGraph.ranges),
                applicationActions.sanctuaryInfoLoaded(sanctuaryGraph.sanctuaries)
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
