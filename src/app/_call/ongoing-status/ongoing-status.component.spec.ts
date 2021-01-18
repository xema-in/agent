import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingStatusComponent } from './ongoing-status.component';

describe('OngoingStatusComponent', () => {
  let component: OngoingStatusComponent;
  let fixture: ComponentFixture<OngoingStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
