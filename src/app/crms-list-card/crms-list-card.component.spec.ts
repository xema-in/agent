import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmsListCardComponent } from './crms-list-card.component';

describe('CrmsListCardComponent', () => {
  let component: CrmsListCardComponent;
  let fixture: ComponentFixture<CrmsListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmsListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
