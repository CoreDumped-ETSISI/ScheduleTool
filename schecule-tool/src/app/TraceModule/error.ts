import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class error{

    errorName: string;
    errorType: string;
    errorLine;
    constructor(){
    }
}
