import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { State } from '../../../store';
import { Pet } from '../../model/pet';
import { Sanctuary } from '../../model/sanctuary';
import * as fromSelectors from '../../store/selectors';

@Component({
  selector: 'app-sanctuary-detail',
  templateUrl: './sanctuary-detail.component.html',
  styleUrls: ['./sanctuary-detail.component.scss']
})
export class SanctuaryDetailComponent {
  sanctuary$: Observable<Sanctuary>;
  pet$: Observable<(id: string) => Pet>;
  sanctuaryId: string;

  constructor(private store: Store<State>,
              private router: Router) {
    this.sanctuary$ = this.store.pipe(
      select(fromSelectors.selectCurrentSanctuary)
    );
    this.pet$ = this.store.pipe(
      select(fromSelectors.selectPetByIdD)
    );
  }

  selectRow(id: string): void {
    this.router.navigateByUrl(`/pet/${id}`);
  }
}
