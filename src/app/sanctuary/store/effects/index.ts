
import { AddressEffects } from './address.effect';
import { HistoryEffects } from './history.effect';
import { OwnerEffects } from './owner.effect';
import { PetEffects } from './pet.effect';
import { SanctuaryEffects } from './sanctuary.effect';
import { SpeciesEffects } from './species.effect';

export const effects: any[] = [
    AddressEffects,
    HistoryEffects,
    OwnerEffects,
    PetEffects,
    SanctuaryEffects,
    SpeciesEffects
];

export * from './address.effect';
export * from './history.effect';
export * from './owner.effect';
export * from './pet.effect';
export * from './sanctuary.effect';
export * from './species.effect';
