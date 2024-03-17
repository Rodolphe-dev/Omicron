import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { AdminAccountService } from '../../../../service/adminAccount/adminAccount.service';
import { IAdminAccount } from '../../../../model/adminAccount';

@Component({
    selector: 'app-edit-admin',
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
    templateUrl: './edit-admin.component.html',
    styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

    faEye = faEye
    faEyeSlash = faEyeSlash

    showPassword: boolean = false;

    id!: string | null;
    actualAdmin: any = {};
    adminIdValue!: number;
    adminUsernameValue!: string;
    adminEmailValue!: string;
    adminPasswordValue!: string;
    adminSuperAdminValue!: boolean;

    adminForm = this.formBuilder.group(
        {
            username: new FormControl<string>('', { validators: Validators.required }),
            email: new FormControl<string>('', { validators: Validators.required }),
            superAdmin: ''
        }
    );

    adminPasswordForm = this.formBuilder.group(
        {
            password: new FormControl<string>('', { validators: Validators.required }),
            confirmPassword: new FormControl<string>('', { validators: Validators.required }),
        }
    );

    constructor(
        private breadcrumbs : BreadcrumbsService,
        private formBuilder: FormBuilder,
        private admin : AdminAccountService,
        public router : Router,
        private route: ActivatedRoute
        ) { }

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue('System');
        this.breadcrumbs.setLevelTwoValue('Admin Accounts');
        this.breadcrumbs.setLevelThreeValue('Add Admin');

        this.id = this.route.snapshot.paramMap.get('id');

        this.admin.getThisAdminAccount(this.id)
            .subscribe({
                next: value => {
                    this.actualAdmin = value;
                    this.adminIdValue = this.actualAdmin.id;
                    this.adminUsernameValue = this.actualAdmin.username;
                    this.adminEmailValue = this.actualAdmin.email;
                    this.adminSuperAdminValue = this.actualAdmin.superadmin;
                    
                    this.adminForm.setValue({username: this.actualAdmin.username, email: this.actualAdmin.email, superAdmin: this.actualAdmin.superadmin});
                },
                error: () => { },
                complete: () => { }
            });
        
        this.adminForm = new FormGroup({
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(25),
                Validators.pattern("^(?=[^a-z]*[a-z])[A-Za-z\\d!]{3,25}$")
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
            ]),
            superAdmin: new FormControl(''),
        });
        
        this.adminPasswordForm = new FormGroup({
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(25),
                Validators.pattern("^(?=[^a-z]*[a-z])[A-Za-z\\d!$%@/#£€*?&]{8,25}$")
            ]),
            confirmPassword: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(25),
                Validators.pattern("^(?=[^a-z]*[a-z])[A-Za-z\\d!$%@/#£€*?&]{8,25}$")
            ]),
        });
    }

    get usernameInput() {
        return this.adminForm.get('username') !;
    }

    get emailInput() {
        return this.adminForm.get('email') !;
    }

    get passwordInput() {
        return this.adminPasswordForm.get('password') !;
    }

    togglePasswordVisibility(){
        this.showPassword = !this.showPassword;
    }

    editAdminForm() {
        let username = this.adminForm.value.username;
        let email = this.adminForm.value.email;

        // BUG checkbox at render dont have value so here a quick fix
        if(this.adminForm.value.superAdmin){
            var superAdmin = Boolean(this.adminForm.value.superAdmin);
        }else{
            var superAdmin = false;
        }

        const body = {
            username: username,
            email : email,
            superadmin: superAdmin
        };

        this.admin.editAdminAccount(this.adminIdValue, body);
    }

    editAdminPasswordForm() {
        let password = this.adminPasswordForm.value.password;
        let confirmPassword = this.adminPasswordForm.value.confirmPassword;

        if(confirmPassword === password)
        {
            const body = {
                plainPassword: password
            };

            this.admin.editAdminAccount(this.adminIdValue, body);
        }
    }

}
