import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AlertService } from '../../service/alert/alert.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class SidebarService {
    private baseUrl = environment.apiURL;
    private normalUrl = '/api/sidebars';
    private getUrl = '/api/sidebars/';
    private deleteUrl = '/api/sidebars/';
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
    getSidebars(){
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
    getSidebarsByPage(pageValue: string){
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

    /** Get Sidebar by id */
    getThisSidebar(value : any){
        return this.httpClient.get(this.baseUrl + this.getUrl + value, {headers: this.JsonHeader});
    }

    /** Add Sidebar */
    addSidebar(value : any){
        this.httpClient.post(this.baseUrl + this.normalUrl, value)
        .subscribe({
            next: () => {
                let options = {
                    autoClose: true,
                    keepAfterRouteChange: true
                }

                this.alert.success('This sidebar is added', options);
            },
            error: () => {
                let options = {
                    autoClose: false,
                    keepAfterRouteChange: true
                }

                this.alert.error('This sidebar is not added', options);
            },
            complete: () => {}
        });
    }

    /** Edit Sidebar */
    editSidebar(id : number, value : any){
        this.httpClient.patch(this.baseUrl + this.getUrl + id,  value, {headers: this.MergeJsonHeader})
        .subscribe({
            next: () => {
                let options = {
                    autoClose: true,
                    keepAfterRouteChange: true
                }

                this.alert.success('This sidebar is edited', options);
            },
            error: () => {
                let options = {
                    autoClose: false,
                    keepAfterRouteChange: true
                }

                this.alert.error('This sidebar is not edited', options);
            },
            complete: () => {}
        });
    }

    /** Delete Sidebar */
    deleteSidebar(value : number){
        this.httpClient.delete(this.baseUrl + this.deleteUrl + value)
        .subscribe({
            next: () => {
                let options = {
                    autoClose: true,
                    keepAfterRouteChange: true
                }

                this.alert.success('This sidebar is deleted', options);
            },
            error: () => {
                let options = {
                    autoClose: false,
                    keepAfterRouteChange: true
                }

                this.alert.error('This sidebar is not deleted', options);
            },
            complete: () => {}
        });
    }
}
