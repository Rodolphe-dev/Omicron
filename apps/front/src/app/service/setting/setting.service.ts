import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class SettingService {
    private baseUrl = environment.apiURL;
    private getUrl = '/api/settings/';
    private JsonHeader = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
    private MergeJsonHeader = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/merge-patch+json');

    constructor(
        private httpClient: HttpClient
        ) { }

    /** Get Setting by id */
    getThisSetting(value : any){
        return this.httpClient.get(this.baseUrl + this.getUrl + value, {headers: this.JsonHeader});
    }
}
