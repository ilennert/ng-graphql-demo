
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';

import * as applicationActions from '../actions';
import { PetService } from '../../services/pet.service';

@Injectable()
export class PetEffects {

    loadGraph$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.loadFullPetInfo),
            mergeMap(() => {
                const retval = this.petService.getAllPetInfo();
                return retval;
            }),
            switchMap(sanctuaryGraph => [
                applicationActions.fullPetsInfoLoaded(sanctuaryGraph.pets),
            ]),
            catchError(err => {
                console.log('Error loading Sanctuary Graph ', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    constructor(
        private actions$: Actions,
        private petService: PetService
    ) {}
}
