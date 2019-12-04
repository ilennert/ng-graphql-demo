
import { HistorySubscribedGuard } from './history-subscription.guard';
import { OwnersGuard } from './owners.guard';
import { PetsGuard } from './pets.guard';
import { SanctuariesGuard } from './sanctuaries.guard';
import { SanctuaryExistsGuard } from './sanctuary-exists.guard';
import { SpeciesGuard } from './species.guard';
import { OwnersSubscribedGuard } from './owners-subscription.guard';
import { PetExistsGuard } from './pet-exists.guard';
import { PetsSubscribedGuard } from './pets-subscription.guard';
import { SanctuariesSubscribedGuard } from './sanctuaries-subscription.guard';
import { SpeciesSubscribedGuard } from './species-subscription.guard';

export const guards: any[] = [
    HistorySubscribedGuard,
    OwnersGuard,
    PetsGuard,
    SanctuariesGuard,
    SanctuaryExistsGuard,
    SpeciesGuard,
    OwnersSubscribedGuard,
    PetExistsGuard,
    PetsSubscribedGuard,
    SanctuariesSubscribedGuard,
    SpeciesSubscribedGuard
];

export * from './history-subscription.guard';
export * from './owners.guard';
export * from './pets.guard';
export * from './sanctuaries.guard';
export * from './sanctuary-exists.guard';
export * from './species.guard';
export * from './owners-subscription.guard';
export * from './pet-exists.guard';
export * from './pets-subscription.guard';
export * from './sanctuaries-subscription.guard';
export * from './species-subscription.guard';
