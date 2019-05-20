import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class error{

    errorName: string;
    errorType: string;
    errorLine;
    constructor(errorName: string, errorType: string, errorLine){
        this.errorName = errorName;
        this.errorType = errorType;
        this.errorLine = errorLine;
    }
}
