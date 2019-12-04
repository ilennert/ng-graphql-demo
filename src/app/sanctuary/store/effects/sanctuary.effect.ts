
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as applicationActions from '../actions';
import * as rootStore from '../../../store';
import { SanctuaryService } from '../../services/sanctuary.service';
import { ToastService } from '../../../services/toast.service';
import { Sanctuary } from '../../model/sanctuary';

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
            switchMap(sanctuaryGraph => [
                applicationActions.addressInfoLoaded(sanctuaryGraph.addresses[0]),
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

    graphLoadFail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.graphLoadFail),
            tap(action => this.toastService.show(action.err, { classname: 'bg-danger text-light', delay: 15000 }))
        ),
        { dispatch: false }
    );

    onSanctuaryAddedSubscribed$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.sanctuariesSubscribed),
            mergeMap(() => this.sanctuaryService.sanctuarySubscription()),
            switchMap(sanctuaryGraph => {
                const sanctuary: Sanctuary = sanctuaryGraph.sanctuaries[0];
                this.toastService.show(`A new Sanctuary is now available to support the adopters and pets. We have a ${sanctuary.name}`,
                    { classname: 'bg-success text-light', delay: 20000 });
                return [
                    applicationActions.addressInfoLoaded(sanctuaryGraph.addresses[0]),
                    applicationActions.createSanctuarySuccess(sanctuary)
                ];
            }),
            catchError(err => {
                console.log('Error loading/creating sanctury entity @sanctuarySubscription ', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    constructor(
        private actions$: Actions,
        private sanctuaryService: SanctuaryService,
        private toastService: ToastService
    ) {}
}
