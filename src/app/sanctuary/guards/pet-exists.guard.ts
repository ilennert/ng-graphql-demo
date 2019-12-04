
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

import { State } from '../../store';
import * as fromSelectors from '../store/selectors';
import * as fromActions from '../store/actions';
import { Pet } from '../model/pet';

@Injectable()
export class PetExistsGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.petId;
        return this.hasPet(id);
      })
    );
  }

  hasPet(id: string): Observable<boolean> {
    return this.store.pipe(
        select(fromSelectors.selectAllPetEntities),
        map((entities: { [key: string]: Pet }) => !!entities[id]),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromSelectors.selectAllPetsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromActions.loadPetInfo());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
