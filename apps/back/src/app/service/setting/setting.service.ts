import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AlertService } from '../../service/alert/alert.service';
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
        private httpClient: HttpClient,
        private alert : AlertService
        ) { }

    /** Get Setting by id */
    getThisSetting(value : any){
        return this.httpClient.get(this.baseUrl + this.getUrl + value, {headers: this.JsonHeader});
    }

    /** Edit Setting */
    editSetting(id : number, value : any){
        this.httpClient.patch(this.baseUrl + this.getUrl + id,  value, {headers: this.MergeJsonHeader})
        .subscribe({
            next: () => {
                let options = {
                    autoClose: true,
                    keepAfterRouteChange: true
                }

                this.alert.success('Settings are edited', options);
            },
            error: () => {
                let options = {
                    autoClose: true,
                    keepAfterRouteChange: true
                }

                this.alert.error('Settings are not edited', options);
            },
            complete: () => {}
        });
    }
}
