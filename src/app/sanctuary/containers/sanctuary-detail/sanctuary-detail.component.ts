import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { State } from '../../../store';
import { Pet } from '../../model/pet';
import { Sanctuary } from '../../model/sanctuary';
import * as fromSelectors from '../../store/selectors';
import * as fromRoot from '../../../store';

@Component({
  selector: 'app-sanctuary-detail',
  templateUrl: './sanctuary-detail.component.html',
  styleUrls: ['./sanctuary-detail.component.scss']
})
export class SanctuaryDetailComponent {
  sanctuary$: Observable<Sanctuary>;
  pet$: Observable<(id: string) => Pet>;
  sanctuaryId: string;

  constructor(private store: Store<State>) {
    this.sanctuary$ = this.store.pipe(
      select(fromSelectors.selectCurrentSanctuary)
    );
    this.pet$ = this.store.pipe(
      select(fromSelectors.selectPetByIdD)
    );
  }

  selectRow(id: string): void {
    this.store.dispatch(fromRoot.go({ path: ['/pet', id]}));
  }
}
