import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { FooterService } from '../../../../service/footer/footer.service';

@Component({
    selector: 'app-edit-footer',
    standalone: true,
	imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [FooterService],
    templateUrl: './edit-footer.component.html',
    styleUrls: ['./edit-footer.component.css']
})
export class EditFooterComponent implements OnInit {

    id!: string | null;
    actualFooter: any = {};
    footerIdValue!: number;
    footerNameValue!: string;
    footerContentValue!: string;

    editFooterForm = this.formBuilder.group(
        {
            name: new FormControl<string>('', { validators: Validators.required }),
            content: '',
        }
    );

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private formBuilder: FormBuilder,
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
                    this.footerContentValue = this.actualFooter.content;

                    this.editFooterForm.setValue({name: this.actualFooter.name, content: this.actualFooter.content});
                },
                error: () => { },
                complete: () => { }
            });

        this.editFooterForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.maxLength(255)
            ]),
            content: new FormControl('', [
                Validators.maxLength(300)
            ]),
        });
    }

    get nameFooter() {
        return this.editFooterForm.get('name') !;
    }

    editFooter() {
        let name = this.editFooterForm.value.name;
        let content = this.editFooterForm.value.content;
        const body = {
            name: name,
            content: content
        };

        this.footer.editFooter(this.footerIdValue, body);

        this.router.navigate(['/footer/list']);
    }

}
