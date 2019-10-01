
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';

import * as applicationActions from '../actions';
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

    // createOwner$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(applicationActions.addressPersonInfoLoaded),
    //         mergeMap(action => {
    //             const address = action.address;
    //             const inData: PersonInput = {
    //                 name: this.formPfg['name'].value,
    //                 addresses: [{ id: address.id}],
    //                 birthdate: { dateTime: this.formPfg[''].value }
    //               };
    //                     applicationapplicationActions.
    //         }),
    //     );
    // );

    constructor(
        private actions$: Actions,
        private ownerService: OwnerService
    ) {}
}
