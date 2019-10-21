
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as applicationActions from '../actions';
import * as rootStore from '../../../store';
import { PetService } from '../../services/pet.service';

@Injectable()
export class PetEffects {

    loadGraph$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.loadFullPetInfo),
            mergeMap(() => {
                applicationActions.loadHistoryInfo();
                const retval = this.petService.getAllPetInfo();
                return retval;
            }),
            switchMap(sanctuaryGraph => [
                applicationActions.historyInfoLoaded(sanctuaryGraph.ranges),
                applicationActions.fullPetsInfoLoaded(sanctuaryGraph.pets)
            ]),
            catchError(err => {
                console.log('Error loading Sanctuary Graph ', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    createPet$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.createPet),
            mergeMap(action => this.petService.createPet(action.petInput)),
            tap(out => {
                console.log(out);
            }),
            map(sanctuaryGraph => applicationActions.createPetSuccess(sanctuaryGraph.pets[0])),
            catchError(err => {
                console.log('Error loading/creating pet entity ', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    successCreatePet$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.createPetSuccess),
            map(action => rootStore.back())
        )
    );

    constructor(
        private actions$: Actions,
        private petService: PetService
    ) {}
}
