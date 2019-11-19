
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';

import * as applicationActions from '../actions';
import { OwnerService } from '../../services/owner.service';

@Injectable()
export class AddressEffects {

  createAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationActions.createPersonAddress),
      mergeMap(action => this.ownerService.createAddress(action.addressInput)),
      tap(out => {
        console.log(out);
      }),
      map(sanctuaryGraph => applicationActions.addressInfoLoaded(sanctuaryGraph.addresses[0])),
      catchError(err => {
        console.log('Error loading/creating address entity ', err);
        return of(applicationActions.graphLoadFail(err));
      })
    )
  );

  constructor(
      private actions$: Actions,
      private ownerService: OwnerService
  ) {}
}
