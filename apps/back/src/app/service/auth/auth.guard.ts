import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";
import { AuthService } from "../../service/auth/auth.service";

export const AuthGuard: CanActivateFn = () => {
    const route = inject(Router);
    const auth = inject(AuthService);
    const isLogged = auth.getIsLogged();

    if (isLogged === "true") {
        return true;
    } else {
        window.alert("Access not allowed!");

        route.navigate(["/login"]).then(() => {
            window.location.reload();
        });

        return false;
    }
};
