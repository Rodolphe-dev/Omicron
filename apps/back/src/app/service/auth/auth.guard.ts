import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
    const route = inject(Router);
    
    if(localStorage.getItem('isLogged') === 'true'){
        return true;
    }else{
        window.alert("Access not allowed!");

        route.navigate(['/login']).then(() => {
            window.location.reload();
        });

        return false;
    }
};