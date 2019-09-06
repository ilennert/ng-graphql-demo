import { Component /*, OnInit */ } from '@angular/core';
import { Router } from '@angular/router';
// import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { State } from '../../reducers';
import * as fromSelectors from '../store/selectors';
import * as fromActions from '../store/actions';
import { Sanctuary } from '../model/sanctuary';
import { Address } from '../graphql.schema';
// import { map } from 'rxjs/operators';
// import gql from 'graphql-tag';

// const sanctuariesQuery = gql`
//   query {
//     catSanctuaries {
//       id
//       name
//       address {
//         id
//         street
//         city
//         stateProv
//         zipPostal
//       }
//       catInventory {
//         id
//       }
//     }
//   }
// `;

import { PetSanctuary } from '../graphql.schema';

@Component({
  selector: 'app-sanctuary-list',
  templateUrl: './sanctuary-list.component.html',
  styleUrls: ['./sanctuary-list.component.scss']
})
export class SanctuaryListComponent /* implements OnInit */ {

  loading: boolean;
  sanctuaries$: Observable<Sanctuary[]>;
  address$: Observable<(id: string) => Address>;

  constructor(private store: Store<State>,
              private router: Router) {
    const sanctuaries: PetSanctuary[] = [];
    this.sanctuaries$ = this.store.pipe(
      select(fromSelectors.selectAllSanctuaries),
      tap(sanctuary => {
        if (!sanctuary || !sanctuary.length) {
          this.store.dispatch(fromActions.loadSanctuaryInfo());
        }
      }),
      filter(sanctuary => !!sanctuary)
    );
    this.address$ = this.store.pipe(
      select(fromSelectors.selectAddressById)
    );
  }

  // ngOnInit(): void {
  //   this.sanctuaries = this.apollo.watchQuery<any>({
  //     query: sanctuariesQuery
  //   }).valueChanges.pipe(map(sanctuaries => sanctuaries.data.catSanctuaries));
  // }

  selectRow(id: string): void {
    this.router.navigateByUrl(`/sanctuary/${id}`);
  }
}
