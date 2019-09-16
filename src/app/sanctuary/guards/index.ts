
import { SanctuariesGuard } from './sanctuaries.guard';
import { SanctuaryExistsGuard } from './sanctuary-exists.guard';

export const guards: any[] = [
    SanctuariesGuard,
    SanctuaryExistsGuard
];

export * from './sanctuaries.guard';
export * from './sanctuary-exists.guard';
