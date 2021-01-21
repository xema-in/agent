import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneSelectionComponent } from './phone-selection.component';

describe('PhoneComponent', () => {
  let component: PhoneSelectionComponent;
  let fixture: ComponentFixture<PhoneSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneSelectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
