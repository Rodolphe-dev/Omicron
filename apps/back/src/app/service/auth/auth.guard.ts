import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = () => {
    const route = inject(Router);
    const authS = inject(AuthService);
    
    if(localStorage.getItem('token')){
        return true;
    }else{
        window.alert("Access not allowed!");

        route.navigate(['/login']).then(() => {
            window.location.reload();
        });

        return false;
    }
};