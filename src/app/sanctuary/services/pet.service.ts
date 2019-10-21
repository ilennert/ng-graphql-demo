
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
                    start
                    end
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
            result.forEach(p => {
                // pets
                graph.pets = !graph.pets ? [] : graph.pets;
                graph.pets.push({
                    id: p.id,
                    name: p.name,
                    age: p.age,
                    breed: p.breed,
                    species: p.species,
                    historyIds: p.owners && p.owners.length ? p.owners.map(h => {
                        // history
                        graph.ranges = !graph.ranges ? [] : graph.ranges;
                        graph.ranges.push({
                            id: h.id,
                            petId: h.pet.id,
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

    changePetOwnership(transForm: TransferPetForm): Observable<any> {
        return this.apollo.mutate({
            mutation: this.changePetOwnershipMutation,
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
