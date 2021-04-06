import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCrmViewComponent } from './task-crm-view.component';

describe('TaskCrmViewComponent', () => {
  let component: TaskCrmViewComponent;
  let fixture: ComponentFixture<TaskCrmViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCrmViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCrmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
