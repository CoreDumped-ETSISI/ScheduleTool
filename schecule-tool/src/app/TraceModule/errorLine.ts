import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class lineNumber {

    ln(fileName: string) {
        var e = new Error();
        if (!e.stack) try {
          throw e;
        } catch (e) {
          if (!e.stack) {
            return 0; 
          }
        }
        var str = '';
        const arr = fileName.split('.')
        for(var i = 0; i < arr.length; i++){
          if(i!=arr.length-1)
            str = str+arr[i]+'\.'
          else{
            str = str+arr[i]
          }
        }
        const reg = new RegExp(''+str+'\:.*\:');
        const prueba = e.stack.toString().match(reg)
        const reg2 = new RegExp(/\:.*\:/)
        const prueba2 = prueba.toString().match(reg2)
        const arr2 = prueba2.toString().split(':')
        return arr2[1]
    }

    fulfillError(err, errorName: string, errorLine) {
        err.errorName = errorName;
        err.errorLine = errorLine;
    }

}