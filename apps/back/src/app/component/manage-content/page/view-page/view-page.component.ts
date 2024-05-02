import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { PageService } from '../../../../service/page/page.service';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
    selector: 'omicron-nx-view-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        EditorModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        PageService
    ],
    templateUrl: './view-page.component.html',
    styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {

    id!: string | null;
    actualPage: any = {};
    pageIdValue!: number;
    pageNameValue!: string;
    pageRouteValue!: string;
    pageContentValue!: string;

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private formBuilder: FormBuilder,
        private page: PageService,
        public router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.breadcrumbs.setLevel(2);
        this.breadcrumbs.setLevelOneValue('Content');
        this.breadcrumbs.setLevelTwoValue('View Page');
        this.breadcrumbs.setLevelThreeValue('');

        this.id = this.route.snapshot.paramMap.get('id');

        this.page.getThisPage(this.id)
            .subscribe({
                next: value => {
                    this.actualPage = value;
                    this.pageIdValue = this.actualPage.id;
                    this.pageNameValue = this.actualPage.name;
                    this.pageNameValue = this.actualPage.route;
                    this.pageContentValue = this.actualPage.content;
                }
            });
    }

}
