import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { State } from '../../reducers';
import * as fromSelectors from '../store/selectors';
import * as fromActions from '../store/actions';

@Injectable()
export class PetsGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromSelectors.selectAllPetsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromActions.loadFullPetInfo());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
