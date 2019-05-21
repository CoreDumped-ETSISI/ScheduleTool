import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class lineNumber {

    ln() {
        var e = new Error();
        if (!e.stack) try {
          throw e;
        } catch (e) {
          if (!e.stack) {
            return 0; 
          }
        }
        var stack = e.stack.toString().split(/\r\n|\n/);
        var frameRE = /:(\d+):(?:\d+)[^\d]*$/;
        do {
          var frame = stack.shift();
        } while (!frameRE.exec(frame) && stack.length);
        return frameRE.exec(stack.shift())[1];
    }

    fulfillError(err, errorName: string, errorLine) {
        err.errorName = errorName;
        err.errorLine = errorLine;
    }

}