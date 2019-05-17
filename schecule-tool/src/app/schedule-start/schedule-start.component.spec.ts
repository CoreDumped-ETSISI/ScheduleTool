import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule } from '@angular/common/http'
import { ScheduleStartComponent } from './schedule-start.component';
import { ScheduleStartService } from './schedule-start.service';
import { NetworkConstants } from '../network/network-constants';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatButtonModule} from '@angular/material/button';
import { HorariosComponent } from '../horarios/horarios.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTableModule } from '@angular/material/table';
import { Component } from '@angular/core';

describe('ScheduleStartComponent', () => {
  let component: ScheduleStartComponent;
  let fixture: ComponentFixture<ScheduleStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleStartComponent], 
      imports:[MatIconModule, MatButtonModule, MatTabsModule, MatTooltipModule, MatExpansionModule, MatTableModule, HttpClientModule ]
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

  describe('#getJsonConnection', ()=> {
    it('should connect to link and return true', () => {
      let status = service.getJsonConnection()
      expect(status).not.toBe(undefined)
      httpMock.expectOne('http://localhost:3000/json')
      httpMock.verify()
    });
  });

  describe('#Pdfdownload', () => {
    it('should return true', () => {
      let html = document.createElement('div')
      let down = service.downloadPDF(html);
      expect(down).toBe(true);
    });
    it('should return false', () => {
      let table = 'hola'
      let down = service.downloadPDF(table);
      expect(down).toBe(false);
    });
  });

  describe('#detect mobile', () => {
    it('should detect mobile devices', () => {
      if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ){
          expect(service.detectMob()).toBe(true)
        }
        else {
          expect(service.detectMob()).toBe(false)
        }     
    })
  })

  describe('#cargarMatriz', () =>{
    it('should return true when matrix is loaded', () => {
      let loaded = service.cargarMatriz();
      expect(loaded).toBe(true);
    });
    it('should return false when matrix is not loaded', () =>{
      let loaded = service.cargarMatriz();
      expect(loaded).toBe(false);
    });
  });
});
