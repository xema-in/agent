import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallhistoryDialogComponent } from './callhistory-dialog.component';

describe('CallhistoryDialogComponent', () => {
  let component: CallhistoryDialogComponent;
  let fixture: ComponentFixture<CallhistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallhistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallhistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
