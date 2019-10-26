import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Address } from '../../graphql.schema';

import { states } from 'src/assets/states';
import { State } from '../../../store';
import * as appActions from '../../store/actions';
import * as appSelectors from '../../store/selectors';

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
  lastAddress$: Observable<Address>;

  constructor(public activeModal: NgbActiveModal,
              private formbuilder: FormBuilder,
              private store: Store<State>
              ) {
    this.lastAddress$ = store.pipe(
      select(appSelectors.selectLastAddressLoaded)
    );
  }

  ngOnInit() {
    let init = true;
    this.addressForm = this.formbuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      stateProv: ['Choose...', [Validators.required, notChoose]],
      zipPostal: ['', Validators.required]
    });

    this.lastAddress$.subscribe(
      address => {
        console.log(address, init);
        if (address && !init) {
          this.activeModal.close('Address Submitted');
        }
      }
    );

    init = false;
  }

  // onStateChange(event: string) {

  // }

  onSubmit() {
    this.store.dispatch(appActions.createPersonAddress(this.addressForm.value));
  }
}

export function notChoose(control: FormControl) {
  const val: string = control.value;
  if (val === 'Choose...') {
    return { notChoose: true };
  }
  return null;
}
