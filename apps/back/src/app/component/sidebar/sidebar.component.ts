import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    RouterLink,
    Router,
    NavigationEnd,
    RouterLinkActive,
} from "@angular/router";
import { AuthService } from "../../service/auth/auth.service";
import { environment } from "../../../environments/environment";

@Component({
    selector: "omicron-nx-sidebar",
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
    @ViewChild("detailsMenu") detailsMenu!: ElementRef;
    @ViewChild("detailsContent") detailsContent!: ElementRef;
    @ViewChild("detailsDesign") detailsDesign!: ElementRef;
    @ViewChild("detailsAccount") detailsAccount!: ElementRef;
    @ViewChild("detailsSystem") detailsSystem!: ElementRef;

    docAPIUrl!: string;
    isSuperAdmin!: boolean | null;

    constructor(public router: Router, private auth: AuthService) {}

    ngOnInit() {
        this.docAPIUrl = environment.docURL;
        this.isSuperAdmin = this.auth.getSuperAdmin();

        //Check if route contain parent menu for open/close the parent
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                const actualRoute = e.url;

                //Check Parent -> Menu
                const menuNavbar = actualRoute.includes("navbar");
                const menuSidebar = actualRoute.includes("sidebar");
                const menuFooter = actualRoute.includes("footer");

                if (
                    menuNavbar === true ||
                    menuSidebar === true ||
                    menuFooter === true
                ) {
                    this.detailsMenu.nativeElement.setAttribute("open", "");
                    this.detailsMenu.nativeElement.removeAttribute("close");
                } else {
                    this.detailsMenu.nativeElement.setAttribute("close", "");
                    this.detailsMenu.nativeElement.removeAttribute("open");
                }

                //Check Parent -> Content
                const contentPage = actualRoute.includes("page");

                if (contentPage === true) {
                    this.detailsContent.nativeElement.setAttribute("open", "");
                    this.detailsContent.nativeElement.removeAttribute("close");
                } else {
                    this.detailsContent.nativeElement.setAttribute("close", "");
                    this.detailsContent.nativeElement.removeAttribute("open");
                }

                //Check Parent -> Design
                const contentTheme = actualRoute.includes("theme");

                if (contentTheme === true) {
                    this.detailsDesign.nativeElement.setAttribute("open", "");
                    this.detailsDesign.nativeElement.removeAttribute("close");
                } else {
                    this.detailsDesign.nativeElement.setAttribute("close", "");
                    this.detailsDesign.nativeElement.removeAttribute("open");
                }

                //Check Parent -> Account
                const contentAccount = actualRoute.includes("account");

                if (contentAccount === true) {
                    this.detailsAccount.nativeElement.setAttribute("open", "");
                    this.detailsAccount.nativeElement.removeAttribute("close");
                } else {
                    this.detailsAccount.nativeElement.setAttribute("close", "");
                    this.detailsAccount.nativeElement.removeAttribute("open");
                }

                //Check Parent -> System
                const contentSystem = actualRoute.includes("system");

                if (contentSystem === true) {
                    this.detailsSystem.nativeElement.setAttribute("open", "");
                    this.detailsSystem.nativeElement.removeAttribute("close");
                } else {
                    this.detailsSystem.nativeElement.setAttribute("close", "");
                    this.detailsSystem.nativeElement.removeAttribute("open");
                }
            }
        });
    }
}
