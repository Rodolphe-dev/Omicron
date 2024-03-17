import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class PageService {
    private baseUrl = environment.apiURL;
    private getUrlByRoute = '/api/pages/getPageByRoute/';
    private JsonHeader = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');

    constructor(
        private httpClient: HttpClient
        ) { }

    /** Get Page by route */
    getThisPageByRoute(value : any){
        return this.httpClient.get(this.baseUrl + this.getUrlByRoute + value, {headers: this.JsonHeader});
    }
}
