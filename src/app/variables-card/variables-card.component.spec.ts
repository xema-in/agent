import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesCardComponent } from './variables-card.component';

describe('VariablesCardComponent', () => {
  let component: VariablesCardComponent;
  let fixture: ComponentFixture<VariablesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariablesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariablesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
