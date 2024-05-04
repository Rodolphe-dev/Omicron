import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { AppComponent } from '../../app.component';
import { AuthService } from '../../service/auth/auth.service';
import { AdminAccountService } from '../../service/adminAccount/adminAccount.service';
import { AlertService } from '../../service/alert/alert.service';

@Component({
    selector: 'omicron-nx-login',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ],
    providers: [AdminAccountService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    faEye = faEye
    faEyeSlash = faEyeSlash
    showPassword = false;

    loginForm = this.formBuilder.group(
        {
            username: new FormControl<string>('', { validators: Validators.required }),
            password: new FormControl<string>('', { validators: Validators.required }),
        }
    );

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private appComp: AppComponent,
        private auth: AuthService,
        private admin: AdminAccountService,
        private alert: AlertService
    ) { }

    ngOnInit() {
        if(this.auth.getIsLogged() === 'true'){
            this.auth.refreshToken()
                .subscribe({
                    next: value => {
                        if(value.token){
                            this.appComp.changeIsLoggedIn(true);

                            this.router.navigate(['dashboard']);
                        }else{
                            this.auth.logout();
                            this.router.navigate(['/login']).then(() => {
                                window.location.reload();
                            });
                        }
                    },
                    error: value => {
                        console.log(value.error);
                        if(value.error.message === "JWT Refresh Token Not Found" && value.error.code === 401){
                            this.auth.logout();
                            this.router.navigate(['/login']).then(() => {
                                window.location.reload();
                            });
                        }
                    }
                });
        }

        this.loginForm = new FormGroup({
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(25),
                Validators.pattern("^(?=[^a-z]*[a-z])[A-Za-z\\d!]{3,25}$")
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(25),
                Validators.pattern("^(?=[^a-z]*[a-z])[A-Za-z\\d!$%@/#£€*?&]{8,25}$")
            ]),
        });
    }

    get username() {
        return this.loginForm.get('username');
    }

    get password() {
        return this.loginForm.get('password');
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    loginAuthForm() {
        const username = this.loginForm.value.username;
        const password = this.loginForm.value.password;

        const body = {
            username: username,
            password: password,
        };

        this.admin.getThisAdminAccountByUsername(username)
            .subscribe({
                next: value => {
                    this.auth.setIsLogged('true');
                    this.auth.setSuperAdmin(<string><unknown>value.superadmin);
                    this.auth.setUserId(<string><unknown>value.id);

                    this.auth.login(body)
                        .subscribe({
                            next: () => {

                                const options = {
                                    autoClose: true,
                                    keepAfterRouteChange: true
                                }

                                this.alert.success('Login successful', options);

                                this.appComp.changeIsLoggedIn(true);

                                this.router.navigate(['dashboard']);
                            },
                            error: () => {
                                const options = {
                                    autoClose: false,
                                    keepAfterRouteChange: true
                                }

                                this.alert.error('This username or password must be wrong', options);
                            }
                        });
                },
                error: () => {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This username is wrong', options);
                }
            });
    }

}
