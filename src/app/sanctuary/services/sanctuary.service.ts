
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SanctuaryGraph } from '../model/sanctuary-graph';
import { PetSanctuary, PetSanctuaryInput } from '../graphql.schema';

@Injectable()
export class SanctuaryService {

    private sanctuariesQuery = gql`
        query {
            petSanctuaries {
                id
                name
                address {
                    id
                    street
                    city
                    stateProv
                    zipPostal
                }
                petInventory {
                    id
                    name
                    breed
                    age
                    species
                }
            }
        }
    `;

    private createSanctuaryMutation = gql`
        mutation createPetSanctuaryFull($petSanctuaryInput: PetSanctuaryInput!) {
            createPetSanctuaryFull(petSanctuaryInput: $petSanctuaryInput) {
                id
                name
                address {
                    id
                    street
                    city
                    stateProv
                    zipPostal
                }
                petInventory {
                    id
                }
            }
        }
    `;

    private sanctuaryAddedSubscription = gql`
        subscription sanctuaryAdded {
            sanctuaryAdded {
                id
                name
                address {
                    id
                    street
                    city
                    stateProv
                    zipPostal
                }
                petInventory {
                    id
                }
            }
        }
    `;

constructor(private apollo: Apollo) {}

    public getAllSanctuaryInfo(): Observable<SanctuaryGraph> {
        return this.apollo.watchQuery<any>({
            query: this.sanctuariesQuery
        }).valueChanges.pipe(map(sanctuaries => {
            const result: PetSanctuary[] = sanctuaries.data.petSanctuaries;
            const graph: SanctuaryGraph = {};
            result.forEach(s => {
                // sanctuaries
                graph.sanctuaries = !graph.sanctuaries ? [] : graph.sanctuaries;
                graph.sanctuaries.push({
                    id: s.id,
                    name: s.name,
                    addressId: s.address.id,
                    petIds: s.petInventory.map(c => c.id)
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
                s.petInventory.forEach(p => {
                    graph.pets = !graph.pets ? [] : graph.pets;
                    graph.pets.push({
                        id: p.id,
                        name: p.name,
                        age: p.age,
                        breed: p.breed,
                        species: p.species,
                        historyIds: p.owners ? p.owners.map(h => {
                            // history
                            graph.ranges = !graph.ranges ? [] : graph.ranges;
                            graph.ranges.push({
                                id: h.id,
                                petId: h.pet.id,
                                ownerId: h.owner.id,
                                sanctuaryId: h.sanctuary.id,
                                toOwner: !!h.toOwner,
                                transactionDate: h.transactionDate,
                            });
                            return h.id;
                        }) : this.altOwner(graph)
                    });
                });
            });
            return graph;
        }));
    }

    public createSanctuary(petSanctuaryInput: PetSanctuaryInput): Observable<SanctuaryGraph> {
        return this.apollo.mutate({
            mutation: this.createSanctuaryMutation,
            variables: {
                petSanctuaryInput
            }
        }).pipe(
            map(data => {
                const res: PetSanctuary = data.data['createPetSanctuaryFull'];
                const graph: SanctuaryGraph = {};
                // sanctuaries
                graph.sanctuaries = !graph.sanctuaries ? [] : graph.sanctuaries;
                graph.sanctuaries.push({
                    id: res.id,
                    name: res.name,
                    addressId: res.address.id,
                    petIds: res.petInventory.map(c => c.id)
                });
                // addresses
                graph.addresses = !graph.addresses ? [] : graph.addresses;
                graph.addresses.push({
                    id: res.address.id,
                    street: res.address.street,
                    city: res.address.city,
                    stateProv: res.address.stateProv,
                    zipPostal: res.address.zipPostal
                 });
                return graph;
            })
        );
    }

    sanctuarySubscription(): Observable<SanctuaryGraph> {
        return this.apollo.subscribe({
            query: this.sanctuaryAddedSubscription
        }).pipe(
            map(data => {
                const res: PetSanctuary = data.data['sanctuaryAdded'];
                const graph: SanctuaryGraph = {};
                // sanctuaries
                graph.sanctuaries = !graph.sanctuaries ? [] : graph.sanctuaries;
                graph.sanctuaries.push({
                    id: res.id,
                    name: res.name,
                    addressId: res.address.id,
                    petIds: res.petInventory.map(c => c.id)
                });
                // addresses
                graph.addresses = !graph.addresses ? [] : graph.addresses;
                graph.addresses.push({
                    id: res.address.id,
                    street: res.address.street,
                    city: res.address.city,
                    stateProv: res.address.stateProv,
                    zipPostal: res.address.zipPostal
                 });
                return graph;
            })
        );
    }

    private altOwner(graph: SanctuaryGraph): string[] {
        graph.ranges = [];
        return [];
    }
}
