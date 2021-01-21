import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositionToolsComponent } from './disposition-tools.component';

describe('DispositionToolsComponent', () => {
  let component: DispositionToolsComponent;
  let fixture: ComponentFixture<DispositionToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositionToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositionToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
