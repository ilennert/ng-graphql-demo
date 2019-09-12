
import { SanctuaryListComponent } from './sanctuary-list/sanctuary-list.component';
import { SanctuaryDetailComponent } from './sanctuary-detail/sanctuary-detail.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { PetTransferFormComponent } from './pet-transfer-form/pet-transfer-form.component';

export const containers: any[] = [
    PetDetailComponent,
    PetTransferFormComponent,
    SanctuaryDetailComponent,
    SanctuaryListComponent
];

export * from './pet-detail/pet-detail.component';
export * from './pet-transfer-form/pet-transfer-form.component';
export * from './sanctuary-detail/sanctuary-detail.component';
export * from './sanctuary-list/sanctuary-list.component';
