import {NetworkConstants} from '../network/network-constants'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ScheduleStartService {

    constructor(private http: HttpClient, private networkConstants: NetworkConstants) { }

    getJson () {
    var result = null;
    this.http.get(this.getJSONURL()).subscribe(data => {        
        console.log(data)    
        result = data;
    });
    return result;
    }

    getJSONURL () {
        return this.networkConstants.getJSONEndpoint()
    } 
}