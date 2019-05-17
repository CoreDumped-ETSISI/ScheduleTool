import {error} from './error'
import {NetworkConstants} from '../network/network-constants'
import { HttpClient } from '@angular/common/http';

export class errorTrace {

    constructor(private http: HttpClient, private networkConstants: NetworkConstants){
    }

    saveError(error: error,errorFolder: String,errorFile: String){
        var errLine = console.trace();
        var sendJson = {
            "errorName" : error.errorName,
            "errorType" : error.errorType,
            "errorLine" : errLine,
            "errorFolder" : errorFolder,
            "errorFile" : errorFile
        }

        this.http.post(this.networkConstants.getJSONEndpoint(), sendJson).subscribe();
    }
}