import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../service/auth/auth.service';
import { AdminAccountService } from '../../service/adminAccount/adminAccount.service';
import { AlertService } from '../../service/alert/alert.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-login',
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

    showPassword: boolean = false;

    loginForm = this.formBuilder.group(
        {
            username: new FormControl<string>('', { validators: Validators.required }),
            password: new FormControl<string>('', { validators: Validators.required }),
        }
    );

    actualAdmin: any = {};

    constructor(
        private formBuilder: FormBuilder,
        private auth : AuthService,
        private admin : AdminAccountService,
        private alert : AlertService,
        public router : Router,
        private appComp : AppComponent
        ) { }

    ngOnInit() {
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
        return this.loginForm.get('username') !;
    }

    get password() {
        return this.loginForm.get('password') !;
    }

    togglePasswordVisibility(){
        this.showPassword = !this.showPassword;
    }

    loginAuthForm(){
        let username = this.loginForm.value.username;
        let password = this.loginForm.value.password;

        const body = {
            username: username,
            password: password,
        };

        this.admin.getThisAdminAccountByUsername(username)
            .subscribe({
                next: value => {
                    this.actualAdmin = value;
                    localStorage.setItem('superadmin', this.actualAdmin.superadmin);
                    localStorage.setItem('userId', this.actualAdmin.id);

                    this.auth.setAuthToken(body)
                    .subscribe({
                        next: (value : any) => {
                            
                            let removeToken = localStorage.removeItem('token');
                            if (removeToken == null) {
                                localStorage.setItem('token', value.token);
            
                                let options = {
                                    autoClose: true,
                                    keepAfterRouteChange: true
                                }

                                this.alert.success('Login successful', options);
                                
                                this.appComp.changeIsLoggedIn(true);

                                this.router.navigate(['dashboard']);
                            }
                        },
                        error: () => {
                            let options = {
                                autoClose: false,
                                keepAfterRouteChange: true
                            }

                            this.alert.error('This username or password must be wrong', options);
                        },
                        complete: () => {}
                    });
                },
                error: () => {
                    let options = {
                        autoClose: false,
                        keepAfterRouteChange: true
                    }

                    this.alert.error('This username is wrong', options);
                },
                complete: () => { }
            });
    }

}
