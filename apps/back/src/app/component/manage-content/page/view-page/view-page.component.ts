import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'omicron-nx-view-page',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './view-page.component.html',
    styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {

    constructor(private breadcrumbs: BreadcrumbsService) {
    }

    ngOnInit() {
        this.breadcrumbs.setLevel(2);
        this.breadcrumbs.setLevelOneValue('Content');
        this.breadcrumbs.setLevelTwoValue('View Page');
        this.breadcrumbs.setLevelThreeValue('');
    }

}
