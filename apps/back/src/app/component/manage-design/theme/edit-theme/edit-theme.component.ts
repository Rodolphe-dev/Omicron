import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'omicron-nx-edit-theme',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './edit-theme.component.html',
    styleUrls: ['./edit-theme.component.css']
})
export class EditThemeComponent implements OnInit {

    constructor(private breadcrumbs: BreadcrumbsService) {
    }

    ngOnInit() {
        this.breadcrumbs.setLevel(2);
        this.breadcrumbs.setLevelOneValue('Design');
        this.breadcrumbs.setLevelTwoValue('Edit Theme');
        this.breadcrumbs.setLevelThreeValue('');
    }

}
