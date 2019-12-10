
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';

import * as applicationActions from '../actions';
import { PetService } from '../../services/pet.service';
import { Range } from '../../model/range';
import { ToastService } from '../../../services/toast.service';

@Injectable()
export class HistoryEffects {

    changePetOwnership$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.changePetOwnership),
            mergeMap(action => this.petService.changePetOwnership(action.transferPet)),
            map(sanctuaryGraph => applicationActions.periodInfoLoaded(sanctuaryGraph.ranges[0])),
            catchError(err => {
                console.log('Error loading/creating pet history entity ', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    onPetChangesSubscribed$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.petChangesSubscribed),
            mergeMap(() => this.petService.petChangesSubscribed()),
            map(sanctuaryGraph => {
                const range: Range = sanctuaryGraph.ranges[0];
                this.toastService.show(!range.toOwner
                    ? 'A Sanctuary has just found a new Pet to find a Home for'
                    : 'A Sanctuary has just found a new Home for one of our Pets', { classname: 'bg-success text-light', delay: 20000 });
                return applicationActions.periodInfoLoaded(range);
            }),
            catchError(err => {
                console.log('Error loading/creating pet history entity @OwnerRangeChange ', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    constructor(
        private actions$: Actions,
        private petService: PetService,
        private toastService: ToastService
    ) {}
}
