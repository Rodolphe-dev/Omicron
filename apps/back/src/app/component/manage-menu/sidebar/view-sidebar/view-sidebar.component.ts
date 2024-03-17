import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { SidebarService } from '../../../../service/sidebar/sidebar.service';
import { ISidebar } from '../../../../model/sidebar';

@Component({
    selector: 'app-view-sidebar',
    standalone: true,
	imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive
    ],
    providers: [SidebarService],
    templateUrl: './view-sidebar.component.html',
    styleUrls: ['./view-sidebar.component.css']
})
export class ViewSidebarComponent implements OnInit {

    id!: string | null;
    actualSidebar: any = {};
    sidebarIdValue!: number;
    sidebarNameValue!: string;

    items : ISidebar[] = [];

    constructor(
        private breadcrumbs : BreadcrumbsService,
        private sidebar : SidebarService,
        public router : Router,
        private route: ActivatedRoute
        ) { }

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue('Menus');
        this.breadcrumbs.setLevelTwoValue('Sidebar');
        this.breadcrumbs.setLevelThreeValue('View Sidebar');

        this.id = this.route.snapshot.paramMap.get('id');

        this.sidebar.getThisSidebar(this.id)
            .subscribe({
                next: value => {
                    this.actualSidebar = value;
                    this.sidebarIdValue = this.actualSidebar.id;
                    this.sidebarNameValue = this.actualSidebar.name;
                    this.items = this.actualSidebar.items[0];
                },
                error: () => { },
                complete: () => { }
            });
    }

}
