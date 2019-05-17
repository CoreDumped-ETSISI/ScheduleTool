import {error} from './error'
import {NetworkConstants} from '../network/network-constants'
import { HttpClient } from '@angular/common/http';

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

        this.http.post(this.networkConstants.getJSONEndpoint(), sendJson).subscribe();
    }

    showError(error: error){
        console.log("Error "+ error.errorName+" de tipo "+error.errorType+ " en la línea "+error.errorLine)
    }
}