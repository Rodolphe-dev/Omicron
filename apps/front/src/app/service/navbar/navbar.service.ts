import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class NavbarService {
    private baseUrl = environment.apiURL;
    private normalUrl = '/api/navbars';
    private getUrl = '/api/navbars/';
    private JsonHeader = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');

    constructor(
        private httpClient: HttpClient
    ) { }

    getNavbars(){
        return this.httpClient.get(this.baseUrl + this.normalUrl, {headers: this.JsonHeader});
    }

    /** Get Navbar by id */
    getThisNavbar(value : any){
        return this.httpClient.get(this.baseUrl + this.getUrl + value, {headers: this.JsonHeader});
    }
}
