import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    RouterLink,
    RouterLinkActive,
    Router,
    ActivatedRoute,
} from "@angular/router";
import { BreadcrumbsService } from "../../../../service/breadcrumbs/breadcrumbs.service";
import { SidebarService } from "../../../../service/sidebar/sidebar.service";
import { SidebarItems } from "../../../../model/sidebar";

@Component({
    selector: "omicron-nx-view-sidebar",
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    providers: [SidebarService],
    templateUrl: "./view-sidebar.component.html",
    styleUrls: ["./view-sidebar.component.css"],
})
export class ViewSidebarComponent implements OnInit {
    id!: number | null;
    sidebarIdValue!: number;
    sidebarNameValue: string | null | undefined;
    sidebarStatus: string | null | undefined;
    items: SidebarItems[] = [];

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private sidebar: SidebarService,
        public router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue("Menus");
        this.breadcrumbs.setLevelTwoValue("Sidebar");
        this.breadcrumbs.setLevelThreeValue("View Sidebar");

        this.id = <number>(<unknown>this.route.snapshot.paramMap.get("id"));

        this.sidebar.getThisSidebar(this.id).subscribe({
            next: (value) => {
                this.sidebarIdValue = value.id;
                this.sidebarNameValue = value.name;

                if (value.status === true) {
                    this.sidebarStatus = "Enabled";
                } else {
                    this.sidebarStatus = "Disabled";
                }

                this.items = value.items;
            },
        });
    }
}
