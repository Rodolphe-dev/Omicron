import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-list-theme',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './list-theme.component.html',
    styleUrls: ['./list-theme.component.css']
})
export class ListThemeComponent implements OnInit {

    constructor(private breadcrumbs : BreadcrumbsService) {
    }

    ngOnInit() {
        this.breadcrumbs.setLevel(2);
        this.breadcrumbs.setLevelOneValue('Design');
        this.breadcrumbs.setLevelTwoValue('List Themes');
        this.breadcrumbs.setLevelThreeValue('');
    }

}
