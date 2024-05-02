import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AlertService } from '../../service/alert/alert.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminAccountService {

    private baseUrl = environment.apiURL;
    private normalUrl = '/api/admin_accounts';
    private getUrl = '/api/admin_accounts/';
    private getUrlByName = '/api/admin_accounts/getAdminAccountByUsername/';
    private deleteUrl = '/api/admin_accounts/';

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
        private alert: AlertService
    ) { }

    /** Inital List + Pagination */
    getAdminAccounts() {
        return this.httpClient.get(this.baseUrl + this.normalUrl, { headers: this.LDJsonHeader })
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

    /** Refresh List + Pagination */
    getadminAccountsByPage(pageValue: string) {
        return this.httpClient.get(this.baseUrl + pageValue, { headers: this.LDJsonHeader })
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

    /** Get Admin Account by id */
    getThisAdminAccount(value: any) {
        return this.httpClient.get(this.baseUrl + this.getUrl + value, { headers: this.JsonHeader });
    }

    /** Get Admin Account by username */
    getThisAdminAccountByUsername(value: any) {
        return this.httpClient.get(this.baseUrl + this.getUrlByName + value, { headers: this.JsonHeader });
    }

    /** Add Admin Account */
    addAdminAccount(value: any) {
        this.httpClient.post(this.baseUrl + this.normalUrl, value)
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('This admin account is added', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This admin account is not added', options);
                }
            });
    }

    /** Edit Admin Account */
    editAdminAccount(id: any, value: any) {
        this.httpClient.patch(this.baseUrl + this.getUrl + id, value, { headers: this.MergeJsonHeader })
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('This admin account is edited', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This admin account is not edited', options);
                }
            });
    }

    /** Edit My Admin Account */
    editMyAdminAccount(id: any, value: any) {
        this.httpClient.patch(this.baseUrl + this.getUrl + id, value, { headers: this.MergeJsonHeader })
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('Your profil is edited', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('Your profil is not edited', options);
                }
            });
    }

    /** Delete Admin Account */
    deleteAdminAccount(value: any) {
        this.httpClient.delete(this.baseUrl + this.deleteUrl + value)
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('This admin account is deleted', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This admin account is not deleted', options);
                }
            });
    }

}
