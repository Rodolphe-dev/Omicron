import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { FooterService } from '../../../../service/footer/footer.service';

@Component({
    selector: 'omicron-nx-view-footer',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [FooterService],
    templateUrl: './view-footer.component.html',
    styleUrls: ['./view-footer.component.css']
})
export class ViewFooterComponent implements OnInit {

    id!: string | null;
    actualFooter: any = {};
    footerIdValue!: number;
    footerNameValue!: string;
    footerStatus!: string;
    footerContentValue!: string;

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private footer: FooterService,
        public router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue('Menus');
        this.breadcrumbs.setLevelTwoValue('Footer');
        this.breadcrumbs.setLevelThreeValue('Edit Footer');

        this.id = this.route.snapshot.paramMap.get('id');

        this.footer.getThisFooter(this.id)
            .subscribe({
                next: value => {
                    this.actualFooter = value;
                    this.footerIdValue = this.actualFooter.id;
                    this.footerNameValue = this.actualFooter.name;

                    if (this.actualFooter.status === true) {
                        this.footerStatus = "Enabled";
                    } else {
                        this.footerStatus = "Disabled";
                    }

                    this.footerContentValue = this.actualFooter.content;
                }
            });
    }

}
