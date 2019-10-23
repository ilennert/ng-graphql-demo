import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { states } from 'src/assets/states';
import { State } from '../../../store';
import { PetSanctuaryInput } from '../../graphql.schema';
import * as appActions from '../../store/actions';
import { notChoose } from '../../helpers/selectHelper';
import * as appSelectors from '../../store/selectors';
import * as fromRoot from '../../../store';

@Component({
  selector: 'app-add-edit-sanctuary',
  templateUrl: './add-edit-sanctuary.component.html',
  styleUrls: ['./add-edit-sanctuary.component.scss']
})
export class AddEditSanctuaryComponent {

  sanctuaryForm: FormGroup;
  states = states;
  tempOwn: PetSanctuaryInput;

  constructor(private formbuilder: FormBuilder,
              private store: Store<State>) {

    this.sanctuaryForm = this.formbuilder.group({
      sanctuaryGroup: this.formbuilder.group({
        name: [null, Validators.required],
      }),
      addressGroup: this.formbuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        stateProv: ['Choose...', [Validators.required, notChoose]],
        zipPostal: ['', Validators.required]
      })
    });
  }

  get formA() { return this.sanctuaryForm.controls['addressGroup'] as FormGroup; }
  get formS() { return this.sanctuaryForm.controls['personGroup'] as FormGroup; }
  get formSgp() { return this.formP.controls; }

  onSubmit() {
    this.tempOwn = {
      name: this.formSgp['name'].value,
      address: this.formA.value
    };
    this.store.dispatch(appActions.createSanctuary(this.tempOwn));
  }

  onCancel(): void {
    this.store.dispatch(fromRoot.back());
  }
}
