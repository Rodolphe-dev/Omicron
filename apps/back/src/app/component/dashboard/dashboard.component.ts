import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faBolt, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { AlertService } from '../../service/alert/alert.service';
import { BreadcrumbsService } from '../../service/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
	imports: [FontAwesomeModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private breadcrumbs : BreadcrumbsService,
        private alert : AlertService) { 
    }

    ngOnInit() {
        this.breadcrumbs.setLevel(1);
        this.breadcrumbs.setLevelOneValue('Dashboard');
    }

	faUser = faUser;
	faEye = faEye;
	faBolt = faBolt;
	faArrowTrendUp = faArrowTrendUp;
	faArrowTrendDown = faArrowTrendDown;
}
