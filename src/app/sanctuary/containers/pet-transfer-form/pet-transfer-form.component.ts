
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as fromSelectors from '../../store/selectors';
import { Sanctuary } from '../../model/sanctuary';
import { Owner } from '../../model/owner';
import { Pet } from '../../model/pet';
import { State } from '../../../reducers';

@Component({
  selector: 'app-pet-transfer-form',
  templateUrl: './pet-transfer-form.component.html',
  styleUrls: ['./pet-transfer-form.component.scss']
})
export class PetTransferFormComponent {

  sanctuary$: Observable<Sanctuary>;
  pets$: Observable<Pet[]>;
  owners$: Observable<Owner[]>;
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

  constructor(private store: Store<State>) {
    this.sanctuary$ = this.store.pipe(
      select(fromSelectors.selectCurrentSanctuary)
    );
    this.pets$ = this.store.pipe(
      select(fromSelectors.selectAllPets)
    );
    this.owners$ = this.store.pipe(
      select(fromSelectors.selectAllOwners)
    );
  }

  petFormatter = (result: Pet) => result.name.toUpperCase();
  petShow = (item: Pet) => item.name;

  ownerFormatter = (result: Owner) => result.name.toUpperCase();
  ownerShow = (item: Owner) => item.name;

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
      switchMap(term => this.owners$.pipe(map(os => term.length < 2 && term === '*'
        ? os.slice(0, 10)
        : term.length < 2 ? []
        : os.filter(p => p.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))))
    )

  onSancDirChange(event) {
    this.sancdir = event;
    this.ownerdir = event === 'from' ? 'to' : 'from';
    this.ownerSearchCtl = event !== 'to' || this.ownerdir !== 'stray';
    console.log(event);
  }

  onOwnerDirChange(event) {
    this.ownerdir = event;
    this.sancdir = event === 'from' || event === 'stray' ? 'to' : 'from';
    this.ownerSearchCtl = event !== 'stray' || this.sancdir !== 'to';
    console.log(event);
  }
}
