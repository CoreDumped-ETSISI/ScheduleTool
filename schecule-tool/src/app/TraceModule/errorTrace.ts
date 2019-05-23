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

    //esta función hace una petición a la API para guardar el error en un archivo .txt cuyo nombre es el contenido de la variable errorFile

    saveError(error: error,errorFolder: string,errorFile: string){
        var sendJson = {
            "errorName" : error.errorName,
            "errorFunc" : error.errorFunc,
            "errorFolder" : errorFolder,
            "errorFile" : errorFile
        }

        console.log(sendJson)

        try{
            this.http.post(this.networkConstants.getJSONEndpoint('tracelog'), sendJson).subscribe();
            return true;
        }catch(error){
            console.log(error)
            return false;
        }      
    }

    //Esta función hace un console.log sencillo del error, para no tener que escribirlo en cada error

    showError(error: error, errorFile: string){
        try{
            console.log(error.errorName+" en la función "+error.errorFunc+" del archivo "+errorFile)
            return true;
        }catch(err){
            console.log(err)
            return false;
        }        
    }
}