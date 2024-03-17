import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { PageService } from '../../../../service/page/page.service';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
    selector: 'app-edit-page',
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
        { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
        PageService
    ],
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

    id!: string | null;
    actualPage: any = {};
    pageIdValue!: number;
    pageNameValue!: string;
    pageContentValue!: string;

    pageForm = this.formBuilder.group(
        {
            name: new FormControl<string>('', { validators: Validators.required }),
            route: new FormControl<string>('', { validators: Validators.required }),
            content: ''
        }
    );

    constructor(
        private breadcrumbs : BreadcrumbsService,
        private formBuilder: FormBuilder,
        private page : PageService,
        public router : Router,
        private route: ActivatedRoute
        ) { }

    ngOnInit() {
        this.breadcrumbs.setLevel(2);
        this.breadcrumbs.setLevelOneValue('Content');
        this.breadcrumbs.setLevelTwoValue('Edit Page');
        this.breadcrumbs.setLevelThreeValue('');

        this.id = this.route.snapshot.paramMap.get('id');

        this.page.getThisPage(this.id)
            .subscribe({
                next: value => {
                    this.actualPage = value;
                    this.pageIdValue = this.actualPage.id;
                    this.pageNameValue = this.actualPage.name;
                    this.pageContentValue = this.actualPage.content;
                    this.pageForm.setValue(
                        {
                            name: this.actualPage.name,
                            route: this.actualPage.route,
                            content: this.actualPage.content
                        }
                    );
                },
                error: () => { },
                complete: () => { }
            });
        

        this.pageForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.maxLength(25)
            ]),
            route: new FormControl('', [
                Validators.required,
                Validators.maxLength(100)
            ]),
            content: new FormControl('')
        });
    }

    get namePage() {
        return this.pageForm.get('name') !;
    }

    get routePage() {
        return this.pageForm.get('route') !;
    }

    editPageForm() {
        let pageName = this.pageForm.value.name;
        let pageRoute = this.pageForm.value.route;
        let pageContent = this.pageForm.value.content;
        const body = {
            name: pageName,
            route: pageRoute,
            content: pageContent
        };

        this.page.editPage(this.pageIdValue, body);

        this.router.navigate(['/page/list']);
    }
}
