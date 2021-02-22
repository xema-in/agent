import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidebarNavigatorComponent } from './left-sidebar-navigator.component';

describe('LeftSidebarNavigatorComponent', () => {
  let component: LeftSidebarNavigatorComponent;
  let fixture: ComponentFixture<LeftSidebarNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSidebarNavigatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidebarNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
