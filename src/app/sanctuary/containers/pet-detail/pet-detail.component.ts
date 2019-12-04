import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { State } from '../../../store';
import { Pet } from '../../model/pet';
import { Range } from '../../model/range';
import * as fromSelectors from '../../store/selectors';
import * as fromRoot from '../../../store';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss']
})
export class PetDetailComponent {
  alertType = [
    'success',
    'info',
    'warning',
    'danger',
    'primary',
    'secondary'
  ];
  pet$: Observable<Pet>;
  historyByIdD$: Observable<(id: string) => Range>;

  constructor(private store: Store<State>) {
    this.pet$ = this.store.pipe(
      select(fromSelectors.selectCurrentPet)
    );
    this.historyByIdD$ = this.store.pipe(
      select(fromSelectors.selectHistoryByIdD)
    );
  }

  getHistoryItem(range: Range, pet: Pet): string {
    console.log(range.petId);
    return range.petId;
  }

}
