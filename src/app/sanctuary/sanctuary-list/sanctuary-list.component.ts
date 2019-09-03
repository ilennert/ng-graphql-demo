import { Component /*, OnInit */ } from '@angular/core';
import { Router } from '@angular/router';
// import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
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
  sanctuaries: Observable<PetSanctuary[]>;

  constructor(// private apollo: Apollo,
              private router: Router) { }

  // ngOnInit(): void {
  //   this.sanctuaries = this.apollo.watchQuery<any>({
  //     query: sanctuariesQuery
  //   }).valueChanges.pipe(map(sanctuaries => sanctuaries.data.catSanctuaries));
  // }

  selectRow(id: string): void {
    this.router.navigateByUrl(`/sanctuary/${id}`);
  }
}
