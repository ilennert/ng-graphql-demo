
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

import { State } from '../../reducers';
import * as fromSelectors from '../store/selectors';
import * as fromActions from '../store/actions';
import { Sanctuary } from '../model/sanctuary';

@Injectable()
export class SanctuaryExistsGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.sanctuaryId;
        return this.hasSantuary(id);
      })
    );
  }

  hasSantuary(id: string): Observable<boolean> {
    return this.store.pipe(
        select(fromSelectors.selectAllSanctuaryEntities),
        map((entities: { [key: string]: Sanctuary }) => !!entities[id]),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromSelectors.selectAllSanctuariesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromActions.loadSanctuaryInfo());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
