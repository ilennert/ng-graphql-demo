import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctuaryDetailComponent } from './sanctuary-detail.component';

describe('SanctuaryDetailComponent', () => {
  let component: SanctuaryDetailComponent;
  let fixture: ComponentFixture<SanctuaryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanctuaryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctuaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
