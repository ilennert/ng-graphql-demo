import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { Address, AddressInput, PersonInput } from '../../graphql.schema';
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
  addressGroup: FormArray;

  states = states;
  tempOwn: PersonInput;

  constructor(private formbuilder: FormBuilder,
              private store: Store<State>) {

    this.ownerForm = this.formbuilder.group({
      personGroup: this.formbuilder.group({
        name: [null, Validators.required],
        birthdate: [null]
      }),
      addressGroup: this.formbuilder.array([ this.createAddress() ])
    });
  }

  get formA() { return this.ownerForm.controls['addressGroup'] as FormArray; }
  get formP() { return this.ownerForm.controls['personGroup'] as FormGroup; }
  get formPgp() { return this.formP.controls; }

  createAddress(): FormGroup {
    return this.formbuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      stateProv: ['Choose...', [Validators.required, notChoose]],
      zipPostal: ['', Validators.required]
    });
  }

  addAddress(): void {
    this.addressGroup = this.ownerForm.get('addressGroup') as FormArray;
    this.addressGroup.push(this.createAddress());
  }

  onSubmit() {
    const birthdate = this.formPgp['birthdate'].value;
    const addresses = this.formA.value;
    this.tempOwn = {
      name: this.formPgp['name'].value,
      addresses,
      birthdate: { year: birthdate.year, month: birthdate.month, day: birthdate.day }
    };
    this.store.dispatch(appActions.createOwner(this.tempOwn));
  }

  onCancel(): void {
    this.store.dispatch(fromRoot.back());
  }

  onAddAddress(): void {
    this.addAddress();
  }
}
