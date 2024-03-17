import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class FooterService {
    private baseUrl = environment.apiURL;
    private normalUrl = '/api/footers';
    private getUrl = '/api/footers/';
    private JsonHeader = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');

    constructor(
        private httpClient: HttpClient
        ) { }

    getFooters(){
        return this.httpClient.get(this.baseUrl + this.normalUrl, {headers: this.JsonHeader});;
    }

    /** Get Footer by id */
    getThisFooter(value : any){
        return this.httpClient.get(this.baseUrl + this.getUrl + value, {headers: this.JsonHeader});
    }

}
