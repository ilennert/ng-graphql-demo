
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';

import * as applicationActions from '../actions';
import { PetService } from '../../services/pet.service';
import { ToastService } from '../../../services/toast.service';
import { Species } from '../../model/species';

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

    onSpeciesAddedSubscribed$ = createEffect(() =>
        this.actions$.pipe(
            ofType(applicationActions.speciesSubscribed),
            mergeMap(() => this.petService.speciesSubscription()),
            map(sanctuaryGraph => {
                const species: Species = sanctuaryGraph.species[0];
                this.toastService.show(`A Species of Pet is now supported by our sanctuaries. We have a ${species.name}`,
                    { classname: 'bg-success text-light', delay: 20000 });
                return applicationActions.speciesCreated(species);
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
