import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IPage } from '../../model/page';

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
    getThisPageByRoute(value : string | null){
        return this.httpClient.get<IPage>(this.baseUrl + this.getUrlByRoute + value, {headers: this.JsonHeader});
    }
}
