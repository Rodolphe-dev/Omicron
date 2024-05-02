import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(
            private auth : AuthService,
            private route : Router
        ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        req = req.clone({
            withCredentials: true
        }); 

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.error.message === "Invalid JWT Token" && error.status === 401)
                {
                    this.auth.logout();
                    this.route.navigate(['/login']).then(() => {
                        window.location.reload();
                    });
                }else if(error.error.message === "JWT Token not found" && error.status === 401){
                    this.auth.refreshToken()
                        .subscribe({
                            next: (value: any) => {
                                if(value.token){
                                    window.location.reload();
                                }else{
                                    this.auth.logout();
                                    this.route.navigate(['/login']).then(() => {
                                        window.location.reload();
                                    });
                                }
                            },
                            error: (value: any) => {
                                console.log(value.error);
                                if(value.error.message === "JWT Refresh Token Not Found" && value.error.code === 401){
                                    this.auth.logout();
                                    this.route.navigate(['/login']).then(() => {
                                        window.location.reload();
                                    });
                                }
                            }
                        });
                }else if(error.error.message === "Expired JWT Token" && error.status === 401){
                    this.auth.refreshToken()
                        .subscribe({
                            next: (value: any) => {
                                if(value.token){
                                    window.location.reload();
                                }else{
                                    this.auth.logout();
                                    this.route.navigate(['/login']).then(() => {
                                        window.location.reload();
                                    });
                                }
                            },
                            error: (value: any) => {
                                if(value.error.message === "JWT Refresh Token Not Found" && value.error.code === 401){
                                    this.auth.logout();
                                    this.route.navigate(['/login']).then(() => {
                                        window.location.reload();
                                    });
                                }
                            }
                        });
                }else if(error.error.message === "JWT Refresh Token Not Found" && error.status === 401){
                    this.auth.logout();
                    this.route.navigate(['/login']).then(() => {
                        window.location.reload();
                    });
                }else if(error.error.detail === "Only admins can access this." && error.status === 403){
                    this.route.navigate(['/dashboard']);
                }
                return throwError(() => new Error(error.error));
            })
        );
    }
}