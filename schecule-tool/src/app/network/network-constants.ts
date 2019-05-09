export class NetworkConstants {
    BASE_URL: string = "http://localhost:3000/"
    JSON_ENDPOINT: string = "json"

    constructor() {}

    getJSONEndpoint() {
        return this.BASE_URL.concat(this.JSON_ENDPOINT)
    }
}