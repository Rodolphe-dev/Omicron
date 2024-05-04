import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ISidebarItems } from '../../model/front-data';

@Component({
    selector: 'omicron-nx-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FontAwesomeModule,
        FormsModule
    ],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

    appName!: string;
    items: ISidebarItems[] = [];

    setSidebar(data: ISidebarItems[]){
        this.items = data;
    }

    setNameApp(data: string){
        this.appName = data;
    }

}
