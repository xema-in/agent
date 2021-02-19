import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentInfoCardComponent } from './agent-info-card.component';

describe('AgentInfoCardComponent', () => {
  let component: AgentInfoCardComponent;
  let fixture: ComponentFixture<AgentInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
