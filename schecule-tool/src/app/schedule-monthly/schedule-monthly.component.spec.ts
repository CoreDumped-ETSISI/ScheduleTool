import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ScheduleMonthlyComponent } from './schedule-monthly.component';

describe('ScheduleMonthlyComponent', () => {
  let component: ScheduleMonthlyComponent;
  let fixture: ComponentFixture<ScheduleMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleMonthlyComponent ], 
      imports:[dayGridPlugin]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
