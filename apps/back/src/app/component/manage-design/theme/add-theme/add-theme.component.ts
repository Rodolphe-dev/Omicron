import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-add-theme',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './add-theme.component.html',
    styleUrls: ['./add-theme.component.css']
})
export class AddThemeComponent implements OnInit {

    constructor(private breadcrumbs : BreadcrumbsService) {
    }

    ngOnInit() {
        this.breadcrumbs.setLevel(2);
        this.breadcrumbs.setLevelOneValue('Design');
        this.breadcrumbs.setLevelTwoValue('Add Theme');
        this.breadcrumbs.setLevelThreeValue('');
    }

}
