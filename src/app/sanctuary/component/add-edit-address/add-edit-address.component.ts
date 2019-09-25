import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { states } from 'src/assets/states';
import { State } from '../../../store';
import * as appActions from '../../store/actions';

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent implements OnInit {
  @Input() submitted: boolean;
  @Input() addressId: string;

  addressForm: FormGroup;
  states = states;

  constructor(public activeModal: NgbActiveModal,
              private formbuilder: FormBuilder,
              private store: Store<State>
              ) { }

  ngOnInit() {
    this.addressForm = this.formbuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      stateProv: ['Choose...', [Validators.required, notChoose]],
      zipPostal: ['', Validators.required]
    });
  }

  // onStateChange(event: string) {

  // }

  onSubmit() {
    this.store.dispatch(appActions.createAddress(this.addressForm.value));
  }
}

export function notChoose(control: FormControl) {
  const val: string = control.value;
  if (val === 'Choose...') {
    return { notChoose: true };
  }
  return null;
}
