import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Address } from '../../graphql.schema';
import { Owner } from '../../model/owner';
import { states } from 'src/assets/states';
import { State } from '../../../store';
import * as fromComponents from '../../component';
import * as appActions from '../../store/actions';
import * as appSelectors from '../../store/selectors';

@Component({
  selector: 'app-add-edit-owner',
  templateUrl: './add-edit-owner.component.html',
  styleUrls: ['./add-edit-owner.component.scss']
})
export class AddEditOwnerComponent implements OnInit {
  ownerForm: FormGroup;

  lastOwner$: Observable<Owner>;
  lastAddress$: Observable<Address>;
  states = states;

  constructor(private modalService: NgbModal,
              private formbuilder: FormBuilder,
              private store: Store<State>) {
    this.lastAddress$ = store.pipe(
      select(appSelectors.selectLastAddressLoaded)
    );
    this.lastOwner$ = store.pipe(
      select(appSelectors.selectLastOwnerLoaded)
    );
  }

  ngOnInit() {
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

    console.log(this.ownerForm);
  }

  get form() { return this.ownerForm.controls; }

  open() {
    const modalRef = this.modalService.open(fromComponents.AddEditAddressComponent);
    modalRef.componentInstance.addressId = '';
  }

  onSubmit() {
    // this.open();
    this.store.dispatch(appActions.createAddress(this.form['addressGroup'].value));
    console.log(this.ownerForm.value);
  }
}

export function notChoose(control: FormControl) {
  const val: string = control.value;
  if (val === 'Choose...') {
    return { notChoose: true };
  }
  return null;
}

