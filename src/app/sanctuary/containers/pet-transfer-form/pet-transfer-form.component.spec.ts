import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetTransferFormComponent } from './pet-transfer-form.component';

describe('PetTransferFormComponent', () => {
  let component: PetTransferFormComponent;
  let fixture: ComponentFixture<PetTransferFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetTransferFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetTransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
