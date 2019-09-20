
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
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
  isSubmitted = false;
  petModel: Pet;
  ownerModel: Owner;
  ownerSearchCtl = false;
  transferForm: FormGroup;

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
              private formbuilder: FormBuilder) {
    this.sanctuary$ = this.store.pipe(
      select(fromSelectors.selectCurrentSanctuary)
    );
    this.pets$ = this.store.pipe(
      select(fromSelectors.selectAllPets)
    );
    this.owners$ = this.store.pipe(
      select(fromSelectors.selectAllOwners)
    );

    this.transferForm = this.formbuilder.group({
      sancdir: ['to', Validators.required],
      ownerdir: ['stray', Validators.required],
      petModel: ['', Validators.required ],
      ownerModel: ['', Validators.required ]
    });
    this.formControls['sancdir'].setValue('to');
    this.formControls['ownerdir'].setValue('stray');
  }

  get formControls() { return this.transferForm.controls; }

  petFormatter = (result: Pet) => result.name.toUpperCase();
  petShow = (item: Pet) => {
    this.petModel = item;
    return item.name;
  }

  ownerFormatter = (result: Owner) => result.name.toUpperCase();
  ownerShow = (item: Owner) => {
    this.ownerModel = item;
    return item.name;
  }

  petSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => combineLatest(this.pets$, this.sanctuary$).pipe(map(([ps, sc]) => {
        ps = ps.filter(p => this.xor(this.formControls['sancdir'].value, sc.petIds.some(pid => pid === p.id)));
        ps = term.length < 2 && term === '*'
          ? ps
          : term.length < 2 ? []
          : ps.filter(p => p.name.toLowerCase().indexOf(term.toLowerCase()) > -1);
        return ps.slice(0, 10);
      })))
  )

  private xor(swtch: string, ctrl: boolean): boolean {
    return swtch === 'to' ? !ctrl : !!ctrl;
  }

  ownerSearch = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(term => this.owners$.pipe(map(os => term.length < 2 && term === '*'
      ? os.slice(0, 10)
      : term.length < 2 ? []
      : os.filter(p => p.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))))
  )

  onSancDirChange(event: string) {
    const setValue = event === 'from' ? 'to' : 'from';
    if (this.formControls['ownerdir'].value !== setValue) {
      this.formControls['ownerdir'].setValue(setValue);
    }
    this.ownerSearchCtl = event !== 'to' || this.formControls['ownerdir'].value !== 'stray';
    console.log(event);
  }

  onOwnerDirChange(event: string) {
    const setValue = event === 'from' || event === 'stray' ? 'to' : 'from';
    if (this.formControls['sancdir'].value !== setValue) {
      this.formControls['sancdir'].setValue(setValue);
    }
    this.ownerSearchCtl = event !== 'stray' || this.formControls['sancdir'].value !== 'to';
    console.log(event);
  }

  onSubmit() {
    console.log(this.transferForm.value);
    this.isSubmitted = true;
    if (this.transferForm.invalid) {
      return;
    }
  }
}
