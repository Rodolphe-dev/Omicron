import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { AdminAccountService } from '../../../../service/adminAccount/adminAccount.service';
import { IAdminAccount } from '../../../../model/adminAccount';

@Component({
    selector: 'app-add-admin',
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
    templateUrl: './add-admin.component.html',
    styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

    faEye = faEye
    faEyeSlash = faEyeSlash

    showPassword: boolean = false;

    adminForm = this.formBuilder.group(
        {
            username: new FormControl<string>('', { validators: Validators.required }),
            password: new FormControl<string>('', { validators: Validators.required }),
            email: new FormControl<string>('', { validators: Validators.required }),
            superAdmin: ''
        }
    );

    constructor(
        private breadcrumbs : BreadcrumbsService,
        private formBuilder: FormBuilder,
        private admin : AdminAccountService,
        public router : Router
        ) { }

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue('System');
        this.breadcrumbs.setLevelTwoValue('Admin Accounts');
        this.breadcrumbs.setLevelThreeValue('Add Admin');
        
        this.adminForm = new FormGroup({
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
            email: new FormControl('', [
                Validators.required,
                Validators.email,
                Validators.maxLength(255),
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
            ]),
            superAdmin: new FormControl(''),
        });
    }

    get usernameInput() {
        return this.adminForm.get('username') !;
    }

    get passwordInput() {
        return this.adminForm.get('password') !;
    }

    get emailInput() {
        return this.adminForm.get('email') !;
    }

    togglePasswordVisibility(){
        this.showPassword = !this.showPassword;
    }

    addAdminForm(){
        let username = this.adminForm.value.username;
        let email = this.adminForm.value.email;
        let password = this.adminForm.value.password;

        // BUG checkbox at render dont have value so here a quick fix
        if(this.adminForm.value.superAdmin){
            var superAdmin = Boolean(this.adminForm.value.superAdmin);
        }else{
            var superAdmin = false;
        }

        const body = {
            username: username,
            email : email,
            plainPassword: password,
            superadmin: superAdmin
        };

        this.admin.addAdminAccount(body);

        this.router.navigate(['/system/admin/list']);
    }
}