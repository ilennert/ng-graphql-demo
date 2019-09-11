import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap, mergeMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { State } from '../../../reducers';
import { Pet } from '../../model/pet';
import { Sanctuary } from '../../model/sanctuary';
import * as fromSelectors from '../../store/selectors';
import * as fromActions from '../../store/actions';

@Component({
  selector: 'app-sanctuary-detail',
  templateUrl: './sanctuary-detail.component.html',
  styleUrls: ['./sanctuary-detail.component.scss']
})
export class SanctuaryDetailComponent implements OnInit {
  sanctuary$: Observable<Sanctuary>;
  pet$: Observable<(id: string) => Pet>;

  constructor(private store: Store<State>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const qpat = 'id';
    this.sanctuary$ = this.route.params.pipe(
      mergeMap(params => {
        const id = params[qpat];
        return this.store.pipe(
          select(fromSelectors.selectSanctuaryById(id)),
          tap(sanctuary => {
            if (!sanctuary) {
              this.store.dispatch(fromActions.loadSanctuaryInfo());
            }
          }),
          filter(sanctuary => !!sanctuary),
          first()
        );
      }));
    this.pet$ = this.store.pipe(
      select(fromSelectors.selectPetByIdD)
    );
  }

  selectRow(id: string): void {
    this.router.navigateByUrl(`/pet/${id}`);
  }
}
