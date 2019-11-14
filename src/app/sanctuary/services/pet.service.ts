
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SanctuaryGraph } from '../model/sanctuary-graph';
import { TransferPetForm } from '../model/transfer-pet';
import {
    PetInput,
    Pet,
    Species,
    PetOwnerRange,
    TransferPetInput,
    SpeciesInput } from '../graphql.schema';

@Injectable()
export class PetService {

    petsQuery = gql`
        query {
            pets {
                id
                name
                age
                breed
                species
                owners {
                    id
                    pet {
                        id
                    }
                    owner {
                        id
                    }
                    sanctuary {
                        id
                    }
                    toOwner
                    transactionDate
                }
            }
        }
    `;

    speciesQuery = gql`
        query {
            species {
                id
                name
            }
        }
    `;

    createPetMutation = gql`
        mutation createPet ($petInput: PetInput!) {
            createPet (petInput: $petInput) {
                id
                name
                age
                breed
                species
            }
        }
    `;

    createSpeciesMutation = gql`
        mutation createSpecies ($speciesInput: SpeciesInput!) {
            createSpecies (speciesInput: $speciesInput) {
                id
                name
            }
        }
    `;

    changePetOwnershipMutation = gql`
        mutation changePetOwnership ($transferPetInput: TransferPetInput!) {
            changePetOwnership (transferPetInput: $transferPetInput) {
                id
                pet {
                    id
                }
                owner {
                    id
                }
                sanctuary {
                    id
                }
                toOwner
                transactionDate
            }
        }
    `;

    changePetOwnershipSubscription = gql`
        subscription petOwnershipChanged {
            petOwnershipChanged {
                id
                pet {
                    id
                }
                owner {
                    id
                }
                sanctuary {
                    id
                }
                toOwner
                transactionDate
            }
        }
    `;

    constructor(private apollo: Apollo) {}

    getAllPetInfo(): Observable<SanctuaryGraph> {
        return this.apollo.watchQuery<any>({
            query: this.petsQuery
        }).valueChanges.pipe(map(pets => {
            const result: Pet[] = pets.data.pets;
            const graph: SanctuaryGraph = {};
            graph.pets = [];
            graph.ranges = [];
            result.forEach(p => {
                // pets
                graph.pets.push({
                    id: p.id,
                    name: p.name,
                    age: p.age,
                    breed: p.breed,
                    species: p.species,
                    historyIds: p.owners.map(h => {
                        // history
                        graph.ranges.push({
                            id: h.id,
                            petId: h.pet.id,
                            ownerId: h.owner ? h.owner.id : undefined,
                            sanctuaryId: h.sanctuary ? h.sanctuary.id : undefined,
                            toOwner: !!h.toOwner,
                            transactionDate: h.transactionDate,
                        });
                        return h.id;
                    })
                });
            });
            return graph;
        }));
    }

    getAllSpecies(): Observable<SanctuaryGraph> {
        return this.apollo.watchQuery<any>({
            query: this.speciesQuery
        }).valueChanges.pipe(
            map(s => {
                const res: Species[] = s.data.species;
                const graph: SanctuaryGraph = {};
                graph.species = res.map(sp => ({id: sp.id, name: sp.name}));
                return graph;
            })
        );
    }

    createPet(petInput: PetInput): Observable<SanctuaryGraph> {
        return this.apollo.mutate({
            mutation: this.createPetMutation,
            variables: {
                petInput
            }
        }).pipe(
            map(data => {
                const res: Pet = data.data['createPet'];
                const graph: SanctuaryGraph = {};
                graph.pets = [ {...res, historyIds: []} ];
                return graph;
            })
        );
    }

    createSpecies(speciesInput: SpeciesInput): Observable<SanctuaryGraph> {
        return this.apollo.mutate({
            mutation: this.createSpeciesMutation,
            variables: {
                speciesInput
            }
        }).pipe(
            map(data => {
                const res: Species = data.data['createSpecies'];
                console.log(res);
                const graph: SanctuaryGraph = {};
                graph.species = [ res ];
                return graph;
            })
        );
    }

    changePetOwnership(transferPetInput: TransferPetForm): Observable<SanctuaryGraph> {
        return this.apollo.mutate({
            mutation: this.changePetOwnershipMutation,
            variables: {
                transferPetInput
            }
        }).pipe(
            map(data => {
                const res: PetOwnerRange = data.data['changePetOwnership'];
                const graph: SanctuaryGraph = {};
                graph.ranges = [ {
                    id: res.id,
                    petId: res.pet.id,
                    ownerId: res.owner ? res.owner.id : undefined,
                    sanctuaryId: res.sanctuary ? res.sanctuary.id : undefined,
                    toOwner: !!res.toOwner,
                    transactionDate: new Date(res.transactionDate)
                } ];
                return graph;
            })
        );
    }

    petChangesSubscribed(): Observable<SanctuaryGraph> {
        return this.apollo.subscribe({
            query: this.changePetOwnershipSubscription
        }).pipe(
            map(data => {
                const res: PetOwnerRange = data.data['changePetOwnership'];
                const graph: SanctuaryGraph = {};
                graph.ranges = [ {
                    id: res.id,
                    petId: res.pet.id,
                    ownerId: res.owner ? res.owner.id : undefined,
                    sanctuaryId: res.sanctuary ? res.sanctuary.id : undefined,
                    toOwner: !!res.toOwner,
                    transactionDate: new Date(res.transactionDate)
                } ];
                return graph;
            })
        );
    }

    private altOwner(graph: SanctuaryGraph): string[] {
        graph.ranges = [];
        return [];
    }
}
