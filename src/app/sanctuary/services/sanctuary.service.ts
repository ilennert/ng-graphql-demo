
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SanctuaryGraph } from '../model/sanctuary-graph';
import { PetSanctuary, CatOwnerRange } from '../graphql.schema';

const sanctuariesQuery = gql`
  query {
    catSanctuaries {
      id
      name
      address {
        id
        street
        city
        stateProv
        zipPostal
      }
      catInventory {
        id
        name
        breed
        age
      }
    }
  }
`;

@Injectable()
export class SanctuaryService {

    constructor(private apollo: Apollo) {}

    getAllSanctuaryInfo(): Observable<SanctuaryGraph> {
        return this.apollo.watchQuery<any>({
            query: sanctuariesQuery
        }).valueChanges.pipe(map(sanctuaries => {
            const result: PetSanctuary[] = sanctuaries.data.catSanctuaries;
            const graph: SanctuaryGraph = {};
            result.forEach(s => {
                // sanctuaries
                graph.sanctuaries = !graph.sanctuaries ? [] : graph.sanctuaries;
                graph.sanctuaries.push({
                    id: s.id,
                    name: s.name,
                    addressId: s.address.id,
                    petIds: s.catInventory.map(c => c.id)
                });
                // addresses
                graph.addresses = !graph.addresses ? [] : graph.addresses;
                graph.addresses.push({
                    id: s.address.id,
                    street: s.address.street,
                    city: s.address.city,
                    stateProv: s.address.stateProv,
                    zipPostal: s.address.zipPostal
                });
                // pets
                s.catInventory.forEach(p => {
                    graph.pets = !graph.pets ? [] : graph.pets;
                    graph.pets.push({
                        id: p.id,
                        name: p.name,
                        age: p.age,
                        breed: p.breed,
                        historyIds: p.owners ? p.owners.map(h => {
                            // history
                            graph.ranges = !graph.ranges ? [] : graph.ranges;
                            graph.ranges.push({
                                id: h.id,
                                petId: h.cat.id,
                                ownerId: h.owner.id,
                                sanctuaryId: h.sanctuary.id,
                                start: h.start,
                                end: h.end
                            });
                            return h.id;
                        }) : this.altOwner(graph)
                    });
                });
            });
            return graph;
        }));
    }

    private altOwner(graph: SanctuaryGraph): string[] {
        graph.ranges = [];
        return [];
    }
}
