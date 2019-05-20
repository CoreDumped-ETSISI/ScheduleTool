import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http'
import { HorariosService } from './horarios.service';

describe('HorariosService', () => {
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let service: HorariosService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    })
    injector = getTestBed();
    service = injector.get(HorariosService)
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: HorariosService = TestBed.get(HorariosService);
    expect(service).toBeTruthy();
  });

  describe('#getJSON', () => {
    it('should return a JSON', () => {
      let json = service.getJson()
      expect(json).toBeDefined()
      httpMock.expectOne('http://localhost:3000/json')
      httpMock.verify()
    });
  });

  describe('#setGrado', () => {
    it('should return true when grado is selected', () => {
      let setGrado = service.setGrado({ grado: "Computadores", gradoCode: "comp", curso: service.computadores });
      expect(setGrado).toBe(true);
    });
    it('should return false because grado is undefined', () => {
      let setGrado = service.setGrado('undefined');
      expect(setGrado).toBe(false);
    });
  });

  describe('#setCurso', () => {
    it('should return true when curso is selected', () => {
      let setCurso = service.setCurso({ cursoN: "primero", grupos: service.primero });
      expect(setCurso).toBe(true);
    });
    it('should return false because curso is undefined', () => {
      let setCurso = service.setCurso('undefined');
      expect(setCurso).toBe(false);
    });
  });

  describe('#rellenarHorarios', () => {
    it('should return true when curso is selected', () => {
      let rellenarHorarios = service.rellenarHorarios();
      expect(rellenarHorarios).toBe(true);
    });
  });

})
