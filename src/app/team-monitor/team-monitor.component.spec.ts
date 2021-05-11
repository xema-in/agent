import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMonitorComponent } from './team-monitor.component';

describe('TeamMonitorComponent', () => {
  let component: TeamMonitorComponent;
  let fixture: ComponentFixture<TeamMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
