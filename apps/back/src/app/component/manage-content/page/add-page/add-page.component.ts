import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { PageService } from '../../../../service/page/page.service';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
    selector: 'app-add-page',
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
    templateUrl: './add-page.component.html',
    styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

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
        public router : Router
        ) { }


    ngOnInit() {
        this.breadcrumbs.setLevel(2);
        this.breadcrumbs.setLevelOneValue('Content');
        this.breadcrumbs.setLevelTwoValue('Add Page');
        this.breadcrumbs.setLevelThreeValue('');

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

    addPageForm(){
        let pageName = this.pageForm.value.name;
        let pageRoute = this.pageForm.value.route;
        let pageContent = this.pageForm.value.content;
        const body = {
            name: pageName,
            route: pageRoute,
            content: pageContent
        };

        this.page.addPage(body);

        this.router.navigate(['/page/list']);
    }

}
