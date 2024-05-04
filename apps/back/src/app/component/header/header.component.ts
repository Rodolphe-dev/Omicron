import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../service/auth/auth.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'omicron-nx-header',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        FontAwesomeModule
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    faUser = faUser
    myId!: string | null;

    constructor(
        private auth: AuthService,
        private appComp: AppComponent
    ) { }

    ngOnInit() {
        this.myId = this.auth.getUserId();
    }

    logout() {
        this.appComp.changeIsLoggedIn(false);
        this.auth.logout();
    }
}
