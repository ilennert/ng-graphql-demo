
import { SanctuaryListComponent } from './sanctuary-list/sanctuary-list.component';
import { SanctuaryDetailComponent } from './sanctuary-detail/sanctuary-detail.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { PetTransferFormComponent } from './pet-transfer-form/pet-transfer-form.component';
import { AddEditOwnerComponent } from './add-edit-owner/add-edit-owner.component';
import { AddEditPetComponent } from './add-edit-pet/add-edit-pet.component';
import { AddEditSanctuaryComponent } from './add-edit-sanctuary/add-edit-sanctuary.component';

export const containers: any[] = [
    AddEditOwnerComponent,
    AddEditPetComponent,
    AddEditSanctuaryComponent,
    PetDetailComponent,
    PetTransferFormComponent,
    SanctuaryDetailComponent,
    SanctuaryListComponent
];

export * from './pet-detail/pet-detail.component';
export * from './pet-transfer-form/pet-transfer-form.component';
export * from './sanctuary-detail/sanctuary-detail.component';
export * from './sanctuary-list/sanctuary-list.component';
export * from './add-edit-owner/add-edit-owner.component';
export * from './add-edit-pet/add-edit-pet.component';
export * from './add-edit-sanctuary/add-edit-sanctuary.component';
