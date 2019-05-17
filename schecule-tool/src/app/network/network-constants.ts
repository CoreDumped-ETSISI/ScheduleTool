import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})

export class NetworkConstants {
    BASE_URL: string = "http://localhost:3000/"

    constructor() {}

    getJSONEndpoint(jsonEndpoint) {
        return this.BASE_URL.concat(jsonEndpoint)
    }
}
