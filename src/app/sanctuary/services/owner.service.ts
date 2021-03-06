
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { SanctuaryGraph } from '../model/sanctuary-graph';
import { Address, AddressInput, Owner, Person, PersonInput } from '../graphql.schema';

@Injectable()
export class OwnerService {

    ownersQuery = gql`
    query {
        people {
            id
            name
            addresses {
                id
                street
                city
                stateProv
                zipPostal
            }
            birthdate
            pets {
                id
                name
                age
                breed
                owners {
                    id
                    pet {
                        id
                    }
                    owner {
                        id
                    }
                    sanctuary
                    {
                        id
                    }
                    transactionDate
                }
            }
        }
    }`;

    createPersonMutation = gql`
        mutation createPerson ($personInput: PersonInput!) {
            createPerson (personInput: $personInput) {
                id
                name
                addresses {
                    id
                    street
                    city
                    stateProv
                    zipPostal
                }
                birthdate
            }
        }
    `;

    createAddressMutation = gql`
        mutation createAddress($addressInput: AddressInput!) {
            createAddress(addressInput: $addressInput) {
                id
                street
                city
                stateProv
                zipPostal
            }
        }
    `;

    personAddedSubscription = gql`
        subscription personAdded {
            personAdded {
                id
                name
                addresses {
                    id
                    street
                    city
                    stateProv
                    zipPostal
                }
                birthdate
            }
        }
    `;

    constructor(private apollo: Apollo) {}

    getAllOwnerInfo(): Observable<SanctuaryGraph> {
        return this.apollo.watchQuery<any>({
            query: this.ownersQuery
        }).valueChanges.pipe(map(owners => {
            const result: Owner[] = owners.data.people;
            const graph: SanctuaryGraph = {};
            result.forEach(o => {
                // pets
                graph.owners = !graph.owners ? [] : graph.owners;
                graph.owners.push({
                    id: o.id,
                    name: o.name,
                    birthdate: o.birthdate,
                    addressIds: o.addresses && o.addresses.length ? o.addresses.map(a => {
                        graph.addresses = !graph.addresses ? [] : graph.addresses;
                        graph.addresses.push({
                            id: a.id,
                            street: a.street,
                            city: a.city,
                            stateProv: a.stateProv,
                            zipPostal: a.zipPostal
                        });
                        return a.id;
                    }) : this.altAddress(graph),
                    petIds: o.pets && o.pets.length ? o.pets.map(c => {
                        graph.pets = !graph.pets ? [] : graph.pets;
                        graph.pets.push({
                            id: c.id,
                            name: c.name,
                            age: c.age,
                            breed: c.breed,
                            species: c.species,
                            historyIds: c.owners && c.owners.length ? c.owners.map(h => {
                                graph.ranges = !graph.ranges ? [] : graph.ranges;
                                graph.ranges.push({
                                    id: h.id,
                                    petId: h.pet.id,
                                    ownerId: h.owner ? h.owner.id : undefined,
                                    sanctuaryId: h.sanctuary ? h.sanctuary.id : undefined,
                                    toOwner: !!h.toOwner,
                                    transactionDate: h.transactionDate,
                                });
                                return h.id;
                            }) : this.altHistory(graph)
                        });
                        return c.id;
                    }) : this.altPet(graph)
                });
            });
            return graph;
        }));
    }

    createPerson(personInput: PersonInput): Observable<SanctuaryGraph> {
        return this.apollo.mutate({
            mutation: this.createPersonMutation,
            variables: {
                personInput
            }
        }).pipe(
            map(data => {
                const res: Person = data.data['createPerson'];
                const graph: SanctuaryGraph = {};
                graph.addresses = res.addresses;
                graph.owners = [ { ...res, addressIds: res.addresses.map(a => (a.id)) } ];
                return graph;
            })
        );
    }

    createAddress(addressForm: AddressInput): Observable<SanctuaryGraph> {
        return this.apollo.mutate({
            mutation: this.createAddressMutation,
            variables: {
                addressInput: addressForm
            }
        }).pipe(map(data => {
                const res: Address = data.data['createAddress'];
                console.log(res);
                const graph: SanctuaryGraph = {};
                graph.addresses = [ res ];
                return graph;
            })
        );
    }

    personSubscription(): Observable<SanctuaryGraph> {
        return this.apollo.subscribe({
            query: this.personAddedSubscription
        }).pipe(
            map(data => {
                const res: Person = data.data['personAdded'];
                const graph: SanctuaryGraph = {};
                graph.addresses = res.addresses;
                graph.owners = [ { ...res, addressIds: res.addresses.map(a => (a.id)) } ];
                return graph;
            }),
            catchError((err, caught) => {
                console.log(err);
                return caught;
            })
        );
    }

    private altPet(graph: SanctuaryGraph): string[] {
        graph.pets = [];
        graph.ranges = [];
        return [];
    }

    private altAddress(graph: SanctuaryGraph): string[] {
        graph.addresses = [];
        return [];
    }

    private altHistory(graph: SanctuaryGraph): string[] {
        graph.ranges = [];
        return [];
    }
}
