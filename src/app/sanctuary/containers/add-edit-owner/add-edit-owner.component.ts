import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as fromComponents from '../../component';

@Component({
  selector: 'app-add-edit-owner',
  templateUrl: './add-edit-owner.component.html',
  styleUrls: ['./add-edit-owner.component.scss']
})
export class AddEditOwnerComponent implements OnInit {
  ownerForm: FormGroup;

  constructor(private modalService: NgbModal,
              private formbuilder: FormBuilder) { }

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
