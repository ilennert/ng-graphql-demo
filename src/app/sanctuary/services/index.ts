
import { OwnerService } from './owner.service';
import { PetService } from './pet.service';
import { SanctuaryService } from './sanctuary.service';

export const services: any[] = [
    OwnerService,
    PetService,
    SanctuaryService,
];

export * from './owner.service';
export * from './pet.service';
export * from './sanctuary.service';
