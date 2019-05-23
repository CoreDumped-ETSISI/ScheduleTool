import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { errorTrace } from '../TraceModule/errorTrace'
import { error } from '../TraceModule/error'
import { lineNumber } from '../TraceModule/errorLine'

describe('errorTrace', () => {
    let injector: TestBed;
    let errortrace: errorTrace;
    let httpMock: HttpTestingController;
    let ln: lineNumber;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [errorTrace, lineNumber]
      });
      injector = getTestBed();
      errortrace = injector.get(errorTrace);
      httpMock = injector.get(HttpTestingController);
      ln = injector.get(lineNumber);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    describe('#Save error', () => {
      it('should return true if error saved correctly', () => {
        let err = new error();
        ln.fulfillError(err,'Error de prueba', ln.ln());
        expect(errortrace.saveError(err, 'TestErrors', 'errorTrace.spec.ts')).toBe(true);
        httpMock.expectOne('http://localhost:3000/tracelog')
        httpMock.verify()
      })
    })
  
    describe('#Show error', () => {
      it('should return true always, no matter what happens, even if the computer is destroyed', () => {
        let err = new error();
        ln.fulfillError(err,'Error de prueba', 'testFunction');
        expect(errortrace.showError(err,'errorTrace.spec.ts')).toBe(true);
      })
    })
  })