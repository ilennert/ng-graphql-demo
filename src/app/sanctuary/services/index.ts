
import { PetService } from './pet.service';
import { SanctuaryService } from './sanctuary.service';

export const services: any[] = [
    PetService,
    SanctuaryService,
];

export * from './pet.service';
export * from './sanctuary.service';
