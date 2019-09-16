import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as fromSelectors from '../../store/selectors';
import { Sanctuary } from '../../model/sanctuary';
import { Pet } from '../../model/pet';
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
  pets$: Observable<Pet[]>;
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
    this.pets$ = this.store.pipe(
      select(fromSelectors.selectAllPets)
    );
  }

  petFormatter = (result: Pet) => result.name.toUpperCase();
  petShow = (item: Pet) => item.name;

  petSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => this.pets$.pipe(map(ps => term.length < 2 && term === '*'
        ? ps.slice(0, 10)
        : term.length < 2 ? []
        : ps.filter(p => p.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))))
    )

    ownerSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  onSancDirChange(event) {
    this.ownerSearchCtl = event !== 'to' || this.ownerdir !== 'stray';
    this.sancdir = event;
    console.log(event);
  }

  onOwnerDirChange(event) {
    this.ownerSearchCtl = event !== 'stray' || this.sancdir !== 'to';
    this.ownerdir = event;
    console.log(event);
  }
}
