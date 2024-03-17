import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { NavbarService } from '../../../../service/navbar/navbar.service';
import { SettingService } from '../../../../service/setting/setting.service';
import { INavbar } from '../../../../model/navbar';

@Component({
    selector: 'app-view-navbar',
    standalone: true,
	imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive
    ],
    providers: [
        NavbarService,
        SettingService
    ],
    templateUrl: './view-navbar.component.html',
    styleUrls: ['./view-navbar.component.css']
})
export class ViewNavbarComponent implements OnInit {

    id!: string | null;
    actualNavbar: any = {};
    navbarIdValue!: number;
    navbarNameValue!: string;

    actualSetting: any = {};
    appName!: string;

    items : INavbar[] = [];


    constructor(
        private breadcrumbs : BreadcrumbsService,
        private navbar : NavbarService,
        private setting : SettingService,
        public router : Router,
        private route: ActivatedRoute
        ) { }

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue('Menus');
        this.breadcrumbs.setLevelTwoValue('Navbar');
        this.breadcrumbs.setLevelThreeValue('View Navbar');

        this.id = this.route.snapshot.paramMap.get('id');

        this.navbar.getThisNavbar(this.id)
            .subscribe({
                next: value => {
                    this.actualNavbar = value;
                    this.navbarIdValue = this.actualNavbar.id;
                    this.navbarNameValue = this.actualNavbar.name;
                    this.items = this.actualNavbar.items[0];
                },
                error: () => {},
                complete: () => {}
        });

        
        this.setting.getThisSetting(1)
            .subscribe({
                next: value => {
                    this.actualSetting = value;
                    this.appName = this.actualSetting.nameApp;
                },
                error: () => { },
                complete: () => { }
            });
    }
}
