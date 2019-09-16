
import { PetsGuard } from './pets.guard';
import { SanctuariesGuard } from './sanctuaries.guard';
import { SanctuaryExistsGuard } from './sanctuary-exists.guard';

export const guards: any[] = [
    PetsGuard,
    SanctuariesGuard,
    SanctuaryExistsGuard
];

export * from './pets.guard';
export * from './sanctuaries.guard';
export * from './sanctuary-exists.guard';
