import {error} from './error'
import {NetworkConstants} from '../network/network-constants'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class errorTrace {

    constructor(private http: HttpClient, private networkConstants: NetworkConstants){
    }

    saveError(error: error,errorFolder: String,errorFile: String){
        var sendJson = {
            "errorName" : error.errorName,
            "errorType" : error.errorType,
            "errorLine" : error.errorLine,
            "errorFolder" : errorFolder,
            "errorFile" : errorFile
        }

        try{
            this.http.post(this.networkConstants.getJSONEndpoint('tracelog'), sendJson).subscribe();
            return true;
        }catch(error){
            console.log(error)
            return false;
        }      
    }

    showError(error: error){
        try{
            console.log("Error "+ error.errorName+" de tipo "+error.errorType+ " en la línea "+error.errorLine)
            return true;
        }catch(err){
            console.log(err)
            return false;
        }        
    }
}