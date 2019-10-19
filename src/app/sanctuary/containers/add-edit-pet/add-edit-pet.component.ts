
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { Pet } from '../../model/pet';
import { Species } from '../../model/species';
import { State } from '../../../store';
import { notChoose } from '../../helpers/selectHelper';
import * as appActions from '../../store/actions';
import * as appSelectors from '../../store/selectors';
import * as fromRoot from '../../../store';

@Component({
  selector: 'app-add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrls: ['./add-edit-pet.component.scss']
})
export class AddEditPetComponent {
  petForm: FormGroup;

  // pet$: Observable<Pet>;
  species$: Observable<Species[]>;

  constructor(private formbuilder: FormBuilder,
              private store: Store<State>) {
  this.species$ = store.pipe(
    select(appSelectors.selectAllSpecies)
  );

  // this.pet$ = store.pipe(
  //     select(appSelectors.selectLastOwnerLoaded)
  //   );

  this.petForm = this.formbuilder.group({
    name: [null, Validators.required],
    age: [null, Validators.required],
    breed: [null, Validators.required],
    species: ['Choose...', [Validators.required, notChoose]]
  });
  }

  onSubmit(): void {
    console.log(this.petForm.value);
  }

  onCancel(): void {
    this.store.dispatch(fromRoot.back());
  }
}
