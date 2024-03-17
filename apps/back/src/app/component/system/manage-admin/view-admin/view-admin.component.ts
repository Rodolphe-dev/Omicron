import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { AdminAccountService } from '../../../../service/adminAccount/adminAccount.service';
import { IAdminAccount } from '../../../../model/adminAccount';

@Component({
    selector: 'app-view-admin',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
    ],
    providers: [AdminAccountService],
    templateUrl: './view-admin.component.html',
    styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit {

    id!: string | null;
    actualAdmin: any = {};
    adminIdValue!: number;
    adminUsernameValue!: string;
    adminEmailValue!: string;
    adminPasswordValue!: string;
    adminSuperAdminValue!: boolean;

    constructor(
        private breadcrumbs : BreadcrumbsService,
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
                    },
                    error: () => { },
                    complete: () => { }
                });
            
        }

}
