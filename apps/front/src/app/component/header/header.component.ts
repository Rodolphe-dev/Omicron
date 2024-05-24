import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { RouterLinkActive } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBars, faHouse } from "@fortawesome/free-solid-svg-icons";
import { NavbarItems } from "../../model/front-data";

@Component({
    selector: "omicron-nx-header",
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FontAwesomeModule,
        FormsModule,
    ],
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
    faBars = faBars;
    faHouse = faHouse;

    appName!: string;
    items: NavbarItems[] = [];

    setNavbar(data: NavbarItems[]) {
        this.items = data;
    }

    setNameApp(data: string) {
        this.appName = data;
    }
}
