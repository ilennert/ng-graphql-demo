import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Address } from '../../graphql.schema';
import { Owner } from '../../model/owner';
import { State } from '../../../store';
import * as fromComponents from '../../component';
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
      name: [null, Validators.required],
      birthdate: [null]
    });

    console.log(this.ownerForm);
  }

  open() {
    const modalRef = this.modalService.open(fromComponents.AddEditAddressComponent);
    modalRef.componentInstance.addressId = '';
  }

  onSubmit() {
    this.open();
    console.log(this.ownerForm.value);
  }
}
