import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { states } from 'src/assets/states';

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent implements OnInit {
  @Input() addressId: string;

  addressForm: FormGroup;
  states = states;

  constructor(public activeModal: NgbActiveModal,
              private formbuilder: FormBuilder) { }

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

  }
}

export function notChoose(control: FormControl) {
  const val: string = control.value;
  if (val === 'Choose...') {
    return { notChoose: true };
  }
  return null;
}
