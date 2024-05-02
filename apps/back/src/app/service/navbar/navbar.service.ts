import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, map } from 'rxjs';
import { AlertService } from '../../service/alert/alert.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class NavbarService {
    private baseUrl = environment.apiURL;
    private normalUrl = '/api/navbars';
    private getUrl = '/api/navbars/';
    private updateStatusUrl = '/api/navbars/updateNavbarStatus/';
    private deleteUrl = '/api/navbars/';
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
    getNavbars() {
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
    getNavbarsByPage(pageValue: any) {
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

    /** Get Navbar by id */
    getThisNavbar(value: any) {
        return this.httpClient.get(this.baseUrl + this.getUrl + value, { headers: this.JsonHeader });
    }

    /** Add Navbar */
    addNavbar(value: any) {
        this.httpClient.post(this.baseUrl + this.normalUrl, value)
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: true,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('This navbar is added', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This navbar is not added', options);
                }
            });
    }

    /** Edit Navbar */
    editNavbar(id: number, value: any) {
        this.httpClient.patch(this.baseUrl + this.getUrl + id, value, { headers: this.MergeJsonHeader })
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: true,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('This navbar is edited', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This navbar is not edited', options);
                }
            });
    }

    /** Toggle Navbar Status */
    toggleNavbarStatus(id: any) {
        const subject = new Subject<boolean>();

        this.httpClient.patch(this.baseUrl + this.updateStatusUrl + id, { headers: this.MergeJsonHeader })
            .subscribe({
                next: (value: any) => {
                    const options = {
                        autoClose: true,
                        keepAfterRouteChange: true
                    }

                    if (value.status === true) {
                        this.alert.success('Navbar succesfully enabled', options);
                    } else {
                        this.alert.success('Navbar succesfully disabled', options);
                    }

                    const successValue = value.status;
                    subject.next(successValue);
                },
                error: (value: any) => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('A navbar is already active disable it before', options);

                    const errorValue = value.status;
                    subject.error(errorValue);
                }
            });

        return subject.asObservable();
    }

    /** Delete Navbar */
    deleteNavbar(value: any) {
        this.httpClient.delete(this.baseUrl + this.deleteUrl + value)
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: true,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('This navbar is deleted', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This navbar is not deleted', options);
                }
            });
    }
}
