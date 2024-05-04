import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { PageService } from '../../../../service/page/page.service';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
    selector: 'omicron-nx-edit-page',
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

    id!: number | null;
    pageIdValue!: number;
    pageNameValue: string | null | undefined;
    pageContentValue: string | null | undefined;
    pageForm = this.formBuilder.group(
        {
            name: new FormControl<string | null | undefined>('', { validators: Validators.required }),
            route: new FormControl<string | null | undefined>('', { validators: Validators.required }),
            content: new FormControl<string | null | undefined>('')
        }
    );

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
        this.breadcrumbs.setLevelTwoValue('Edit Page');
        this.breadcrumbs.setLevelThreeValue('');

        this.id = <number><unknown>this.route.snapshot.paramMap.get('id');

        this.page.getThisPage(this.id)
            .subscribe({
                next: value => {
                    this.pageIdValue = value.id;
                    this.pageNameValue = value.name;
                    this.pageContentValue = value.content;
                    this.pageForm.setValue(
                        {
                            name: value.name,
                            route: value.route,
                            content: value.content
                        }
                    );
                }
            });


        this.pageForm = new FormGroup({
            name: new FormControl<string | null | undefined>('', [
                Validators.required,
                Validators.maxLength(25)
            ]),
            route: new FormControl<string | null | undefined>('', [
                Validators.required,
                Validators.maxLength(100)
            ]),
            content: new FormControl<string | null | undefined>('')
        });
    }

    get namePage() {
        return this.pageForm.get('name');
    }

    get routePage() {
        return this.pageForm.get('route');
    }

    editPageForm() {
        const pageName = this.pageForm.value.name;
        const pageRoute = this.pageForm.value.route;
        const pageContent = this.pageForm.value.content;
        const body = {
            name: pageName,
            route: pageRoute,
            content: pageContent
        };

        this.page.editPage(this.pageIdValue, body);

        this.router.navigate(['/page/list']);
    }
}
