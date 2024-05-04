import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { AdminAccountService } from '../../../../service/adminAccount/adminAccount.service';

@Component({
    selector: 'omicron-nx-view-admin',
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

    id!: number | null;
    adminIdValue!: number;
    adminUsernameValue: string | null | undefined;
    adminEmailValue: string | null | undefined;
    adminPasswordValue: string | null | undefined;
    adminSuperAdminValue: boolean | null | undefined;

    constructor(
        private breadcrumbs: BreadcrumbsService,
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
                }
            });

    }

}
