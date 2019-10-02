import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { State } from '../../../store';
import * as fromSelectors from '../../store/selectors';
import * as fromActions from '../../store/actions';
import * as fromRoot from '../../../store';
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
  addressById$: Observable<(id: string) => Address>;

  constructor(private store: Store<State>) {
    this.sanctuaries$ = this.store.pipe(
      select(fromSelectors.selectAllSanctuaries)
    );
    this.addressById$ = this.store.pipe(
      select(fromSelectors.selectAddressById)
    );
  }

  addOwner() {
    this.store.dispatch(fromRoot.go({ path: ['/addEditOwner']}));
  }

  addPet() {
    this.store.dispatch(fromRoot.go({ path: ['/addEditPet']}));
  }

  addSanctuary() {
    this.store.dispatch(fromRoot.go({ path: ['/addEditSanctuary']}));
  }

  selectRow(sanctuary: Sanctuary): void {
    this.store.dispatch(fromActions.currentSanctuarySelected(sanctuary));
    this.store.dispatch(fromRoot.go({ path: ['/sanctuary', sanctuary.id]}));
  }
}
