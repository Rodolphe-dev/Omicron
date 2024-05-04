import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IFrontData } from '../../model/front-data';

@Injectable()
export class FrontDataService {
    private baseUrl = environment.apiURL;
    private normalUrl = '/api/frontdata/getFrontData';
    private JsonHeader = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');

    constructor(
        private httpClient: HttpClient
    ) { }

    getFrontData() {
        return this.httpClient.get<IFrontData>(this.baseUrl + this.normalUrl, {headers: this.JsonHeader});
    }
}
