import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Address, PersonInput } from '../../graphql.schema';
import { Owner } from '../../model/owner';
import { states } from 'src/assets/states';
import { State } from '../../../store';
import * as fromComponents from '../../component';
import * as appActions from '../../store/actions';
import * as appSelectors from '../../store/selectors';
import * as fromRoot from '../../../store';

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

  constructor( // private modalService: NgbModal,
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
    let init = true;
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
    this.lastAddress$.subscribe(
      address => {
        console.log(address, init);
        if (address && !init) {
          const inData: PersonInput = {
            name: this.formPfg['name'].value,
            addresses: [{ id: address.id}],
            birthdate: { dateTime: this.formPfg[''].value }
          };
          this.store.dispatch(appActions.createOwner(inData));
        }
      }
    );

    init = false;
  }

  get formA() { return this.ownerForm.controls['addressGroup'].parent as FormGroup; }
  get formP() { return this.ownerForm.controls['personGroup'].parent as FormGroup; }
  get formAfg() { return this.formA.controls; }
  get formPfg() { return this.formP.controls; }

  // open() {
  //   const modalRef = this.modalService.open(fromComponents.AddEditAddressComponent);
  //   modalRef.componentInstance.addressId = '';
  // }

  onSubmit() {
    // this.open();
    this.store.dispatch(appActions.createPersonAddress(this.formA.value));
    console.log(this.ownerForm.value);
  }

  onCancel(): void {
    this.store.dispatch(fromRoot.back());
  }
}

export function notChoose(control: FormControl) {
  const val: string = control.value;
  if (val === 'Choose...') {
    return { notChoose: true };
  }
  return null;
}

