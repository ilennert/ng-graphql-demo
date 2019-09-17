
import { OwnerEffects } from './owner.effect';
import { PetEffects } from './pet.effect';
import { SanctuaryEffects } from './sanctuary.effect';

export const effects: any[] = [
    OwnerEffects,
    PetEffects,
    SanctuaryEffects
];

export * from './owner.effect';
export * from './pet.effect';
export * from './sanctuary.effect';
