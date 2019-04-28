import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleStartComponent } from './schedule-start.component';


describe('ScheduleStartComponent', () => {
  let component: ScheduleStartComponent;
  let fixture: ComponentFixture<ScheduleStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleStartComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
