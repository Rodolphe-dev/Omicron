import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    RouterLink,
    RouterLinkActive,
    Router,
    ActivatedRoute,
} from "@angular/router";
import { FormBuilder, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BreadcrumbsService } from "../../../../service/breadcrumbs/breadcrumbs.service";
import { PageService } from "../../../../service/page/page.service";
import { EditorModule } from "@tinymce/tinymce-angular";

@Component({
    selector: "omicron-nx-view-page",
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        EditorModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [PageService],
    templateUrl: "./view-page.component.html",
    styleUrls: ["./view-page.component.css"],
})
export class ViewPageComponent implements OnInit {
    id!: number | null;
    pageIdValue!: number;
    pageNameValue: string | null | undefined;
    pageRouteValue: string | null | undefined;
    pageContentValue: string | null | undefined;

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private formBuilder: FormBuilder,
        private page: PageService,
        public router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.breadcrumbs.setLevel(2);
        this.breadcrumbs.setLevelOneValue("Content");
        this.breadcrumbs.setLevelTwoValue("View Page");
        this.breadcrumbs.setLevelThreeValue("");

        this.id = <number>(<unknown>this.route.snapshot.paramMap.get("id"));

        this.page.getThisPage(this.id).subscribe({
            next: (value) => {
                this.pageIdValue = value.id;
                this.pageNameValue = value.name;
                this.pageRouteValue = value.route;
                this.pageContentValue = value.content;
            },
        });
    }
}
