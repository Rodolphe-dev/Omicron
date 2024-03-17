import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, RouteReuseStrategy, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './component/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './component/footer/footer.component';
import { AlertComponent } from './component/alert/alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        LoginComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        FooterComponent,
        AlertComponent,
        HttpClientModule
    ],
    providers: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

    title = 'back-office';
    loggedIn : boolean = false;

    constructor(
        private auth: AuthService,
        private router: Router
    ) {
    }
    
    changeIsLoggedIn(value : boolean) {
        this.loggedIn = value;
        
    }

    ngOnInit() {
        this.loggedIn = this.auth.isLoggedIn();
    }
}
