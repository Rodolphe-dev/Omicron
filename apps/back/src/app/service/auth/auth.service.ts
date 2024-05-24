import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { AlertService } from "../alert/alert.service";
import { environment } from "../../../environments/environment";
import { RefreshToken } from "../../model/refreshToken";
import { map } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private baseUrl = environment.apiURL;
    private authUrl = "/auth";
    private logoutUrl = "/logout";
    private refreshTokenUrl = "/api/token/refresh";
    private invalidateTokenUrl = "/api/token/invalidate";
    private verifyUrl = "/verify";
    private JsonHeader = new HttpHeaders()
        .set("Accept", "application/json")
        .set("Content-Type", "application/json");
    private ttl = 604800;

    constructor(
        private httpClient: HttpClient,
        public router: Router,
        private alert: AlertService
    ) {}

    clearLocalStorage() {
        localStorage.removeItem("isLogged");
        localStorage.removeItem("superadmin");
        localStorage.removeItem("userId");
    }

    setIsLogged(value: string) {
        const data = {
            value: value,
            expiry: new Date().getTime() + this.ttl,
        };
        localStorage.setItem("isLogged", JSON.stringify(data));
    }

    getIsLogged() {
        const keyStr = localStorage.getItem("isLogged");
        if (keyStr) {
            const now = new Date();
            const item = JSON.parse(keyStr);
            if (now.getTime() > item.expiry) {
                localStorage.removeItem("isLogged");
                localStorage.removeItem("superadmin");
                localStorage.removeItem("userId");
                return null;
            }
            return item.value;
        }
        return null;
    }

    setSuperAdmin(value: string) {
        const data = {
            value: value,
            expiry: new Date().getTime() + this.ttl,
        };
        localStorage.setItem("superadmin", JSON.stringify(data));
    }

    getSuperAdmin() {
        const keyStr = localStorage.getItem("superadmin");
        if (keyStr) {
            const now = new Date();
            const item = JSON.parse(keyStr);
            if (now.getTime() > item.expiry) {
                localStorage.removeItem("isLogged");
                localStorage.removeItem("superadmin");
                localStorage.removeItem("userId");
                return null;
            }
            return item.value;
        }
        return null;
    }

    setUserId(value: string) {
        const data = {
            value: value,
            expiry: new Date().getTime() + this.ttl,
        };
        localStorage.setItem("userId", JSON.stringify(data));
    }

    getUserId() {
        const keyStr = localStorage.getItem("userId");
        if (keyStr) {
            const now = new Date();
            const item = JSON.parse(keyStr);
            if (now.getTime() > item.expiry) {
                localStorage.removeItem("isLogged");
                localStorage.removeItem("superadmin");
                localStorage.removeItem("userId");
                return null;
            }
            return item.value;
        }
        return null;
    }

    login(data: object) {
        return this.httpClient.post(this.baseUrl + this.authUrl, data, {
            headers: this.JsonHeader,
        });
    }

    isLoggedIn() {
        const isLogged = this.getIsLogged();

        if (isLogged === "true") {
            return true;
        } else {
            return false;
        }
    }

    refreshToken() {
        return this.httpClient
            .post<RefreshToken>(this.baseUrl + this.refreshTokenUrl, {
                headers: this.JsonHeader,
            })
            .pipe(
                map((res) => ({
                    token: res["token"],
                    refresh_token_expiration: res["refresh_token_expiration"],
                }))
            );
    }

    invalidateToken() {
        return this.httpClient.post(this.baseUrl + this.invalidateTokenUrl, {
            headers: this.JsonHeader,
        });
    }

    logout() {
        this.httpClient
            .post(this.baseUrl + this.logoutUrl, { headers: this.JsonHeader })
            .subscribe({
                next: () => {
                    this.clearLocalStorage();

                    this.invalidateToken().subscribe({
                        next: (value: object) => {
                            console.log(value);
                        },
                    });

                    const options = {
                        autoClose: true,
                        keepAfterRouteChange: true,
                    };
                    this.alert.success("Logout successful", options);
                    this.router.navigate(["login"]);
                },
            });
    }

    verifyToken() {
        return this.httpClient.get(this.baseUrl + this.verifyUrl).subscribe({
            next: (value: object) => {
                console.log(value);
                //result of value can be: valid, invalid, expired, unverified
            },
        });
    }
}
