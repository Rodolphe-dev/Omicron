import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { FooterService } from '../../../../service/footer/footer.service';

@Component({
    selector: 'omicron-nx-add-footer',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [FooterService],
    templateUrl: './add-footer.component.html',
    styleUrls: ['./add-footer.component.css']
})
export class AddFooterComponent implements OnInit {

    addFooterForm = this.formBuilder.group(
        {
            name: new FormControl<string>('', { validators: Validators.required }),
            content: '',
        }
    );

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private formBuilder: FormBuilder,
        private footer: FooterService,
        public router: Router
    ) { }

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue('Menus');
        this.breadcrumbs.setLevelTwoValue('Footer');
        this.breadcrumbs.setLevelThreeValue('Add Footer');

        this.addFooterForm = new FormGroup({
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
        return this.addFooterForm.get('name');
    }

    addFooter() {
        const name = this.addFooterForm.value.name;
        const content = this.addFooterForm.value.content;
        const body = {
            name: name,
            content: content
        };

        this.footer.addFooter(body);

        this.router.navigate(['/footer/list']);
    }
}
