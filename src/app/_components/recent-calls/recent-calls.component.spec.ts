import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCallsComponent } from './recent-calls.component';

describe('RecentCallsComponent', () => {
  let component: RecentCallsComponent;
  let fixture: ComponentFixture<RecentCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
