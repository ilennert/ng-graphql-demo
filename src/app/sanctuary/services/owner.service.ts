
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SanctuaryGraph } from '../model/sanctuary-graph';
import { Owner as OwnerModel } from '../model/owner';
import { Address, AddressInput, Cat, Owner, Person, PersonInput } from '../graphql.schema';

const ownersQuery = gql`
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
                    sanctuary
                    {
                        id
                    }
                    start
                    end
                }
            }
        }
    }
`;

const createPerson = gql`
    mutation {
        createPerson (personInput: $personInput) {
            id
            name
            addresses {
                id
                street
                stateProv
                zipPostal
            }
            birthdate
        }
    }
`;

const createAddress = gql`
    mutation {
        createAddress(addressInput: $addressInput) {
            id
            street
            city
            stateProv
            zipPostal
        }
    }
`;

@Injectable()
export class OwnerService {

    constructor(private apollo: Apollo) {}

    getAllOwnerInfo(): Observable<SanctuaryGraph> {
        return this.apollo.watchQuery<any>({
            query: ownersQuery
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
                    catIds: o.cats && o.cats.length ? o.cats.map(c => {
                        graph.pets = !graph.pets ? [] : graph.pets;
                        graph.pets.push({
                            id: c.id,
                            name: c.name,
                            age: c.age,
                            breed: c.breed,
                            historyIds: c.owners && c.owners.length ? c.owners.map(h => {
                                graph.ranges = !graph.ranges ? [] : graph.ranges;
                                graph.ranges.push({
                                    id: h.id,
                                    petId: h.cat.id,
                                    ownerId: h.owner ? h.owner.id : undefined,
                                    sanctuaryId: h.sanctuary ? h.sanctuary.id : undefined,
                                    start: h.start,
                                    end: h.end
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

    createPerson(personInput: PersonInput): Observable<any> {
        return this.apollo.mutate({
            mutation: createPerson,
            variables: {
                personInput
            }
        });
    }

    createAddress(addressForm: AddressInput): Observable<any> {
        return this.apollo.mutate({
            mutation: createAddress,
            variables: {
                addressInput: addressForm
            }
        });
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
