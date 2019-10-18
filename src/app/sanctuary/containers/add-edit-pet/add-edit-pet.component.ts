
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { Pet } from '../../model/pet';
import { Species } from '../../model/species';
import { State } from '../../../store';
import * as appActions from '../../store/actions';
import * as appSelectors from '../../store/selectors';
import * as fromRoot from '../../../store';

@Component({
  selector: 'app-add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrls: ['./add-edit-pet.component.scss']
})
export class AddEditPetComponent implements OnInit {
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
  });
  }

  ngOnInit() {

  }
}
