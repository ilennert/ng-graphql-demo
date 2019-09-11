
import { SanctuaryListComponent } from './sanctuary-list/sanctuary-list.component';
import { SanctuaryDetailComponent } from './sanctuary-detail/sanctuary-detail.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';

export const containers: any[] = [
    PetDetailComponent,
    SanctuaryDetailComponent,
    SanctuaryListComponent
];

export * from './pet-detail/pet-detail.component';
export * from './sanctuary-detail/sanctuary-detail.component';
export * from './sanctuary-list/sanctuary-list.component';
