
import { AddressEffects } from './address.effect';
import { OwnerEffects } from './owner.effect';
import { PetEffects } from './pet.effect';
import { SanctuaryEffects } from './sanctuary.effect';

export const effects: any[] = [
    AddressEffects,
    OwnerEffects,
    PetEffects,
    SanctuaryEffects
];

export * from './address.effect';
export * from './owner.effect';
export * from './pet.effect';
export * from './sanctuary.effect';
