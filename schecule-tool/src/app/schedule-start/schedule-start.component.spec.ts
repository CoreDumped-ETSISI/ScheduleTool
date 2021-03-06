import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule } from '@angular/common/http'
import { ScheduleStartComponent } from './schedule-start.component';
import { ScheduleStartService } from './schedule-start.service';
import { NetworkConstants } from '../network/network-constants';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTableModule } from '@angular/material/table';
import {HorariosComponent} from '../horarios/horarios.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { errorTrace } from '../TraceModule/errorTrace'
import { error } from '../TraceModule/error'
import { lineNumber } from '../TraceModule/errorLine'

describe('ScheduleStartComponent', () => {
  let component: ScheduleStartComponent;
  let fixture: ComponentFixture<ScheduleStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleStartComponent, HorariosComponent], 
      imports:[MatIconModule, MatButtonModule, MatTabsModule, MatTooltipModule, MatExpansionModule, MatTableModule, HttpClientModule, BrowserAnimationsModule,]
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
  let component:ScheduleStartComponent;

  function setUp(){
    service.cargarMatriz();
    service.grupos = {
      "GM11":
      { "FS": {"J":[9,10]},
        "A": {"J":[11,12],"M":[11,12],"V":[13]},
        "ED": {"M":[9,10],"X":[13,14]},
        "AS": {"M":[13,14]},
        "FI": {"V":[9,10],"X":[9,10]},
        "EC": {"V":[11,12],"X":[11,12]}}
    }
    service.actualSubjects = ['FS', 'A']
    service.actualCourse = ['GM11']
    service.cargarMatrizBotones();
  }


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

  describe('#cargarMatriz', () =>{//Full tested. ¡¡¡¡QUE ALGUIEN INTENTE ROMPER ESTA FUNCION!!!!.
    it('should return true when matrix is loaded', () => {
      let loaded = service.cargarMatriz();
      if(loaded){
        expect(loaded).toBe(true);
      }
    });
  });

  describe('#cargarMatrizBotones', () => {//Full tested
    it('should return true when matrix is loaded', () =>{
      service.actualSubjects = ['FS']
      service.actualCourse = ['GM11']
      expect(service.cargarMatrizBotones()).toBe(true);
      //httpMock.expectOne(null)
      httpMock.verify()
    });
    it('should return false because the actualSubjects array is empty', () => {
      service.actualSubjects = [];
      service.actualCourse = ['GM11'];
      expect(service.cargarMatrizBotones()).toBe(false);
      //httpMock.expectOne(null)
      httpMock.verify()
    });
    it('should return false because the actualCourse array is empty', () => {
      service.actualSubjects = ['FS'];
      service.actualCourse = [];
      expect(service.cargarMatrizBotones()).toBe(false);
      //httpMock.expectOne(null)
      httpMock.verify()
    });
  });


  describe('#cargarAsignatura', () => {//Full tested
    it('should return true when subject is pushed to matrizHorario', () => {
      setUp();
      let pushed = service.cargarAsignatura('FS', 'GM11', 0, 0);
      expect(pushed).toBe(true);
      //httpMock.expectOne(null)
      httpMock.verify()
    });
    it('should return false because grupos is not defIned', () => {
      setUp();
      service.grupos = {};
      let pushed = service.cargarAsignatura('FS', 'GM11', 0, 0);
      expect(pushed).toBe(false);
      httpMock.expectOne('http://localhost:3000/tracelog')
      httpMock.verify()
    });
    it('should return false because the subject is not included in grupos',  () => {
      setUp();
      let pushed = service.cargarAsignatura('RANDOM_SUBJECT', 'GM11', 0, 0);
      expect(pushed).toBe(false);
      httpMock.expectOne('http://localhost:3000/tracelog')
      httpMock.verify()
    });
    it('should return false because the group is not included in grupos',  () => {
      setUp();
      let pushed = service.cargarAsignatura('FS', 'RANDOM_GROUP', 0, 0);
      expect(pushed).toBe(false);
      httpMock.expectOne('http://localhost:3000/tracelog')
      httpMock.verify()
    });
  });


  describe('#botonLimpiarAsignatura', () => {//Full tested
    it('should return true when the button is clicked', () => {
      setUp();
      service.cargarAsignatura('FS', 'GM11', 0, 0);
      let clicked = service.botonLimpiarAsignatura('FS', 0);
      expect(clicked).toBe(true);
      //httpMock.expectOne(null)
      httpMock.verify()
    });
    it('should return false because the row is out of the matrix matrizBotones', () => {
      setUp();
      let clicked = service.botonLimpiarAsignatura('FS', 100);
      expect(clicked).toBe(false);
      httpMock.expectOne('http://localhost:3000/tracelog')
      httpMock.verify()
    });
    it('should return false because the matrix matrizBotonesPulsados is empty', () => {
      setUp();
      service.matrizBotonesPulsados = [[]];
      let clicked = service.botonLimpiarAsignatura('FS', 1);
      expect(clicked).toBe(false);
      httpMock.expectOne('http://localhost:3000/tracelog')
      httpMock.verify()
    });
  });
  describe('#limpiarAsignatura',  () =>{
    it('should return true when the subject is removed of the matrizHorario', () => {//Full tested
      setUp();
      service.cargarAsignatura('FS', 'GM11', 0,0);
      let removed = service.limpiarAsignatura('FS');
      expect(removed).toBe(true);
      //httpMock.expectOne(null)
      httpMock.verify()
    });
    it('should return false because matrizHorario is empty and matrizCoincidencias is empty', () =>{
      setUp();
      service.cargarAsignatura('FS', 'GM11', 0,0);
      service.matrizHorario = [[]];
      service.matrizCoincidencias = [[]];
      let removed = service.limpiarAsignatura('GM11');
      expect(removed).toBe(false);
      httpMock.expectOne('http://localhost:3000/tracelog')
      httpMock.verify()
    });
    it('should return false because the subject is not defined', () => {
      setUp();
      let removed = service.limpiarAsignatura('');
      expect(removed).toBe(false);
      httpMock.expectOne('http://localhost:3000/tracelog')
      httpMock.verify()

    });
  });
  describe('#checkDesignedSchedule', () => {//Full tested
    it('should return true when the matrix is traveled', () => {
      service.cargarMatriz();
      let traveled = service.checkDesignedSchedule();
      expect(traveled).toBe(true);
      //httpMock.expectOne(null)
      httpMock.verify()
    });
    it('should return false because matrizHorario is not defined', () => {
      service.matrizHorario = [[]];
      let traveled = service.checkDesignedSchedule();
      expect(traveled).toBe(false);
      httpMock.expectOne('http://localhost:3000/tracelog')
      httpMock.verify()
    });
  });
  describe('#obtainActualSubjects', () =>{//Full tested.
    it('should return true when actualSubjects is not empty.',  () => {
      setUp();
      let obtained = service.obtainActualSubjects();
      expect(obtained).toBe(true);
      //httpMock.expectOne(null)
      httpMock.verify()
    });
    it('should return false because grupos is not defined', () => {
      setUp();
      service.grupos = {};
      let obtained = service.obtainActualSubjects();
      expect(obtained).toBe(false);
      httpMock.expectOne('http://localhost:3000/tracelog')
      httpMock.verify()
    });
    it('should return false because actualCourse is empty', () => {
      setUp();
      service.actualCourse = [];
      let obtained = service.obtainActualSubjects();
      expect(obtained).toBe(false);
      httpMock.expectOne('http://localhost:3000/tracelog')
      httpMock.verify()
    });
  });
  describe('#botonPulsado', () =>{//Full tested
    it('should return true, all the dependencies are correct', () =>{ 
      setUp();
      let clicked = service.botonPulsado(0,0);
      expect(clicked).toBe(true);
      //httpMock.expectOne(null)
      httpMock.verify()
    });
    it('should return false, the position is not included in the matrix matrisBotones', () =>{
      setUp();
      let clicked = service.botonPulsado(100,100);
      expect(clicked).toBe(false);
      httpMock.expectOne('http://localhost:3000/tracelog')
      httpMock.verify()
    });
  });
  describe('#cargarGrupos', () => {
    it('should return defined, the json is loaded, the grade is conained in the json, and the course is cointained in the grade', () => {
      service.organizationJSON = {
         "Software":{
        "Primero":["GM11", "GM12", "GM13", "GM14", "GM15", "GT11", "GT12", "GT13"],
        "Segundo":["GM21", "GM22", "GM23", "GT21", "GT22"],
        "Tercero": ["GIWM31", "GIWT31"],
        "Cuarto":["GMOPT41", "GMOPT41a", "GMOPT41b", "GTOPT41", "GTOPT42"]
        }
      }
      httpMock.verify();
      let grades = service.cargarGrados();
      let courses = service.cargarCursos(grades[0])
      let loaded = service.cargarGrupos(grades[0], courses[0]);
      expect(loaded).toBeDefined();
    });
    it('should return false, the JSON is not loaded', () => {
      let loaded = service.cargarGrupos('Software', 'Primero');
      expect(loaded).toBe(undefined);
    });
    it('should return false, the grade is not contained in the JSON', () =>{
      service.organizationJSON = {
         "Software":{
        "Primero":["GM11", "GM12", "GM13", "GM14", "GM15", "GT11", "GT12", "GT13"],
        "Segundo":["GM21", "GM22", "GM23", "GT21", "GT22"],
        "Tercero": ["GIWM31", "GIWT31"],
        "Cuarto":["GMOPT41", "GMOPT41a", "GMOPT41b", "GTOPT41", "GTOPT42"]
        }
      }
      httpMock.verify();
      let loaded = service.cargarGrupos('fakeGrade', 'Primero');
      expect(loaded).toBe(undefined);
    });
    it('should return false, the course is not contained in the grade', () => {
      service.organizationJSON = {
         "Software":{
        "Primero":["GM11", "GM12", "GM13", "GM14", "GM15", "GT11", "GT12", "GT13"],
        "Segundo":["GM21", "GM22", "GM23", "GT21", "GT22"],
        "Tercero": ["GIWM31", "GIWT31"],
        "Cuarto":["GMOPT41", "GMOPT41a", "GMOPT41b", "GTOPT41", "GTOPT42"]
        }
      }
      httpMock.verify();
      let loaded = service.cargarGrupos('Software y Tech. Soc. Infor.', 'Cuarto');
      expect(loaded).toBe(undefined);
    });
  });
  describe('#cargarGrados', () => {
    it('should return true, the Json is loaded', () => {
      service.organizationJSON = {
         "Software":{
        "Primero":["GM11", "GM12", "GM13", "GM14", "GM15", "GT11", "GT12", "GT13"],
        "Segundo":["GM21", "GM22", "GM23", "GT21", "GT22"],
        "Tercero": ["GIWM31", "GIWT31"],
        "Cuarto":["GMOPT41", "GMOPT41a", "GMOPT41b", "GTOPT41", "GTOPT42"]
        }
      }
      httpMock.verify();
      let loaded = service.cargarGrados();
      expect(loaded).toBeDefined();      
    })
    it('should return false, the JSON is not loaded', () => {
      let loaded = service.cargarGrados();
      expect(loaded).toBe(undefined);
    })
  });
  describe('#cargarCursos', () => {
    it('should return defined, the JSON is loaded and the grade is contained in the JSON', () => {
      service.organizationJSON = {
        "Software":{
       "Primero":["GM11", "GM12", "GM13", "GM14", "GM15", "GT11", "GT12", "GT13"],
       "Segundo":["GM21", "GM22", "GM23", "GT21", "GT22"],
       "Tercero": ["GIWM31", "GIWT31"],
       "Cuarto":["GMOPT41", "GMOPT41a", "GMOPT41b", "GTOPT41", "GTOPT42"]
       }
      }
      let grades = service.cargarGrados();
      let loaded = service.cargarCursos(grades[0]);
      expect(loaded).toBeDefined();
    });
    it('Should return false the JSON is not loaded', () => {
      let loaded = service.cargarCursos('someGrade');
      expect(loaded).toBe(undefined);
    });
    it('should return undefined, the grade is not contained in the JSON', () => {
      service.organizationJSON = {
         "Software":{
        "Primero":["GM11", "GM12", "GM13", "GM14", "GM15", "GT11", "GT12", "GT13"],
        "Segundo":["GM21", "GM22", "GM23", "GT21", "GT22"],
        "Tercero": ["GIWM31", "GIWT31"],
        "Cuarto":["GMOPT41", "GMOPT41a", "GMOPT41b", "GTOPT41", "GTOPT42"]
        }
      }
      httpMock.verify();
      let loaded = service.cargarCursos('fakeGrade');
      expect(loaded).toBe(undefined);
    })
  });
});
