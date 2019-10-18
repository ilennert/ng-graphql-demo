
import { AddressEffects } from './address.effect';
import { OwnerEffects } from './owner.effect';
import { PetEffects } from './pet.effect';
import { SanctuaryEffects } from './sanctuary.effect';
import { SpeciesEffects } from './species.effect';

export const effects: any[] = [
    AddressEffects,
    OwnerEffects,
    PetEffects,
    SanctuaryEffects,
    SpeciesEffects
];

export * from './address.effect';
export * from './owner.effect';
export * from './pet.effect';
export * from './sanctuary.effect';
export * from './species.effect';
