import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakRequestDialogComponent } from './break-request-dialog.component';

describe('BreakRequestDialogComponent', () => {
  let component: BreakRequestDialogComponent;
  let fixture: ComponentFixture<BreakRequestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreakRequestDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
