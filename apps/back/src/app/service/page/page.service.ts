import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AlertService } from '../../service/alert/alert.service';
import { environment } from '../../../environments/environment';
import { JSONldListPage } from '../../model/page';
import { IPage } from '../../model/page';

@Injectable()
export class PageService {
    private baseUrl = environment.apiURL;
    private normalUrl = '/api/pages';
    private getUrl = '/api/pages/';
    private deleteUrl = '/api/pages/';
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
    getPages(){
        return this.httpClient.get<JSONldListPage>(this.baseUrl + this.normalUrl, {headers: this.LDJsonHeader})
            .pipe(
                map(res => ({
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
    getPagesByPage(pageValue: string){
        return this.httpClient.get<JSONldListPage>(this.baseUrl + pageValue, {headers: this.LDJsonHeader})
            .pipe(
                map(res => ({
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

    /** Get Page by id */
    getThisPage(value : number){
        return this.httpClient.get<IPage>(this.baseUrl + this.getUrl + value, {headers: this.JsonHeader})
        .pipe(
            map(res => ({
                id: res['id'],
                name: res['name'],
                route: res['route'],
                content: res['content'],
            }))
        );
    }

    /** Add Page */
    addPage(value : object){
        this.httpClient.post(this.baseUrl + this.normalUrl, value)
        .subscribe({
            next: () => {
                const options = {
                    autoClose: true,
                    keepAfterRouteChange: true
                }

                this.alert.success('This page is added', options);
            },
            error: () => {
                const options = {
                    autoClose: false,
                    keepAfterRouteChange: true
                }

                this.alert.error('This page is not edited', options);
            }
        });
    }

    /** Edit Page */
    editPage(id : number, value : object){
        this.httpClient.patch(this.baseUrl + this.getUrl + id,  value, {headers: this.MergeJsonHeader})
        .subscribe({
            next: () => {
                const options = {
                    autoClose: true,
                    keepAfterRouteChange: true
                }

                this.alert.success('This page is edited', options);
            },
            error: () => {
                const options = {
                    autoClose: false,
                    keepAfterRouteChange: true
                }

                this.alert.error('This page is not edited', options);
            }
        });
    }

    /** Delete Page */
    deletePage(value : number){
        this.httpClient.delete(this.baseUrl + this.deleteUrl + value)
        .subscribe({
            next: () => {
                const options = {
                    autoClose: true,
                    keepAfterRouteChange: true
                }

                this.alert.success('This page is deleted', options);
            },
            error: () => {
                const options = {
                    autoClose: false,
                    keepAfterRouteChange: true
                }

                this.alert.error('This page is not deleted', options);
            }
        });
    }
}
