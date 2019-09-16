import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as fromSelectors from '../../store/selectors';
import { Sanctuary } from '../../model/sanctuary';
import { State } from '../../../reducers';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-pet-transfer-form',
  templateUrl: './pet-transfer-form.component.html',
  styleUrls: ['./pet-transfer-form.component.scss']
})
export class PetTransferFormComponent {

  sanctuary$: Observable<Sanctuary>;
  transferForm: FormGroup;
  isSubmitted: false;
  public petModel: any;
  public ownerModel: any;
  sancdir = 'to';
  ownerdir = 'stray';
  ownerSearchCtl = false;

  sdirs = [
    {name: 'To', value: 'to'},
    {name: 'From', value: 'from'}
  ];

  odirs = [
    {name: 'Stray', value: 'stray'},
    {name: 'To', value: 'to'},
    {name: 'From', value: 'from'}
  ];

  constructor(private store: Store<State>,
              private formBuilder: FormBuilder) {
    this.sanctuary$ = this.store.pipe(
      select(fromSelectors.selectCurrentSanctuary)
    );
  }

  petSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

    ownerSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  onSancDirChange(event) {
    if (event !== 'to') {
      this.ownerSearchCtl = true;
    } else {
      this.ownerSearchCtl = false;
    }
    console.log(event);
  }

  onOwnerDirChange(event) {
    if (event !== 'stray') {
      this.ownerSearchCtl = true;
    } else {
      this.ownerSearchCtl = false;
    }
    console.log(event);
  }
}
