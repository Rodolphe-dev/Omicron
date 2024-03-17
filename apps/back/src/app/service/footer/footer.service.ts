import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AlertService } from '../../service/alert/alert.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class FooterService {
    private baseUrl = environment.apiURL;
    private normalUrl = '/api/footers';
    private getUrl = '/api/footers/';
    private deleteUrl = '/api/footers/';
    private LDJsonHeader = new HttpHeaders()
    .set('Accept', 'application/ld+json')
    .set('Content-Type', 'application/ld+json');
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

    /** Inital List + Pagination */
    getFooters(){
        return this.httpClient.get(this.baseUrl + this.normalUrl, {headers: this.LDJsonHeader})
            .pipe(
                map((res: any) => ({
                    listItem: res['hydra:member'],
                    totalItems: res['hydra:totalItems'],
                    actual: res['hydra:view']['@id'] ,
                    first: res['hydra:view']['hydra:first'],
                    last: res['hydra:view']['hydra:last'],
                    previous: res['hydra:view']['hydra:previous'],
                    next: res['hydra:view']['hydra:next']
                }))
            );
    }
    
    /** Refresh List + Pagination */
    getFootersByPage(pageValue: string){
        return this.httpClient.get(this.baseUrl + pageValue, {headers: this.LDJsonHeader})
            .pipe(
                map((res: any) => ({
                    listItem: res['hydra:member'],
                    totalItems: res['hydra:totalItems'],
                    actual: res['hydra:view']['@id'],
                    first: res['hydra:view']['hydra:first'],
                    last: res['hydra:view']['hydra:last'],
                    previous: res['hydra:view']['hydra:previous'],
                    next: res['hydra:view']['hydra:next']
                }))
            );
    }

    /** Get Footer by id */
    getThisFooter(value : any){
        return this.httpClient.get(this.baseUrl + this.getUrl + value, {headers: this.JsonHeader});
    }

    /** Add Footer */
    addFooter(value : any){
        this.httpClient.post(this.baseUrl + this.normalUrl, value)
        .subscribe({
            next: () => {
                let options = {
                    autoClose: false,
                    keepAfterRouteChange: true
                }

                this.alert.success('This footer is added', options);
            },
            error: () => {
                let options = {
                    autoClose: false,
                    keepAfterRouteChange: true
                }

                this.alert.error('This footer is not added', options);
            },
            complete: () => {}
        });
    }

    /** Edit Footer */
    editFooter(id : number, value : any){
        this.httpClient.patch(this.baseUrl + this.getUrl + id,  value, {headers: this.MergeJsonHeader})
        .subscribe({
            next: () => {
                let options = {
                    autoClose: false,
                    keepAfterRouteChange: true
                }

                this.alert.success('This footer is edited', options);
            },
            error: () => {
                let options = {
                    autoClose: false,
                    keepAfterRouteChange: true
                }

                this.alert.error('This footer is not edited', options);
            },
            complete: () => {}
        });
    }

    /** Delete Footer */
    deleteFooter(value : number){
        this.httpClient.delete(this.baseUrl + this.deleteUrl + value)
        .subscribe({
            next: () => {
                let options = {
                    autoClose: false,
                    keepAfterRouteChange: true
                }

                this.alert.success('This footer is deleted', options);
            },
            error: () => {
                let options = {
                    autoClose: false,
                    keepAfterRouteChange: true
                }

                this.alert.error('This footer is not deleted', options);
            },
            complete: () => {}
        });
    }

}
