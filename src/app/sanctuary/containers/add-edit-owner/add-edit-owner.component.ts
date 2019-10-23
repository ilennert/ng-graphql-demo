import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { Address, PersonInput } from '../../graphql.schema';
import { Owner } from '../../model/owner';
import { states } from 'src/assets/states';
import { State } from '../../../store';
import { notChoose } from '../../helpers/selectHelper';
import * as appActions from '../../store/actions';
import * as appSelectors from '../../store/selectors';
import * as fromRoot from '../../../store';

@Component({
  selector: 'app-add-edit-owner',
  templateUrl: './add-edit-owner.component.html',
  styleUrls: ['./add-edit-owner.component.scss']
})
export class AddEditOwnerComponent {
  ownerForm: FormGroup;

  states = states;
  tempOwn: PersonInput;

  constructor( // private modalService: NgbModal,
              private formbuilder: FormBuilder,
              private store: Store<State>) {

    this.ownerForm = this.formbuilder.group({
      personGroup: this.formbuilder.group({
        name: [null, Validators.required],
        birthdate: [null]
      }),
      addressGroup: this.formbuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        stateProv: ['Choose...', [Validators.required, notChoose]],
        zipPostal: ['', Validators.required]
      })
    });
  }

  get formA() { return this.ownerForm.controls['addressGroup'] as FormGroup; }
  get formP() { return this.ownerForm.controls['personGroup'] as FormGroup; }
  get formPgp() { return this.formP.controls; }

  onSubmit() {
    const birthdate = this.formPgp['birthdate'].value;
    this.tempOwn = {
      name: this.formPgp['name'].value,
      addresses: [ this.formA.value ],
      birthdate: { year: birthdate.year, month: birthdate.month, day: birthdate.day }
    };
    this.store.dispatch(appActions.createOwner(this.tempOwn));
  }

  onCancel(): void {
    this.store.dispatch(fromRoot.back());
  }
}
