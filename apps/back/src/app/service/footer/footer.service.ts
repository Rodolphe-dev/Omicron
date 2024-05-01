import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, map } from 'rxjs';
import { AlertService } from '../../service/alert/alert.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class FooterService {
    private baseUrl = environment.apiURL;
    private normalUrl = '/api/footers';
    private getUrl = '/api/footers/';
    private updateStatusUrl = '/api/footers/updateFooterStatus/';
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
        private alert: AlertService
    ) { }

    /** Inital List + Pagination */
    getFooters() {
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
    getFootersByPage(pageValue: string) {
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

    /** Get Footer by id */
    getThisFooter(value: number) {
        return this.httpClient.get(this.baseUrl + this.getUrl + value, { headers: this.JsonHeader });
    }

    /** Add Footer */
    addFooter(value: any) {
        this.httpClient.post(this.baseUrl + this.normalUrl, value)
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('This footer is added', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This footer is not added', options);
                }
            });
    }

    /** Edit Footer */
    editFooter(id: number, value: any) {
        this.httpClient.patch(this.baseUrl + this.getUrl + id, value, { headers: this.MergeJsonHeader })
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('This footer is edited', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This footer is not edited', options);
                }
            });
    }

    /** Toggle Footer Status */
    toggleFooterStatus(id: number) {
        const subject = new Subject<boolean>();

        this.httpClient.patch(this.baseUrl + this.updateStatusUrl + id, { headers: this.MergeJsonHeader })
            .subscribe({
                next: (value: any) => {
                    const options = {
                        autoClose: true,
                        keepAfterRouteChange: true
                    }

                    if (value.status === true) {
                        this.alert.success('Footer succesfully enabled', options);
                    } else {
                        this.alert.success('Footer succesfully disabled', options);
                    }

                    const successValue = value.status;
                    subject.next(successValue);
                },
                error: (value: any) => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('A footer is already active disable it before', options);

                    const errorValue = value.status;
                    subject.error(errorValue);
                }
            });

        return subject.asObservable();
    }

    /** Delete Footer */
    deleteFooter(value: number) {
        this.httpClient.delete(this.baseUrl + this.deleteUrl + value)
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.success('This footer is deleted', options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This footer is not deleted', options);
                }
            });
    }

}
