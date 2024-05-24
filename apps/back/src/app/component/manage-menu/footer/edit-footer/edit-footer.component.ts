import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    RouterLink,
    RouterLinkActive,
    Router,
    ActivatedRoute,
} from "@angular/router";
import {
    FormBuilder,
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
} from "@angular/forms";
import { BreadcrumbsService } from "../../../../service/breadcrumbs/breadcrumbs.service";
import { FooterService } from "../../../../service/footer/footer.service";

@Component({
    selector: "omicron-nx-edit-footer",
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [FooterService],
    templateUrl: "./edit-footer.component.html",
    styleUrls: ["./edit-footer.component.css"],
})
export class EditFooterComponent implements OnInit {
    id!: number | null;
    footerIdValue!: number;
    footerNameValue: string | null | undefined;
    footerStatus: boolean | null | undefined;
    footerContentValue: string | null | undefined;

    editFooterForm = this.formBuilder.group({
        name: new FormControl<string | null | undefined>("", {
            validators: Validators.required,
        }),
        content: new FormControl<string | null | undefined>(""),
    });

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private formBuilder: FormBuilder,
        private footer: FooterService,
        public router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue("Menus");
        this.breadcrumbs.setLevelTwoValue("Footer");
        this.breadcrumbs.setLevelThreeValue("Edit Footer");

        this.id = <number>(<unknown>this.route.snapshot.paramMap.get("id"));

        this.footer.getThisFooter(this.id).subscribe({
            next: (value) => {
                this.footerIdValue = value.id;
                this.footerNameValue = value.name;
                this.footerStatus = value.status;
                this.footerContentValue = value.content;

                this.editFooterForm.setValue({
                    name: value.name,
                    content: value.content,
                });
            },
        });

        this.editFooterForm = new FormGroup({
            name: new FormControl<string | null | undefined>("", [
                Validators.required,
                Validators.maxLength(255),
            ]),
            content: new FormControl<string | null | undefined>("", [
                Validators.maxLength(300),
            ]),
        });
    }

    get nameFooter() {
        return this.editFooterForm.get("name");
    }

    editFooter() {
        const name = this.editFooterForm.value.name;
        const content = this.editFooterForm.value.content;
        const body = {
            name: name,
            content: content,
        };

        this.footer.editFooter(this.footerIdValue, body);

        this.router.navigate(["/footer/list"]);
    }

    toggleFooter(id: number) {
        this.footer.toggleFooterStatus(id).subscribe((value) => {
            if (value === true) {
                const status_item =
                    document.getElementById("status_item") ||
                    <HTMLElement>(<unknown>{ statuts_item: "" });
                status_item.textContent = "Enabled";
            } else {
                const status_item =
                    document.getElementById("status_item") ||
                    <HTMLElement>(<unknown>{ statuts_item: "" });
                status_item.textContent = "Disabled";
            }
        });
    }
}
