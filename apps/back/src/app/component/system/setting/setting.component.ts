import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { BreadcrumbsService } from '../../../service/breadcrumbs/breadcrumbs.service';
import { SettingService } from '../../../service/setting/setting.service';

@Component({
    selector: 'omicron-nx-setting',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        SettingService
    ],
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

    actualSetting: any = {};
    appName!: string;
    maintenanceStatus!: boolean;

    settingForm = this.formBuilder.group(
        {
            appName: new FormControl<string>('', { validators: Validators.required }),
            maintenanceStatus: ''
        }
    );

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private formBuilder: FormBuilder,
        private setting: SettingService,
        public router: Router
    ) { }

    ngOnInit() {
        this.breadcrumbs.setLevel(2);
        this.breadcrumbs.setLevelOneValue('Content');
        this.breadcrumbs.setLevelTwoValue('Add Page');
        this.breadcrumbs.setLevelThreeValue('');

        this.setting.getThisSetting(1)
            .subscribe({
                next: value => {
                    this.actualSetting = value;
                    this.appName = this.actualSetting.nameApp;
                    this.maintenanceStatus = this.actualSetting.statusMaintenance;

                    this.settingForm.setValue({ appName: this.actualSetting.nameApp, maintenanceStatus: this.actualSetting.statusMaintenance });
                },
                error: () => { },
                complete: () => { }
            });

        this.settingForm = new FormGroup({
            appName: new FormControl('', [
                Validators.required,
                Validators.maxLength(25)
            ]),
            maintenanceStatus: new FormControl('')
        });
    }

    get nameApp() {
        return this.settingForm.get('appName')!;
    }

    editSettingForm() {
        let settingNameWebsite = this.settingForm.value.appName;
        let settingMaintenance = this.settingForm.value.maintenanceStatus;
        const body = {
            nameApp: settingNameWebsite,
            statusMaintenance: settingMaintenance
        };

        this.setting.editSetting(1, body);
    }

}
