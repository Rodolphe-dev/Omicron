import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    CdkDragDrop,
    CdkDropList,
    CdkDrag,
    moveItemInArray,
} from "@angular/cdk/drag-drop";
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
    Validators,
    FormControl,
    FormGroup,
} from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { BreadcrumbsService } from "../../../../service/breadcrumbs/breadcrumbs.service";
import { NavbarService } from "../../../../service/navbar/navbar.service";
import { NavbarItems } from "../../../../model/navbar";
import { SettingService } from "../../../../service/setting/setting.service";

@Component({
    selector: "omicron-nx-edit-add-navbar",
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        CdkDropList,
        CdkDrag,
    ],
    providers: [NavbarService, SettingService],
    templateUrl: "./edit-navbar.component.html",
    styleUrls: ["./edit-navbar.component.css"],
})
export class EditNavbarComponent implements OnInit {
    faTrash = faTrash;
    faPencil = faPencil;

    id!: number | null;
    navbarIdValue!: number;
    navbarNameValue: string | null | undefined;
    navbarStatus: boolean | null | undefined;
    appName: string | null | undefined;
    items: NavbarItems[] = [];
    itemId = 0;
    website!: string;

    @ViewChild("navbarName") _navbarName!: ElementRef;
    @ViewChild("addItemBlock") addItemBlock!: ElementRef;
    @ViewChild("editItemBlock") editItemBlock!: ElementRef;
    @ViewChild("addParentItemBlock") addParentItemBlock!: ElementRef;
    @ViewChild("editParentItemBlock") editParentItemBlock!: ElementRef;

    editNavbarFormGroup = this.formBuilder.group({
        navbarName: new FormControl<string>("", {
            validators: Validators.required,
        }),
    });

    addItemForm = this.formBuilder.group({
        parent: "",
        name: new FormControl<string>("", { validators: Validators.required }),
        url: new FormControl<string>("", { validators: Validators.required }),
    });

    editItemForm = this.formBuilder.group({
        parent: "",
        name: new FormControl<string>("", { validators: Validators.required }),
        url: new FormControl<string>("", { validators: Validators.required }),
    });

    addParentForm = this.formBuilder.group({
        name: new FormControl<string>("", { validators: Validators.required }),
    });

    editParentForm = this.formBuilder.group({
        name: new FormControl<string>("", { validators: Validators.required }),
    });

    editItemId!: number;
    editParentItemName: string | null | undefined;
    editItemName: string | null | undefined;
    editItemUrl: string | null | undefined;

    editParentItemId!: number;
    editParentName: string | null | undefined;

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private formBuilder: FormBuilder,
        private navbar: NavbarService,
        private setting: SettingService,
        public router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue("Menus");
        this.breadcrumbs.setLevelTwoValue("Navbar");
        this.breadcrumbs.setLevelThreeValue("Edit Navbar");

        this.setting.getThisSetting(1).subscribe({
            next: (value) => {
                this.website = value.nameApp;
            },
        });

        this.id = <number>(<unknown>this.route.snapshot.paramMap.get("id"));

        this.navbar.getThisNavbar(this.id).subscribe({
            next: (value) => {
                this.navbarIdValue = value.id;
                this.navbarNameValue = value.name;
                this.navbarStatus = value.status;
                this.items = value.items;

                this.editNavbarFormGroup.setValue({ navbarName: value.name });
            },
        });

        this.editNavbarFormGroup = new FormGroup({
            navbarName: new FormControl("", [Validators.required]),
        });

        this.addItemForm = new FormGroup({
            parent: new FormControl(""),
            name: new FormControl("", [Validators.required]),
            url: new FormControl("", [Validators.required]),
        });

        this.editItemForm = new FormGroup({
            parent: new FormControl(""),
            name: new FormControl("", [Validators.required]),
            url: new FormControl("", [Validators.required]),
        });

        this.addParentForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
        });

        this.editParentForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
        });
    }

    get navbarNameInput() {
        return this.editNavbarFormGroup.get("navbarName");
    }

    get nameItem() {
        return this.addItemForm.get("name");
    }

    get urlItem() {
        return this.addItemForm.get("url");
    }

    get nameEditItem() {
        return this.editItemForm.get("name");
    }

    get urlEditItem() {
        return this.editItemForm.get("url");
    }

    get nameParentItem() {
        return this.addParentForm.get("name");
    }

    get nameEditParentItem() {
        return this.editParentForm.get("name");
    }

    hideItemHtml() {
        this.addItemBlock.nativeElement.classList.remove("grid");
        this.addItemBlock.nativeElement.classList.add("hidden");
    }

    hideEditItemHtml() {
        this.editItemBlock.nativeElement.classList.remove("grid");
        this.editItemBlock.nativeElement.classList.add("hidden");
    }

    hideParentItemHtml() {
        this.addParentItemBlock.nativeElement.classList.remove("grid");
        this.addParentItemBlock.nativeElement.classList.add("hidden");
    }

    hideEditParentItemHtml() {
        this.editParentItemBlock.nativeElement.classList.remove("grid");
        this.editParentItemBlock.nativeElement.classList.add("hidden");
    }

    toggleNavbar(id: number) {
        this.navbar.toggleNavbarStatus(id).subscribe((value) => {
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

    showItemHtml() {
        this.addItemBlock.nativeElement.classList.remove("hidden");
        this.addItemBlock.nativeElement.classList.add("grid");

        this.hideEditItemHtml();
        this.hideParentItemHtml();
        this.hideEditParentItemHtml();
    }

    showEditItemHtml(item: NavbarItems) {
        this.editItemBlock.nativeElement.classList.remove("hidden");
        this.editItemBlock.nativeElement.classList.add("grid");

        this.hideItemHtml();
        this.hideParentItemHtml();
        this.hideEditParentItemHtml();

        this.editParentItemName = item.parentName;
        this.editItemName = item.name;
        this.editItemUrl = item.url;
        this.editItemId = item.id;
    }

    showParentItemHtml() {
        this.addParentItemBlock.nativeElement.classList.remove("hidden");
        this.addParentItemBlock.nativeElement.classList.add("grid");

        this.hideItemHtml();
        this.hideEditItemHtml();
        this.hideEditParentItemHtml();
    }

    showEditParentItemHtml(item: NavbarItems) {
        this.editParentItemBlock.nativeElement.classList.remove("hidden");
        this.editParentItemBlock.nativeElement.classList.add("grid");

        this.hideItemHtml();
        this.hideEditItemHtml();
        this.hideParentItemHtml();

        this.editParentName = item.parentName;
        this.editParentItemId = item.id;
    }

    addItem() {
        this.itemId++;

        const itemParent = false;
        const itemName = this.addItemForm.value.name;
        const itemUrl = this.addItemForm.value.url;

        if (this.addItemForm.value.parent != "") {
            const itemParentName = this.addItemForm.value.parent;
            const inParent = true;
            const children = {
                id: this.itemId,
                parent: itemParent,
                parentName: itemParentName,
                name: itemName,
                url: itemUrl,
                inParent: inParent,
                children: [],
            };

            this.items.forEach((item) => {
                if (item.name == itemParentName) {
                    item.children.push(children);
                }
            });
        } else {
            const inParent = false;

            this.items.push({
                id: this.itemId,
                parent: itemParent,
                parentName: "",
                name: itemName,
                url: itemUrl,
                inParent: inParent,
                children: [],
            });
        }

        this.addItemBlock.nativeElement.classList.remove("grid");
        this.addItemBlock.nativeElement.classList.add("hidden");
    }

    editItem(itemId: number) {
        const itemParentName = this.editItemForm.value.parent;
        const itemName = this.editItemForm.value.name;
        const itemUrl = this.editItemForm.value.url;

        this.items.forEach((item) => {
            if (item.id == itemId) {
                item.parentName = itemParentName;
                item.name = itemName;
                item.url = itemUrl;
            }
        });

        this.editItemBlock.nativeElement.classList.remove("grid");
        this.editItemBlock.nativeElement.classList.add("hidden");
    }

    addParentItem() {
        this.itemId++;

        const itemParent = true;
        const itemParentName = this.addParentForm.value.name;
        const itemName = this.addParentForm.value.name;
        const itemUrl = "";
        const inParent = false;

        this.items.push({
            id: this.itemId,
            parent: itemParent,
            parentName: itemParentName,
            name: itemName,
            url: itemUrl,
            inParent: inParent,
            children: [],
        });

        this.addParentItemBlock.nativeElement.classList.remove("grid");
        this.addParentItemBlock.nativeElement.classList.add("hidden");
    }

    editParentItem(editParentItemId: number) {
        const itemName = this.editParentForm.value.name;

        this.items.forEach((item) => {
            if (item.id == editParentItemId) {
                item.name = itemName;
            }
        });

        this.editParentItemBlock.nativeElement.classList.remove("grid");
        this.editParentItemBlock.nativeElement.classList.add("hidden");
    }

    deleteItem(value: number) {
        this.items.forEach((item: { id: number }, index: number) => {
            if (item.id == value) this.items.splice(index, 1);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    drop(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dropChild(event: CdkDragDrop<any[]>, itemParent: any) {
        this.items.forEach((item) => {
            if (item.id === itemParent.id) {
                moveItemInArray(
                    item.children,
                    event.previousIndex,
                    event.currentIndex
                );
            }
        });
    }

    editNavbarForm() {
        const navbarName = this._navbarName.nativeElement.value;
        const body = {
            name: navbarName,
            items: [this.items],
        };

        this.navbar.editNavbar(this.navbarIdValue, body);

        this.router.navigate(["/navbar/list"]);
    }
}
