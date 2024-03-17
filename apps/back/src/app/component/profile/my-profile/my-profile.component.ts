import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { BreadcrumbsService } from '../../../service/breadcrumbs/breadcrumbs.service';
import { AdminAccountService } from '../../../service/adminAccount/adminAccount.service';
import { IAdminAccount } from '../../../model/adminAccount';

@Component({
    selector: 'app-my-profile',
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
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

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
            username: '',
            email: '',
            superAdmin: ''
        }
    );

    adminPasswordForm = this.formBuilder.group(
        {
            password: '',
            confirmPassword: ''
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
            this.breadcrumbs.setLevel(1);
            this.breadcrumbs.setLevelOneValue('My Profile');
            this.breadcrumbs.setLevelTwoValue('');
            this.breadcrumbs.setLevelThreeValue('');
    
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
            }else{
                // TODO : need add toast error and put red label on password input
            }
        }

}
