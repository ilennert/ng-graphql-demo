import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { State } from '../../reducers';
import { Sanctuary } from '../model/sanctuary';
import * as fromSelectors from '../store/selectors';

@Component({
  selector: 'app-sanctuary-detail',
  templateUrl: './sanctuary-detail.component.html',
  styleUrls: ['./sanctuary-detail.component.scss']
})
export class SanctuaryDetailComponent implements OnInit, OnDestroy {
  sanctuary$: Observable<(id: string) => Sanctuary>;
  id: string;
  private sub: Subscription;

  constructor(private store: Store<State>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const qpat = 'id';
    this.sub = this.route.params.subscribe(params => {
      this.id = params[qpat];
      if (this.id) {
        console.log(this.id);
      }
    });
    this.sanctuary$ = this.store.pipe(
      select(fromSelectors.selectSanctuaryById)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
