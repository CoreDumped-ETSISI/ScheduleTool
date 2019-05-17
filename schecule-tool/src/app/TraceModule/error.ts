import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class error{

    errorName: String;
    errorType: String;
    errorLine = console.trace();

    constructor(errorName: String, errorType: String){
        this.errorName = errorName;
        this.errorType = errorType;
    }
 
}