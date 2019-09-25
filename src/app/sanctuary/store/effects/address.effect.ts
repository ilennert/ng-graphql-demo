
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import * as applicationActions from '../actions';
import { OwnerService } from '../../services/owner.service';

@Injectable()
export class AddressEffects {

    createAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationActions.createAddress),
      mergeMap(action => this.ownerService.createAddress(action.addressInput)),
      map(retval => applicationActions.createAddressSuccess(retval)),
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
