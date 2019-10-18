
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';

import * as applicationActions from '../actions';
import { PetService } from '../../services/pet.service';

@Injectable()
export class SpeciesEffects {

    createSpecies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.createSpecies),
            mergeMap(action => this.petService.createSpecies(action.speciesInput)),
            tap(out => {
                console.log(out);
            }),
            map(sanctuaryGraph => applicationActions.speciesCreated(sanctuaryGraph.species[0])),
            catchError(err => {
                console.log('Error loading/creating species entity ', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

    getSpecies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.getSpecies),
            mergeMap(() => this.petService.getAllSpecies()),
            tap(out => { console.log(out); }),
            map(sanctuaryGraph => applicationActions.getSpeciesLoaded(sanctuaryGraph.species)),
            catchError(err => {
                console.log('Error loading Sanctuary Graph @SpeciesEffects', err);
                return of(applicationActions.graphLoadFail(err));
            })
        )
    );

  constructor(
      private actions$: Actions,
      private petService: PetService
  ) {}
}
