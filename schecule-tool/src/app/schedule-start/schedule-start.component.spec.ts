import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ScheduleStartComponent } from './schedule-start.component';
import { ScheduleStartService } from './schedule-start.service';
import { NetworkConstants } from '../network/network-constants';

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

describe('ScheduleStartService', () => {
  let injector: TestBed;
  let service: ScheduleStartService;
  let networkConstants: NetworkConstants;
  let httpMock: HttpTestingController;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScheduleStartService, NetworkConstants]
    });
    injector = getTestBed();
    service = injector.get(ScheduleStartService);
    networkConstants = injector.get(NetworkConstants);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getJSON', () => {
    it('should return a JSON', () => {
  
      let json = service.getJson()
      expect(json).toBeDefined()
      httpMock.expectOne('http://localhost:3000/json')
      httpMock.verify()
    });
  });

});