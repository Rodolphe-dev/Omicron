import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    RouterLink,
    RouterLinkActive,
    Router,
    ActivatedRoute,
} from "@angular/router";
import { BreadcrumbsService } from "../../../../service/breadcrumbs/breadcrumbs.service";
import { NavbarService } from "../../../../service/navbar/navbar.service";
import { SettingService } from "../../../../service/setting/setting.service";
import { NavbarItems } from "../../../../model/navbar";

@Component({
    selector: "omicron-nx-view-navbar",
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    providers: [NavbarService, SettingService],
    templateUrl: "./view-navbar.component.html",
    styleUrls: ["./view-navbar.component.css"],
})
export class ViewNavbarComponent implements OnInit {
    id!: number | null;
    navbarIdValue!: number;
    navbarNameValue: string | null | undefined;
    navbarStatus: string | null | undefined;
    appName: string | null | undefined;
    items: NavbarItems[] = [];

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private navbar: NavbarService,
        private setting: SettingService,
        public router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue("Menus");
        this.breadcrumbs.setLevelTwoValue("Navbar");
        this.breadcrumbs.setLevelThreeValue("View Navbar");

        this.id = <number>(<unknown>this.route.snapshot.paramMap.get("id"));

        this.navbar.getThisNavbar(this.id).subscribe({
            next: (value) => {
                this.navbarIdValue = value.id;
                this.navbarNameValue = value.name;

                if (value.status === true) {
                    this.navbarStatus = "Enabled";
                } else {
                    this.navbarStatus = "Disabled";
                }

                this.items = value.items;
            },
        });

        this.setting.getThisSetting(1).subscribe({
            next: (value) => {
                this.appName = value.nameApp;
            },
        });
    }
}
