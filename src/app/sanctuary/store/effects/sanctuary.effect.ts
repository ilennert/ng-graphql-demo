
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as applicationActions from '../actions';
import * as rootStore from '../../../store';
import { SanctuaryService } from '../../services/sanctuary.service';

@Injectable()
export class SanctuaryEffects {

    loadGraph$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.loadSanctuaryInfo),
            mergeMap(() => {
                applicationActions.loadAddressInfo();
                applicationActions.loadPetInfo();
                applicationActions.loadOwnerInfo();
                const retval = this.sanctuaryService.getAllSanctuaryInfo();
                return retval;
            }),
            switchMap(sanctuaryGraph => [
                applicationActions.addressesInfoLoaded(sanctuaryGraph.addresses),
                applicationActions.petsInfoLoaded(sanctuaryGraph.pets),
                applicationActions.historyInfoLoaded(sanctuaryGraph.ranges),
                applicationActions.sanctuaryInfoLoaded(sanctuaryGraph.sanctuaries)
            ]),
            catchError(err => {
                console.log('Error loading Sanctuary Graph ', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    createSanctuary$ = createEffect(() =>
    this.actions$.pipe(
        ofType(applicationActions.createSanctuary),
        mergeMap(action => {
            applicationActions.createSanctuaryAddressInfo();
            return this.sanctuaryService.createSanctuary(action.sanctuaryInput);
        }),
        tap(out => {
            console.log(out);
        }),
        switchMap(sanctuaryGraph => [
            applicationActions.addressPersonInfoLoaded(sanctuaryGraph.addresses[0]),
            applicationActions.createSanctuarySuccess(sanctuaryGraph.sanctuaries[0])
        ]),
        catchError(err => {
            console.log('Error loading/creating sanctuary entity ', err);
            return of(applicationActions.graphLoadFail(err));
        })
    )
);

successCreateSanctuary$ = createEffect(() =>
    this.actions$.pipe(
        ofType(applicationActions.createSanctuarySuccess),
        map(action => rootStore.back())
    )
);

constructor(
        private actions$: Actions,
        private sanctuaryService: SanctuaryService
    ) {}
}
