import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakLogoutControlComponent } from './break-logout-control.component';

describe('BreakLogoutControlComponent', () => {
  let component: BreakLogoutControlComponent;
  let fixture: ComponentFixture<BreakLogoutControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakLogoutControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakLogoutControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
