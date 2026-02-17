import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import {
    FormBuilder,
    ReactiveFormsModule,
    FormsModule,
    FormControl,
    Validators,
    FormGroup,
} from "@angular/forms";
import { BreadcrumbsService } from "../../../service/breadcrumbs/breadcrumbs.service";
import { SettingService } from "../../../service/setting/setting.service";

@Component({
    selector: "omicron-nx-setting",
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [SettingService],
    templateUrl: "./setting.component.html",
    styleUrls: ["./setting.component.css"],
})
export class SettingComponent implements OnInit {
    appName!: string;
    maintenanceStatus!: boolean;

    settingForm = this.formBuilder.group({
        appName: new FormControl<string | null | undefined>("", {
            validators: Validators.required,
        }),
        maintenanceStatus: new FormControl<boolean | null | undefined>(false),
    });

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private formBuilder: FormBuilder,
        private setting: SettingService,
        public router: Router
    ) {}

    ngOnInit() {
        this.breadcrumbs.setLevel(2);
        this.breadcrumbs.setLevelOneValue("Content");
        this.breadcrumbs.setLevelTwoValue("Add Page");
        this.breadcrumbs.setLevelThreeValue("");

        this.setting.getThisSetting(1).subscribe({
            next: (value) => {
                this.appName = value.nameApp;
                this.maintenanceStatus = value.statusMaintenance;

                this.settingForm.setValue({
                    appName: value.nameApp,
                    maintenanceStatus: value.statusMaintenance,
                });
            },
        });

        this.settingForm = new FormGroup({
            appName: new FormControl<string | null | undefined>("", [
                Validators.required,
                Validators.maxLength(25),
            ]),
            maintenanceStatus: new FormControl<boolean | null | undefined>(
                false
            ),
        });
    }

    get nameApp() {
        return this.settingForm.get("appName");
    }

    editSettingForm() {
        const settingNameWebsite = this.settingForm.value.appName;
        const settingMaintenance = this.settingForm.value.maintenanceStatus;
        const body = {
            nameApp: settingNameWebsite,
            statusMaintenance: settingMaintenance,
        };

        this.setting.editSetting(1, body);
    }
}
