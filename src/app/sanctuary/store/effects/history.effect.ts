
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';

import * as applicationActions from '../actions';
import { PetService } from '../../services/pet.service';
import { Range } from '../../model/range';

@Injectable()
export class HistoryEffects {

    changePetOwnership$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.changePetOwnership),
            mergeMap(action => this.petService.changePetOwnership(action.transferPet)),
            tap(out => {
                console.log(out);
            }),
            map(sanctuaryGraph => applicationActions.periodInfoLoaded(sanctuaryGraph.ranges[0])),
            catchError(err => {
                console.log('Error loading/creating pet history entity ', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    onOwnerRangeChange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.periodInfoLoaded),
            map(action => applicationActions.updateSanctuaryPets(action.period)),
            catchError(err => {
                console.log('Error loading/creating pet history entity @OwnerRangeChange ', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    constructor(
        private actions$: Actions,
        private petService: PetService
    ) {}
}
