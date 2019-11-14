
import { HistorySubscribedGuard } from './history-subscription.guard';
import { OwnersGuard } from './owners.guard';
import { PetsGuard } from './pets.guard';
import { SanctuariesGuard } from './sanctuaries.guard';
import { SanctuaryExistsGuard } from './sanctuary-exists.guard';
import { SpeciesGuard } from './species.guard';

export const guards: any[] = [
    HistorySubscribedGuard,
    OwnersGuard,
    PetsGuard,
    SanctuariesGuard,
    SanctuaryExistsGuard,
    SpeciesGuard
];

export * from './history-subscription.guard';
export * from './owners.guard';
export * from './pets.guard';
export * from './sanctuaries.guard';
export * from './sanctuary-exists.guard';
export * from './species.guard';
