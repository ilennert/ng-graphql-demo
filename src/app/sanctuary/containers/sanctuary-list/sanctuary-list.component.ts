import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { State } from '../../../reducers';
import * as fromSelectors from '../../store/selectors';
import * as fromActions from '../../store/actions';
import { Sanctuary } from '../../model/sanctuary';
import { Address } from '../../graphql.schema';

@Component({
  selector: 'app-sanctuary-list',
  templateUrl: './sanctuary-list.component.html',
  styleUrls: ['./sanctuary-list.component.scss']
})
export class SanctuaryListComponent {

  loading: boolean;
  sanctuaries$: Observable<Sanctuary[]>;
  address$: Observable<(id: string) => Address>;

  constructor(private store: Store<State>,
              private router: Router) {
    this.sanctuaries$ = this.store.pipe(
      select(fromSelectors.selectAllSanctuaries)
    );
    this.address$ = this.store.pipe(
      select(fromSelectors.selectAddressById)
    );
  }

  selectRow(sanctuary: Sanctuary): void {
    this.store.dispatch(fromActions.currentSanctuarySelected(sanctuary));
    this.router.navigateByUrl(`/sanctuary/${sanctuary.id}`);
  }
}
