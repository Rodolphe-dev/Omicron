import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { AdminAccountService } from '../../../../service/adminAccount/adminAccount.service';

@Component({
    selector: 'omicron-nx-edit-admin',
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
    showPassword = false;
    id!: number | null;
    adminIdValue!: number;
    adminUsernameValue: string | null | undefined;
    adminEmailValue: string | null | undefined;
    adminPasswordValue: string | null | undefined;
    adminSuperAdminValue: boolean | null | undefined;
    superAdmin: boolean | null | undefined;

    adminForm = this.formBuilder.group(
        {
            username: new FormControl<string | null | undefined>('', { validators: Validators.required }),
            email: new FormControl<string | null | undefined>('', { validators: Validators.required }),
            superAdmin: new FormControl<boolean | null | undefined>(false),
        }
    );

    adminPasswordForm = this.formBuilder.group(
        {
            password: new FormControl<string>('', { validators: Validators.required }),
            confirmPassword: new FormControl<string>('', { validators: Validators.required }),
        }
    );

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private formBuilder: FormBuilder,
        private admin: AdminAccountService,
        public router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue('System');
        this.breadcrumbs.setLevelTwoValue('Admin Accounts');
        this.breadcrumbs.setLevelThreeValue('Add Admin');

        this.id = <number><unknown>this.route.snapshot.paramMap.get('id');

        this.admin.getThisAdminAccount(this.id)
            .subscribe({
                next: value => {
                    this.adminIdValue = value.id;
                    this.adminUsernameValue = value.username;
                    this.adminEmailValue = value.email;
                    this.adminSuperAdminValue = value.superadmin;

                    this.adminForm.setValue({ username: value.username, email: value.email, superAdmin: value.superadmin });
                }
            });

        this.adminForm = new FormGroup({
            username: new FormControl<string | null | undefined>('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(25),
                Validators.pattern("^(?=[^a-z]*[a-z])[A-Za-z\\d!]{3,25}$")
            ]),
            email: new FormControl<string | null | undefined>('', [
                Validators.required,
                Validators.email,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
            ]),
            superAdmin: new FormControl<boolean | null | undefined>(false),
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
        return this.adminForm.get('username');
    }

    get emailInput() {
        return this.adminForm.get('email');
    }

    get passwordInput() {
        return this.adminPasswordForm.get('password');
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    editAdminForm() {
        const username = this.adminForm.value.username;
        const email = this.adminForm.value.email;

        // BUG checkbox at render dont have value so here a quick fix
        if (this.adminForm.value.superAdmin) {
            this.superAdmin = Boolean(this.adminForm.value.superAdmin);
        } else {
            this.superAdmin = false;
        }

        const body = {
            username: username,
            email: email,
            superadmin: this.superAdmin
        };

        this.admin.editAdminAccount(this.adminIdValue, body);
    }

    editAdminPasswordForm() {
        const password = this.adminPasswordForm.value.password;
        const confirmPassword = this.adminPasswordForm.value.confirmPassword;

        if (confirmPassword === password) {
            const body = {
                plainPassword: password
            };

            this.admin.editAdminAccount(this.adminIdValue, body);
        }
    }

}
