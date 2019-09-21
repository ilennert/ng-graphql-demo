import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSanctuaryComponent } from './add-edit-sanctuary.component';

describe('AddEditSanctuaryComponent', () => {
  let component: AddEditSanctuaryComponent;
  let fixture: ComponentFixture<AddEditSanctuaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSanctuaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSanctuaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
