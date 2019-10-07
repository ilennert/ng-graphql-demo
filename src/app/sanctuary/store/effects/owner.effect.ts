
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';

import * as applicationActions from '../actions';
import * as rootStore from '../../../store';
import { OwnerService } from '../../services/owner.service';

@Injectable()
export class OwnerEffects {

    loadGraph$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.loadFullOwnerInfo),
            mergeMap(() => {
                applicationActions.loadAddressInfo();
                applicationActions.loadPetInfo();
                applicationActions.loadHistoryInfo();
                const retval = this.ownerService.getAllOwnerInfo();
                return retval;
            }),
            switchMap(sanctuaryGraph => [
                applicationActions.historyInfoLoaded(sanctuaryGraph.ranges),
                applicationActions.petsInfoLoaded(sanctuaryGraph.pets),
                applicationActions.addressesInfoLoaded(sanctuaryGraph.addresses),
                applicationActions.ownersFullInfoLoaded(sanctuaryGraph.owners)
            ]),
            catchError(err => {
                console.log('Error loading Sanctuary Graph @OwnerEffects', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    createOwner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.createOwner),
            mergeMap(action => this.ownerService.createPerson(action.personInput)),
            tap(out => {
                console.log(out);
            }),
            map(sanctuaryGraph => applicationActions.createOwnerSuccess(sanctuaryGraph.owners[0])),
            catchError(err => {
              console.log('Error loading/creating address entity ', err);
              return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    success$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.createOwnerSuccess),
            map(action => rootStore.back())
        )
    );

    constructor(
        private actions$: Actions,
        private ownerService: OwnerService
    ) {}
}
