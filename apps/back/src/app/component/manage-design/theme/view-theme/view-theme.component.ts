import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'omicron-nx-view-theme',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './view-theme.component.html',
    styleUrls: ['./view-theme.component.css']
})
export class ViewThemeComponent implements OnInit {

    constructor(private breadcrumbs: BreadcrumbsService) {
    }

    ngOnInit() {
        this.breadcrumbs.setLevel(2);
        this.breadcrumbs.setLevelOneValue('Design');
        this.breadcrumbs.setLevelTwoValue('View Theme');
        this.breadcrumbs.setLevelThreeValue('');
    }

}
