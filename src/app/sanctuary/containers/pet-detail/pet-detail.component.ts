import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { State } from '../../../store';
import { Pet } from '../../model/pet';
import * as fromSelectors from '../../store/selectors';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss']
})
export class PetDetailComponent {
  private month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  alertType = [
    'success',
    'info',
    'warning',
    'danger',
    'primary',
    'secondary'
  ];
  pet$: Observable<Pet>;

  constructor(private store: Store<State>) {
    this.pet$ = this.store.pipe(
      select(fromSelectors.selectCurrentPet)
    );
  }

  getHistoryItem(rangeId: string, pet: Pet): Observable<string> {
    return this.store.pipe(
      select(fromSelectors.selectHistoryByIdD),
      map(f => {
        const range = f(rangeId);
        const formatDate = this.formatDateTime(range.transactionDate);
        let retVal: string;
        if (!range.ownerId && range.sanctuaryId) {
          retVal = `${pet.name} a ${pet.species}, on ${formatDate}, was brought into the Sanctuary`;
          retVal += ' as a stray, looking for a new home.';
          return retVal;
        } else if (range.ownerId && range.sanctuaryId && !range.toOwner) {
          retVal = `${pet.name} a ${pet.species}, on ${formatDate}, was brought into the Sanctuary`;
          retVal += ' as an orphan, looking for a new home.';
          return retVal;
        } else {
          return `${pet.name} a ${pet.species}, has found a new home on ${formatDate}.`;
        }
      })
    );
  }

  private formatDateTime(ind: Date): string {
    const d = new Date(ind);
    const retVal = (this.month[d.getMonth()])
      + ' ' + d.getDate()
      + ', ' +  d.getFullYear()
      + ' at '
      + d.getHours()
      + ':' + d.getMinutes();
    return retVal;
  }
}
