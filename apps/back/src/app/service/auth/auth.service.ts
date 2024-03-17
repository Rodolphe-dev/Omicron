import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = environment.apiURL;
    private normalUrl = '/auth';
    private verifyUrl = '/verify';

    constructor(
        private httpClient: HttpClient,
        public router : Router,
        private alert : AlertService
        ) { }

    getAuthToken(){
        return localStorage.getItem('token');
    }

    getSuperAdmin(){
        return localStorage.getItem('superadmin');
    }

    getUserId(){
        return localStorage.getItem('userId');
    }

    setAuthToken(data : any){
        return this.httpClient.post(this.baseUrl + this.normalUrl, data);
    }

    verifyToken(data : any){
        return this.httpClient.post(this.baseUrl + this.verifyUrl, data)
        .subscribe({
            next: (value : any) => {
                //result of value can be: valid, invalid, expired, unverified
            },
            error: () => {},
            complete: () => {}
        });
    }

    isLoggedIn() {
        let authToken = localStorage.getItem('token');

        if(authToken){
            return true;
        }else{
            return false;
        }
    }

    
    logout() {
        let removeToken = localStorage.removeItem('token');
        localStorage.removeItem('superadmin');
        localStorage.removeItem('userId');
        if (removeToken == null) {
            let options = {
                autoClose: true,
                keepAfterRouteChange: true
            };
            this.alert.success('Logout successful', options);
            this.router.navigate(['login']);
        }
    }

}
