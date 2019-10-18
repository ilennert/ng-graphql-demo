import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctuaryCenterComponent } from './sanctuary-center.component';

describe('SanctuaryCenterComponent', () => {
  let component: SanctuaryCenterComponent;
  let fixture: ComponentFixture<SanctuaryCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanctuaryCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctuaryCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
