import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs";
import { AlertService } from "../../service/alert/alert.service";
import { environment } from "../../../environments/environment";
import { JSONldListAdmin } from "../../model/adminAccount";
import { AdminAccount } from "../../model/adminAccount";

@Injectable({
    providedIn: "root",
})
export class AdminAccountService {
    private baseUrl = environment.apiURL;
    private normalUrl = "/api/admin_accounts";
    private getUrl = "/api/admin_accounts/";
    private editUrlProfile = "/api/admin_accounts/updateProfile/";
    private editUrlPassword = "/api/admin_accounts/updatePassword/";
    private editUrlMyPassword = "/api/admin_accounts/updateMyPassword/";
    private getUrlByName = "/api/admin_accounts/getAdminAccountByUsername/";
    private deleteUrl = "/api/admin_accounts/";

    private LDJsonHeader = new HttpHeaders()
        .set("Accept", "application/ld+json")
        .set("Content-Type", "application/ld+json");
    private JsonHeader = new HttpHeaders()
        .set("Accept", "application/json")
        .set("Content-Type", "application/json");
    private MergeJsonHeader = new HttpHeaders()
        .set("Accept", "application/json")
        .set("Content-Type", "application/merge-patch+json");

    constructor(private httpClient: HttpClient, private alert: AlertService) {}

    /** Inital List + Pagination */
    getAdminAccounts() {
        return this.httpClient
            .get<JSONldListAdmin>(this.baseUrl + this.normalUrl, {
                headers: this.LDJsonHeader,
            })
            .pipe(
                map((res) => ({
                    listItem: res["hydra:member"],
                    totalItems: res["hydra:totalItems"],
                    actual: res["hydra:view"]["@id"],
                    first: res["hydra:view"]["hydra:first"],
                    last: res["hydra:view"]["hydra:last"],
                    previous: res["hydra:view"]["hydra:previous"],
                    next: res["hydra:view"]["hydra:next"],
                }))
            );
    }

    /** Refresh List + Pagination */
    getadminAccountsByPage(pageValue: string) {
        return this.httpClient
            .get<JSONldListAdmin>(this.baseUrl + pageValue, {
                headers: this.LDJsonHeader,
            })
            .pipe(
                map((res) => ({
                    listItem: res["hydra:member"],
                    totalItems: res["hydra:totalItems"],
                    actual: res["hydra:view"]["@id"],
                    first: res["hydra:view"]["hydra:first"],
                    last: res["hydra:view"]["hydra:last"],
                    previous: res["hydra:view"]["hydra:previous"],
                    next: res["hydra:view"]["hydra:next"],
                }))
            );
    }

    /** Get Admin Account by id */
    getThisAdminAccount(value: number) {
        return this.httpClient
            .get<AdminAccount>(this.baseUrl + this.getUrl + value, {
                headers: this.JsonHeader,
            })
            .pipe(
                map((res) => ({
                    id: res["id"],
                    username: res["username"],
                    email: res["email"],
                    superadmin: res["superadmin"],
                }))
            );
    }

    /** Get Admin Account by username */
    getThisAdminAccountByUsername(value: string | null | undefined) {
        return this.httpClient
            .get<AdminAccount>(this.baseUrl + this.getUrlByName + value, {
                headers: this.JsonHeader,
            })
            .pipe(
                map((res) => ({
                    id: res["id"],
                    username: res["username"],
                    email: res["email"],
                    superadmin: res["superadmin"],
                }))
            );
    }

    /** Add Admin Account */
    addAdminAccount(value: object) {
        this.httpClient.post(this.baseUrl + this.normalUrl, value).subscribe({
            next: () => {
                const options = {
                    autoClose: false,
                    keepAfterRouteChange: true,
                };

                this.alert.success("This admin account is added", options);
            },
            error: () => {
                const options = {
                    autoClose: false,
                    keepAfterRouteChange: true,
                };

                this.alert.error("This admin account is not added", options);
            },
        });
    }

    /** Edit Admin Account Profile */
    editAdminAccountProfile(id: number, value: object) {
        this.httpClient
            .patch(this.baseUrl + this.editUrlProfile + id, value, {
                headers: this.MergeJsonHeader,
            })
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true,
                    };

                    this.alert.success("This admin account is edited", options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true,
                    };

                    this.alert.error(
                        "This admin account is not edited",
                        options
                    );
                },
            });
    }

    /** Edit Admin Account Password */
    editAdminAccountPassword(id: number, value: object) {
        this.httpClient
            .patch(this.baseUrl + this.editUrlPassword + id, value, {
                headers: this.MergeJsonHeader,
            })
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true,
                    };

                    this.alert.success("This admin account is edited", options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true,
                    };

                    this.alert.error(
                        "This admin account is not edited",
                        options
                    );
                },
            });
    }

    /** Edit My Admin Account Profile */
    editMyAdminAccountProfile(id: number, value: object) {
        this.httpClient
            .patch(this.baseUrl + this.editUrlProfile + id, value, {
                headers: this.MergeJsonHeader,
            })
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true,
                    };

                    this.alert.success("Your profil is edited", options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true,
                    };

                    this.alert.error("Your profil is not edited", options);
                },
            });
    }

    /** Edit My Admin Account Password */
    editMyAdminAccountPassword(id: number, value: object) {
        this.httpClient
            .patch(this.baseUrl + this.editUrlMyPassword + id, value, {
                headers: this.MergeJsonHeader,
            })
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true,
                    };

                    this.alert.success("Your profil is edited", options);
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true,
                    };

                    this.alert.error("Your profil is not edited", options);
                },
            });
    }

    /** Delete Admin Account */
    deleteAdminAccount(value: number) {
        this.httpClient
            .delete(this.baseUrl + this.deleteUrl + value)
            .subscribe({
                next: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true,
                    };

                    this.alert.success(
                        "This admin account is deleted",
                        options
                    );
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true,
                    };

                    this.alert.error(
                        "This admin account is not deleted",
                        options
                    );
                },
            });
    }
}
