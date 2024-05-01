import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FooterComponent } from './component/footer/footer.component';
import { FrontDataService } from './service/front-data/front-data.service'
import { environment } from '../environments/environment';

@Component({
    selector: 'omicron-nx-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        HttpClientModule
    ],
    providers: [
        FrontDataService
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    private baseUrl = environment.apiURL;
    private JsonHeader = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');

    frontDataValue: any = {};

    @ViewChild('header', { static: false }) header!: HeaderComponent;
    @ViewChild('sidebar') sidebar!: SidebarComponent;
    @ViewChild('footer') footer!: FooterComponent;

    headerStatus!: boolean | null;
    sidebarStatus!: boolean | null;
    footerStatus!: boolean | null;

    constructor(
        private frontData: FrontDataService
    ) { }

    ngOnInit() {
        this.frontData.getFrontData()
            .subscribe({
                next: value => {
                    this.frontDataValue = value;

                    this.headerStatus = this.frontDataValue.navbar.status;
                    this.sidebarStatus = this.frontDataValue.sidebar.status;
                    this.footerStatus = this.frontDataValue.footer.status;
                    
                    if(this.headerStatus === true){
                        this.header.setNavbar(this.frontDataValue.navbar.items);
                        this.header.setNameApp(this.frontDataValue.setting.nameApp);
                    }
                
                    if(this.sidebarStatus === true){
                        this.sidebar.setSidebar(this.frontDataValue.sidebar.items);
                        this.sidebar.setNameApp(this.frontDataValue.setting.nameApp);
                    }
                
                    if(this.footerStatus === true){
                        this.footer.setContent(this.frontDataValue.footer.content);
                    }
                    
                }
            });
    }
}
