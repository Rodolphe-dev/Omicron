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
import { SidebarService } from "../../../../service/sidebar/sidebar.service";
import { SidebarItems } from "../../../../model/sidebar";

@Component({
    selector: "omicron-nx-edit-sidebar",
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
    providers: [SidebarService],
    templateUrl: "./edit-sidebar.component.html",
    styleUrls: ["./edit-sidebar.component.css"],
})
export class EditSidebarComponent implements OnInit {
    faTrash = faTrash;
    faPencil = faPencil;
    id!: number | null;
    sidebarIdValue!: number;
    sidebarNameValue: string | null | undefined;
    sidebarStatus: boolean | null | undefined;
    items: SidebarItems[] = [];
    itemId = 0;
    @ViewChild("sidebarName") _sidebarName!: ElementRef;
    @ViewChild("addItemBlock") addItemBlock!: ElementRef;
    @ViewChild("editItemBlock") editItemBlock!: ElementRef;
    @ViewChild("addParentItemBlock") addParentItemBlock!: ElementRef;
    @ViewChild("editParentItemBlock") editParentItemBlock!: ElementRef;
    @ViewChild("addSubParentItemBlock") addSubParentItemBlock!: ElementRef;
    @ViewChild("editSubParentItemBlock") editSubParentItemBlock!: ElementRef;

    addSidebarFormGroup = this.formBuilder.group({
        sidebarName: new FormControl<string>("", {
            validators: Validators.required,
        }),
    });

    addItemForm = this.formBuilder.group({
        parent: "",
        subParent: "",
        name: new FormControl<string>("", { validators: Validators.required }),
        url: new FormControl<string>("", { validators: Validators.required }),
    });

    editItemForm = this.formBuilder.group({
        parent: "",
        subParent: "",
        name: new FormControl<string>("", { validators: Validators.required }),
        url: new FormControl<string>("", { validators: Validators.required }),
    });

    addParentForm = this.formBuilder.group({
        name: new FormControl<string>("", { validators: Validators.required }),
    });

    editParentForm = this.formBuilder.group({
        name: new FormControl<string>("", { validators: Validators.required }),
    });

    addSubParentForm = this.formBuilder.group({
        parent: "",
        name: new FormControl<string>("", { validators: Validators.required }),
    });

    editSubParentForm = this.formBuilder.group({
        parent: "",
        name: new FormControl<string>("", { validators: Validators.required }),
    });

    editItemId!: number;
    editParentItemName: string | null | undefined;
    editSubParentItemName: string | null | undefined;
    editItemName: string | null | undefined;
    editItemUrl: string | null | undefined;
    editParentItemId!: number;
    editParentName: string | null | undefined;
    editSubParentItemId!: number;
    editSubParentNameFirst: string | null | undefined;
    editSubParentName: string | null | undefined;
    parent: string | null | undefined;

    constructor(
        private breadcrumbs: BreadcrumbsService,
        private formBuilder: FormBuilder,
        private sidebar: SidebarService,
        public router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue("Menus");
        this.breadcrumbs.setLevelTwoValue("Sidebar");
        this.breadcrumbs.setLevelThreeValue("Edit Sidebar");

        this.id = <number>(<unknown>this.route.snapshot.paramMap.get("id"));

        this.sidebar.getThisSidebar(this.id).subscribe({
            next: (value) => {
                this.sidebarIdValue = value.id;
                this.sidebarNameValue = value.name;
                this.sidebarStatus = value.status;
                this.items = value.items;

                this.addSidebarFormGroup.setValue({ sidebarName: value.name });
            },
        });

        this.addSidebarFormGroup = new FormGroup({
            sidebarName: new FormControl("", [Validators.required]),
        });

        this.addItemForm = new FormGroup({
            parent: new FormControl(""),
            subParent: new FormControl(""),
            name: new FormControl("", [Validators.required]),
            url: new FormControl("", [Validators.required]),
        });

        this.editItemForm = new FormGroup({
            parent: new FormControl(""),
            subParent: new FormControl(""),
            name: new FormControl("", [Validators.required]),
            url: new FormControl("", [Validators.required]),
        });

        this.addParentForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
        });

        this.editParentForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
        });

        this.addSubParentForm = new FormGroup({
            parent: new FormControl(""),
            name: new FormControl("", [Validators.required]),
        });

        this.editSubParentForm = new FormGroup({
            parent: new FormControl(""),
            name: new FormControl("", [Validators.required]),
        });
    }

    get sidebarNameInput() {
        return this.addSidebarFormGroup.get("sidebarNameInput");
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

    get nameParentFromSubParentItem() {
        return this.addSubParentForm.get("parent");
    }

    get nameSubParentItem() {
        return this.addSubParentForm.get("name");
    }

    get nameEditParentFromSubParentItem() {
        return this.editSubParentForm.get("parent");
    }

    get nameEditSubParentItem() {
        return this.editSubParentForm.get("name");
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

    hideSubParentItemHtml() {
        this.addSubParentItemBlock.nativeElement.classList.remove("grid");
        this.addSubParentItemBlock.nativeElement.classList.add("hidden");
    }

    hideEditSubParentItemHtml() {
        this.editSubParentItemBlock.nativeElement.classList.remove("grid");
        this.editSubParentItemBlock.nativeElement.classList.add("hidden");
    }

    toggleSidebar(id: number) {
        this.sidebar.toggleSidebarStatus(id).subscribe((value) => {
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
        this.hideSubParentItemHtml();
        this.hideEditSubParentItemHtml();
    }

    showEditItemHtml(item: SidebarItems) {
        this.hideItemHtml();
        this.hideParentItemHtml();
        this.hideEditParentItemHtml();
        this.hideSubParentItemHtml();
        this.hideEditSubParentItemHtml();

        this.editItemBlock.nativeElement.classList.remove("hidden");
        this.editItemBlock.nativeElement.classList.add("grid");

        this.editParentItemName = item.parentName;
        this.editSubParentItemName = item.subParentName;
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
        this.hideSubParentItemHtml();
        this.hideEditSubParentItemHtml();
    }

    showEditParentItemHtml(item: SidebarItems) {
        this.hideItemHtml();
        this.hideParentItemHtml();
        this.hideEditParentItemHtml();
        this.hideSubParentItemHtml();
        this.hideEditSubParentItemHtml();

        this.editParentItemBlock.nativeElement.classList.remove("hidden");
        this.editParentItemBlock.nativeElement.classList.add("grid");

        this.editParentName = item.parentName;
        this.editParentItemId = item.id;
    }

    showSubParentItemHtml() {
        this.addSubParentItemBlock.nativeElement.classList.remove("hidden");
        this.addSubParentItemBlock.nativeElement.classList.add("grid");

        this.hideItemHtml();
        this.hideEditItemHtml();
        this.hideEditParentItemHtml();
        this.hideParentItemHtml();
        this.hideEditSubParentItemHtml();
    }

    showEditSubParentItemHtml(item: SidebarItems) {
        this.hideItemHtml();
        this.hideEditItemHtml();
        this.hideEditParentItemHtml();
        this.hideParentItemHtml();
        this.hideSubParentItemHtml();

        this.editSubParentItemBlock.nativeElement.classList.remove("hidden");
        this.editSubParentItemBlock.nativeElement.classList.add("grid");

        this.editSubParentNameFirst = item.parentName;
        this.editSubParentName = item.subParentName;
        this.editParentItemId = item.id;
    }

    addItem() {
        this.itemId++;

        const itemParent = false;
        const itemSubParent = false;
        const itemName = this.addItemForm.value.name;
        const itemUrl = this.addItemForm.value.url;

        // Item child from parent
        if (
            this.addItemForm.value.parent != "" &&
            this.addItemForm.value.subParent === ""
        ) {
            const itemParentName = this.addItemForm.value.parent;
            const itemSubParentName = this.addItemForm.value.subParent;
            const inParent = true;
            const inSubParent = false;
            const children = {
                id: this.itemId,
                parent: itemParent,
                subParent: itemSubParent,
                parentName: itemParentName,
                subParentName: itemSubParentName,
                name: itemName,
                status: undefined,
                url: itemUrl,
                inParent: inParent,
                inSubParent: inSubParent,
                children: [],
            };

            this.items.forEach((item) => {
                if (item.name == itemParentName) {
                    item.children.push(children);
                }
            });

            // Item from sub parent
        } else if (this.addItemForm.value.subParent != "") {
            const itemParentName = this.addItemForm.value.parent;
            const itemSubParentName = this.addItemForm.value.subParent;
            const inParent = false;
            const inSubParent = true;
            const children = {
                id: this.itemId,
                parent: itemParent,
                subParent: itemSubParent,
                parentName: itemParentName,
                subParentName: itemSubParentName,
                name: itemName,
                status: undefined,
                url: itemUrl,
                inParent: inParent,
                inSubParent: inSubParent,
                children: [],
            };

            this.items.forEach((item) => {
                item.children.forEach((itemChildrenParent) => {
                    itemChildrenParent.children.push(children);
                });
            });

            // Item normal
        } else {
            const inParent = false;
            const inSubParent = false;

            this.items.push({
                id: this.itemId,
                parent: itemParent,
                subParent: itemSubParent,
                name: itemName,
                url: itemUrl,
                inParent: inParent,
                inSubParent: inSubParent,
                children: [],
            });
        }

        this.addItemBlock.nativeElement.classList.remove("grid");
        this.addItemBlock.nativeElement.classList.add("hidden");
    }

    editItem(itemId: number) {
        const itemParentName = this.editItemForm.value.parent;
        const itemSubParentName = this.editItemForm.value.subParent;
        const itemName = this.editItemForm.value.name;
        const itemUrl = this.editItemForm.value.url;

        this.items.forEach((item) => {
            if (item.id == itemId) {
                item.parentName = itemParentName;
                item.subParentName = itemSubParentName;
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
        const itemSubParent = false;
        const itemParentName = this.addParentForm.value.name;
        const itemName = this.addParentForm.value.name;
        const itemUrl = "";
        const inParent = false;
        const inSubParent = false;

        this.items.push({
            id: this.itemId,
            parent: itemParent,
            subParent: itemSubParent,
            parentName: itemParentName,
            name: itemName,
            url: itemUrl,
            inParent: inParent,
            inSubParent: inSubParent,
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

    addSubParentItem() {
        this.itemId++;

        const itemParent = false;
        const itemSubParent = true;
        const itemParentName = this.addSubParentForm.value.parent;
        const itemSubParentName = this.addSubParentForm.value.name;
        const itemName = this.addSubParentForm.value.name;
        const itemUrl = "";
        const inParent = true;
        const inSubParent = true;
        const children = {
            id: this.itemId,
            parent: itemParent,
            subParent: itemSubParent,
            parentName: itemParentName,
            subParentName: itemSubParentName,
            name: itemName,
            status: undefined,
            url: itemUrl,
            inParent: inParent,
            inSubParent: inSubParent,
            children: [],
        };

        this.items.forEach((item) => {
            if (item.name == itemParentName) {
                item.children.push(children);
            }
        });

        this.addSubParentItemBlock.nativeElement.classList.remove("grid");
        this.addSubParentItemBlock.nativeElement.classList.add("hidden");
    }

    editSubParentItem(editParentItemId: number) {
        const itemName = this.editSubParentForm.value.name;
        const itemParentName = this.editSubParentForm.value.parent;

        this.items.forEach((item) => {
            if (item.id == editParentItemId) {
                item.parentName = itemParentName;
                item.name = itemName;
            }
        });

        this.editSubParentItemBlock.nativeElement.classList.remove("grid");
        this.editSubParentItemBlock.nativeElement.classList.add("hidden");
    }

    deleteItem(value: number) {
        this.items.forEach((item, index) => {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dropSubChild(event: CdkDragDrop<any[]>, itemParent: any) {
        this.items.forEach((item) => {
            if (item.id === itemParent.id) {
                item.children.forEach((itemChildrenParent) => {
                    moveItemInArray(
                        itemChildrenParent.children,
                        event.previousIndex,
                        event.currentIndex
                    );
                });
            }
        });
    }

    editSidebarForm() {
        const sidebarName = this._sidebarName.nativeElement.value;
        const body = {
            name: sidebarName,
            items: [this.items],
        };

        this.sidebar.editSidebar(this.sidebarIdValue, body);

        this.router.navigate(["/sidebar/list"]);
    }
}
