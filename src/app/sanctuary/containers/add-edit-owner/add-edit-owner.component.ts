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
      name: ['', Validators.required],
      // addressId: ['', Validators.required],
      birthdate: ['']
    });
  }

  open() {
    const modalRef = this.modalService.open(fromComponents.AddEditAddressComponent);
    modalRef.componentInstance.addressId = '';
  }

  onSubmit() {
    console.log(this.ownerForm.value);
  }
}
