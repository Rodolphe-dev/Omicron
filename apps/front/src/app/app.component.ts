import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { HeaderComponent } from "./component/header/header.component";
import { SidebarComponent } from "./component/sidebar/sidebar.component";
import { FooterComponent } from "./component/footer/footer.component";
import { FrontDataService } from "./service/front-data/front-data.service";
import { environment } from "../environments/environment";

@Component({
    selector: "omicron-nx-root",
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        HttpClientModule,
    ],
    providers: [FrontDataService],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
    @ViewChild("header", { static: false }) header!: HeaderComponent;
    @ViewChild("sidebar") sidebar!: SidebarComponent;
    @ViewChild("footer") footer!: FooterComponent;
    headerStatus = false;
    sidebarStatus = false;
    footerStatus = false;

    constructor(private frontData: FrontDataService) {}

    ngOnInit() {
        this.frontData.getFrontData().subscribe({
            next: (value) => {
                if (value.navbar.status === true) {
                    this.header.setNavbar(value.navbar.items);
                    this.header.setNameApp(value.setting.nameApp);
                    this.headerStatus = true;
                }

                if (value.sidebar.status === true) {
                    this.sidebar.setSidebar(value.sidebar.items);
                    this.sidebar.setNameApp(value.setting.nameApp);
                    this.sidebarStatus = true;
                }

                if (value.footer.status === true) {
                    this.footer.setContent(value.footer.content);
                    this.footerStatus = true;
                }
            },
        });
    }
}
