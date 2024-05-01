import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = environment.apiURL;
    private authUrl = '/auth';
    private logoutUrl = '/logout';
    private verifyUrl = '/verify';
    private JsonHeader = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');

    constructor(
        private httpClient: HttpClient,
        public router : Router,
        private alert : AlertService
        ) { }

    getIsLogged(){
        return localStorage.getItem('isLogged');
    }

    getSuperAdmin(){
        return localStorage.getItem('superadmin');
    }

    getUserId(){
        return localStorage.getItem('userId');
    }

    login(data : any){
        return this.httpClient.post(this.baseUrl + this.authUrl, data, { headers: this.JsonHeader });
    }

    isLoggedIn() {
        const isLogged = this.getIsLogged();

        if(isLogged === 'true'){
            return true;
        }else{
            return false;
        }
    }

    logout() {
        this.httpClient.post(this.baseUrl + this.logoutUrl, { headers: this.JsonHeader });
        localStorage.removeItem('isLogged');
        localStorage.removeItem('superadmin');
        localStorage.removeItem('userId');

        const options = {
            autoClose: true,
            keepAfterRouteChange: true
        };
        this.alert.success('Logout successful', options);
        this.router.navigate(['login']);
    }

    verifyToken(){
        return this.httpClient.get(this.baseUrl + this.verifyUrl)
        .subscribe({
            next: (value : any) => {
                console.log(value);
                //result of value can be: valid, invalid, expired, unverified
            }
        });
    }

}
