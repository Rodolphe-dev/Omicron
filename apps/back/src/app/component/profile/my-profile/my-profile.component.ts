import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    RouterLink,
    RouterLinkActive,
    Router,
    ActivatedRoute,
} from "@angular/router";
import {
    FormBuilder,
    ReactiveFormsModule,
    FormsModule,
    FormControl,
    Validators,
} from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { BreadcrumbsService } from "../../../service/breadcrumbs/breadcrumbs.service";
import { AdminAccountService } from "../../../service/adminAccount/adminAccount.service";

@Component({
    selector: "omicron-nx-my-profile",
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
    ],
    providers: [AdminAccountService],
    templateUrl: "./my-profile.component.html",
    styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit {
    faEye = faEye;
    faEyeSlash = faEyeSlash;
    showPassword = false;
    id!: number | null;
    adminIdValue!: number;
    adminUsernameValue: string | null | undefined;
    adminEmailValue: string | null | undefined;
    adminPasswordValue: string | null | undefined;
    adminSuperAdminValue: boolean | null | undefined;
    superAdmin: boolean | null | undefined;

    adminForm = this.formBuilder.group({
        username: new FormControl<string | null | undefined>("", {
            validators: Validators.required,
        }),
        email: new FormControl<string | null | undefined>("", {
            validators: Validators.required,
        }),
        superAdmin: new FormControl<boolean | null | undefined>(false),
    });

    adminPasswordForm = this.formBuilder.group({
        password: new FormControl<string>("", {
            validators: Validators.required,
        }),
        confirmPassword: new FormControl<string>("", {
            validators: Validators.required,
        }),
    });

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private formBuilder: FormBuilder,
        private admin: AdminAccountService,
        public router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.breadcrumbs.setLevel(1);
        this.breadcrumbs.setLevelOneValue("My Profile");
        this.breadcrumbs.setLevelTwoValue("");
        this.breadcrumbs.setLevelThreeValue("");

        this.id = <number>(<unknown>this.route.snapshot.paramMap.get("id"));

        this.admin.getThisAdminAccount(this.id).subscribe({
            next: (value) => {
                this.adminIdValue = value.id;
                this.adminUsernameValue = value.username;
                this.adminEmailValue = value.email;
                this.adminSuperAdminValue = value.superadmin;

                this.adminForm.setValue({
                    username: value.username,
                    email: value.email,
                    superAdmin: value.superadmin,
                });
            },
        });
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
            superadmin: this.superAdmin,
        };

        this.admin.editMyAdminAccount(this.adminIdValue, body);
    }

    editAdminPasswordForm() {
        const password = this.adminPasswordForm.value.password;
        const confirmPassword = this.adminPasswordForm.value.confirmPassword;

        if (confirmPassword === password) {
            const body = {
                plainPassword: password,
            };

            this.admin.editMyAdminAccount(this.adminIdValue, body);
        } else {
            // TODO : need add toast error and put red label on password input
        }
    }
}
