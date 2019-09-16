
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SanctuaryGraph } from '../model/sanctuary-graph';
import { TransferPetForm } from '../model/transfer-pet';
import { Cat, CatOwnerRange, TransferPetInput } from '../graphql.schema';

const petsQuery = gql`
    query {
        cats {
            id
            name
            age
            breed
            owners {
                id
                cat {
                    id
                }
                owner {
                    id
                }
                sanctuary {
                    id
                }
                start
                end
            }
        }
    }
`;

const changePetOwnership = gql`
    mutation {
        changePetOwnership (transferPetInput: $transferPetInput) {
            id
        }
    }
`;

@Injectable()
export class PetService {

    constructor(private apollo: Apollo) {}

    getAllSanctuaryInfo(): Observable<SanctuaryGraph> {
        return this.apollo.watchQuery<any>({
            query: petsQuery
        }).valueChanges.pipe(map(pets => {
            const result: Cat[] = pets.data.cats;
            const graph: SanctuaryGraph = {};
            result.forEach(p => {
                // pets
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
            return graph;
        }));
    }

    changePetOwnership(transForm: TransferPetForm): Observable<any> {
        return this.apollo.mutate({
            mutation: changePetOwnership,
            variables: {
                transferPetInput: transForm
            }
        });
    }

    private altOwner(graph: SanctuaryGraph): string[] {
        graph.ranges = [];
        return [];
    }
}
