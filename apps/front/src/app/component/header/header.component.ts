import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faHouse } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from '../../service/navbar/navbar.service';
import { SettingService } from '../../service/setting/setting.service';
import { INavbar } from '../../model/navbar';

@Component({
    selector: 'app-header',
    standalone: true,
	imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FontAwesomeModule,
        FormsModule
    ],
    providers: [
        NavbarService,
        SettingService
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	faBars = faBars;
	faHouse = faHouse;

    actualSetting: any = {};
    appName!: string;

    items : INavbar[] = [];
    
    constructor(
        private navbar : NavbarService,
        private setting : SettingService,
        ) { }

    ngOnInit() {
        this.navbar.getNavbars()
            .subscribe({
                next: value => {
                    let stringValue = JSON.stringify(value);
                    let parseValue = JSON.parse(stringValue);
                    let fisrtNavbar = parseValue[0];

                    this.items = fisrtNavbar.items;
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
