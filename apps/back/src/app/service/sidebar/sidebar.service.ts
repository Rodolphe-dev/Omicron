import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, map } from 'rxjs';
import { AlertService } from '../../service/alert/alert.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class SidebarService {
    private baseUrl = environment.apiURL;
    private normalUrl = '/api/sidebars';
    private getUrl = '/api/sidebars/';
    private updateStatusUrl = '/api/sidebars/updateSidebarStatus/';
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
        private alert: AlertService
    ) { }

    /** Inital List + Pagination */
    getSidebars() {
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
    getSidebarsByPage(pageValue: any) {
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

    /** Get Sidebar by id */
    getThisSidebar(value: any) {
        return this.httpClient.get(this.baseUrl + this.getUrl + value, { headers: this.JsonHeader });
    }

    /** Add Sidebar */
    addSidebar(value: any) {
        this.httpClient.post(this.baseUrl + this.normalUrl, value)
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: true,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('This sidebar is added', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This sidebar is not added', options);
                }
            });
    }

    /** Edit Sidebar */
    editSidebar(id: any, value: any) {
        this.httpClient.patch(this.baseUrl + this.getUrl + id, value, { headers: this.MergeJsonHeader })
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: true,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('This sidebar is edited', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This sidebar is not edited', options);
                }
            });
    }

    /** Toggle Sidebar Status */
    toggleSidebarStatus(id: any) {
        const subject = new Subject<boolean>();

        this.httpClient.patch(this.baseUrl + this.updateStatusUrl + id, { headers: this.MergeJsonHeader })
            .subscribe({
                next: (value: any) => {
                    const options = {
                        autoClose: true,
                        keepAfterRouteChange: true
                    }

                    if (value.status === true) {
                        this.alert.success('Sidebar succesfully enabled', options);
                    } else {
                        this.alert.success('Sidebar succesfully disabled', options);
                    }

                    const successValue = value.status;
                    subject.next(successValue);
                },
                error: (value: any) => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('A sidebar is already active disable it before', options);

                    const errorValue = value.status;
                    subject.error(errorValue);
                }
            });

        return subject.asObservable();
    }

    /** Delete Sidebar */
    deleteSidebar(value: any) {
        this.httpClient.delete(this.baseUrl + this.deleteUrl + value)
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: true,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('This sidebar is deleted', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This sidebar is not deleted', options);
                }
            });
    }
}
