import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { SidebarService } from '../../../../service/sidebar/sidebar.service';
import { ISidebar } from '../../../../model/sidebar';

@Component({
    selector: 'app-add-sidebar',
    standalone: true,
	imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule, 
        CdkDropList,
        CdkDrag
    ],
    providers: [SidebarService],
    templateUrl: './add-sidebar.component.html',
    styleUrls: ['./add-sidebar.component.css']
})
export class AddSidebarComponent implements OnInit {

	faTrash = faTrash;
	faPencil = faPencil;

    @ViewChild('sidebarName') _sidebarName!: ElementRef;
    @ViewChild('addItemBlock') addItemBlock!: ElementRef;
    @ViewChild('editItemBlock') editItemBlock!: ElementRef;
    @ViewChild('addParentItemBlock') addParentItemBlock!: ElementRef;
    @ViewChild('editParentItemBlock') editParentItemBlock!: ElementRef;
    @ViewChild('addSubParentItemBlock') addSubParentItemBlock!: ElementRef;
    @ViewChild('editSubParentItemBlock') editSubParentItemBlock!: ElementRef;

    itemId : number = 0;

    items : ISidebar[] = [];

    addSidebarFormGroup = this.formBuilder.group(
        {
            sidebarNameInput: new FormControl<string>('', { validators: Validators.required })
        }
    );

    addItemForm = this.formBuilder.group(
        {
            parent: '',
            subParent: '',
            name: new FormControl<string>('', { validators: Validators.required }),
            url: new FormControl<string>('', { validators: Validators.required }),
        }
    );

    editItemForm = this.formBuilder.group(
        {
            parent: '',
            subParent: '',
            name: new FormControl<string>('', { validators: Validators.required }),
            url: new FormControl<string>('', { validators: Validators.required }),
        }
    );

    addParentForm = this.formBuilder.group(
        {
            name: new FormControl<string>('', { validators: Validators.required }),
        }
    );

    editParentForm = this.formBuilder.group(
        {
            name: new FormControl<string>('', { validators: Validators.required }),
        }
    );

    addSubParentForm = this.formBuilder.group(
        {
            parent: '',
            name: new FormControl<string>('', { validators: Validators.required }),
        }
    );

    editSubParentForm = this.formBuilder.group(
        {
            parent: '',
            name: new FormControl<string>('', { validators: Validators.required }),
        }
    );

    editItemId!: number;
    editParentItemName: string | undefined;
    editSubParentItemName: string | undefined;
    editItemName: string | undefined;
    editItemUrl: string | undefined;

    editParentItemId!: number;
    editParentName: string | undefined;

    editSubParentItemId!: number;
    editSubParentNameFirst: string | undefined;
    editSubParentName: string | undefined;

    parent : string | null | undefined;

    constructor(
        private breadcrumbs : BreadcrumbsService,
        private formBuilder: FormBuilder,
        private sidebar : SidebarService,
        public router : Router
        ) { }

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue('Menus');
        this.breadcrumbs.setLevelTwoValue('Sidebar');
        this.breadcrumbs.setLevelThreeValue('Add Sidebar');

        this.addSidebarFormGroup = new FormGroup({
            sidebarNameInput: new FormControl('', [
                Validators.required,
                Validators.maxLength(25)
            ]),
        });

        this.addItemForm = new FormGroup({
            parent: new FormControl(''),
            subParent: new FormControl(''),
            name: new FormControl('', [
                Validators.required
            ]),
            url: new FormControl('', [
                Validators.required
            ]),
        });

        this.editItemForm = new FormGroup({
            parent: new FormControl(''),
            subParent: new FormControl(''),
            name: new FormControl('', [
                Validators.required
            ]),
            url: new FormControl('', [
                Validators.required
            ]),
        });

        this.addParentForm = new FormGroup({
            name: new FormControl('', [
                Validators.required
            ])
        });

        this.editParentForm = new FormGroup({
            name: new FormControl('', [
                Validators.required
            ])
        });

        this.addSubParentForm = new FormGroup({
            parent: new FormControl(''),
            name: new FormControl('', [
                Validators.required
            ])
        });

        this.editSubParentForm = new FormGroup({
            parent: new FormControl(''),
            name: new FormControl('', [
                Validators.required
            ])
        });
    }

    get sidebarNameInput() {
        return this.addSidebarFormGroup.get('sidebarNameInput') !;
    }

    get nameItem() {
        return this.addItemForm.get('name') !;
    }

    get urlItem() {
        return this.addItemForm.get('url') !;
    }

    get nameEditItem() {
        return this.editItemForm.get('name') !;
    }

    get urlEditItem() {
        return this.editItemForm.get('url') !;
    }

    get nameParentItem() {
        return this.addParentForm.get('name') !;
    }

    get nameEditParentItem() {
        return this.editParentForm.get('name') !;
    }

    get nameParentFromSubParentItem() {
        return this.addSubParentForm.get('parent') !;
    }

    get nameSubParentItem() {
        return this.addSubParentForm.get('name') !;
    }

    get nameEditParentFromSubParentItem() {
        return this.editSubParentForm.get('parent') !;
    }

    get nameEditSubParentItem() {
        return this.editSubParentForm.get('name') !;
    }

    hideItemHtml(){
        this.addItemBlock.nativeElement.classList.remove('grid');
        this.addItemBlock.nativeElement.classList.add('hidden');
    }

    hideEditItemHtml(){
        this.editItemBlock.nativeElement.classList.remove('grid');
        this.editItemBlock.nativeElement.classList.add('hidden');
    }

    hideParentItemHtml(){
        this.addParentItemBlock.nativeElement.classList.remove('grid');
        this.addParentItemBlock.nativeElement.classList.add('hidden');
    }

    hideEditParentItemHtml(){
        this.editParentItemBlock.nativeElement.classList.remove('grid');
        this.editParentItemBlock.nativeElement.classList.add('hidden');
    }

    hideSubParentItemHtml(){
        this.addSubParentItemBlock.nativeElement.classList.remove('grid');
        this.addSubParentItemBlock.nativeElement.classList.add('hidden');
    }

    hideEditSubParentItemHtml(){
        this.editSubParentItemBlock.nativeElement.classList.remove('grid');
        this.editSubParentItemBlock.nativeElement.classList.add('hidden');
    }

    showItemHtml(){
        this.addItemBlock.nativeElement.classList.remove('hidden');
        this.addItemBlock.nativeElement.classList.add('grid');
        
        this.hideEditItemHtml();
        this.hideParentItemHtml();
        this.hideEditParentItemHtml();
        this.hideSubParentItemHtml();
        this.hideEditSubParentItemHtml();
    }

    showEditItemHtml(item: any){
        this.hideItemHtml();
        this.hideParentItemHtml();
        this.hideEditParentItemHtml();
        this.hideSubParentItemHtml();
        this.hideEditSubParentItemHtml();
        
        this.editItemBlock.nativeElement.classList.remove('hidden');
        this.editItemBlock.nativeElement.classList.add('grid');

        this.editParentItemName = item.parentName;
        this.editSubParentItemName = item.subParentName;
        this.editItemName = item.name;
        this.editItemUrl = item.url;
        this.editItemId = item.id;
    }

    showParentItemHtml(){
        this.addParentItemBlock.nativeElement.classList.remove('hidden');
        this.addParentItemBlock.nativeElement.classList.add('grid');

        this.hideItemHtml();
        this.hideEditItemHtml();
        this.hideEditParentItemHtml();
        this.hideSubParentItemHtml();
        this.hideEditSubParentItemHtml();
    }

    showEditParentItemHtml(item: any){
        this.hideItemHtml();
        this.hideParentItemHtml();
        this.hideEditParentItemHtml();
        this.hideSubParentItemHtml();
        this.hideEditSubParentItemHtml();
        
        this.editParentItemBlock.nativeElement.classList.remove('hidden');
        this.editParentItemBlock.nativeElement.classList.add('grid');

        this.editParentName = item.parentName;
        this.editParentItemId = item.id;
    }

    showSubParentItemHtml(){
        this.addSubParentItemBlock.nativeElement.classList.remove('hidden');
        this.addSubParentItemBlock.nativeElement.classList.add('grid');
        
        this.hideItemHtml();
        this.hideEditItemHtml();
        this.hideEditParentItemHtml();
        this.hideParentItemHtml();
        this.hideEditSubParentItemHtml();
    }

    showEditSubParentItemHtml(item: any){
        this.hideItemHtml();
        this.hideEditItemHtml();
        this.hideEditParentItemHtml();
        this.hideParentItemHtml();
        this.hideSubParentItemHtml();
        
        this.editSubParentItemBlock.nativeElement.classList.remove('hidden');
        this.editSubParentItemBlock.nativeElement.classList.add('grid');

        this.editSubParentNameFirst = item.parentName;
        this.editSubParentName = item.subParentName;
        this.editParentItemId = item.id;
    }

    addItem(){
        this.itemId++;

        let itemParent = false;
        let itemSubParent = false;
        let itemName = this.addItemForm.value.name;
        let itemUrl = this.addItemForm.value.url;

        // Item child from parent
        if(this.addItemForm.value.parent != '' && this.addItemForm.value.subParent === ''){
            let itemParentName = this.addItemForm.value.parent;
            let itemSubParentName = this.addItemForm.value.subParent;
            let inParent = true;
            let inSubParent = false;
            let children = {
                id: this.itemId, 
                parent: itemParent, 
                subParent: itemSubParent, 
                parentName: itemParentName, 
                subParentName: itemSubParentName, 
                name: itemName, 
                url: itemUrl,
                inParent: inParent,
                inSubParent: inSubParent,
                children: []
            };

            this.items.forEach(item=>{
                if(item.name==itemParentName){
                    item.children.push(children);
                }
            });

        // Item from sub parent
        }else if(this.addItemForm.value.subParent != ''){
            let itemParentName = this.addItemForm.value.parent;
            let itemSubParentName = this.addItemForm.value.subParent;
            let inParent = false;
            let inSubParent = true;
            let children = {
                id: this.itemId, 
                parent: itemParent, 
                subParent: itemSubParent, 
                parentName: itemParentName, 
                subParentName: itemSubParentName, 
                name: itemName, 
                url: itemUrl,
                inParent: inParent,
                inSubParent: inSubParent,
                children: []
            };

            this.items.forEach(item=>{
                    item.children.forEach(itemChildrenParent=>{
                        itemChildrenParent.children.push(children);
                    });
            });

        // Item normal
        }else{
            let inParent = false;
            let inSubParent = false;

            this.items.push(
                {
                    id: this.itemId, 
                    parent: itemParent, 
                    subParent: itemSubParent, 
                    name: itemName, 
                    url: itemUrl,
                    inParent: inParent,
                    inSubParent: inSubParent,
                    children: []
                }
            );
        }

        this.addItemBlock.nativeElement.classList.remove('grid');
        this.addItemBlock.nativeElement.classList.add('hidden');
    }

    editItem(itemId : number){
        let itemParentName = this.editItemForm.value.parent;
        let itemSubParentName = this.editItemForm.value.subParent;
        let itemName = this.editItemForm.value.name;
        let itemUrl = this.editItemForm.value.url;

        this.items.forEach(item=>{
            if(item.id==itemId){
                item.parentName = itemParentName;
                item.subParentName = itemSubParentName;
                item.name = itemName;
                item.url = itemUrl;
            }
        });

        this.editItemBlock.nativeElement.classList.remove('grid');
        this.editItemBlock.nativeElement.classList.add('hidden');
    }

    addParentItem(){
        this.itemId++;
        
        let itemParent = true;
        let itemSubParent = false;
        let itemParentName = this.addParentForm.value.name;
        let itemName = this.addParentForm.value.name;
        let itemUrl = '';
        let inParent = false;
        let inSubParent = false;

        this.items.push(
            {
                id: this.itemId, 
                parent: itemParent, 
                subParent: itemSubParent, 
                parentName: itemParentName, 
                name: itemName, 
                url: itemUrl,
                inParent: inParent,
                inSubParent: inSubParent,
                children: []
            }
        );

        this.addParentItemBlock.nativeElement.classList.remove('grid');
        this.addParentItemBlock.nativeElement.classList.add('hidden');
    }

    editParentItem(editParentItemId : number){
        let itemName = this.editParentForm.value.name;

        this.items.forEach( item =>
            {
                if(item.id==editParentItemId){
                    item.name = itemName;
                }
            }
        );

        this.editParentItemBlock.nativeElement.classList.remove('grid');
        this.editParentItemBlock.nativeElement.classList.add('hidden');
    }

    addSubParentItem(){
        this.itemId++;
        
        let itemParent = false;
        let itemSubParent = true;
        let itemParentName = this.addSubParentForm.value.parent;
        let itemSubParentName = this.addSubParentForm.value.name;
        let itemName = this.addSubParentForm.value.name;
        let itemUrl = '';
        let inParent = true;
        let inSubParent = true;
        let children = {
            id: this.itemId, 
            parent: itemParent, 
            subParent: itemSubParent, 
            parentName: itemParentName, 
            subParentName: itemSubParentName, 
            name: itemName, 
            url: itemUrl,
            inParent: inParent,
            inSubParent: inSubParent,
            children: []
        };

        this.items.forEach(item=>{
            if(item.name==itemParentName){
                item.children.push(children);
            }
        });

        this.addSubParentItemBlock.nativeElement.classList.remove('grid');
        this.addSubParentItemBlock.nativeElement.classList.add('hidden');
    }

    editSubParentItem(editParentItemId : number){
        let itemName = this.editSubParentForm.value.name;
        let itemParentName = this.editSubParentForm.value.parent;

        this.items.forEach( item =>
            {
                if(item.id==editParentItemId){
                    item.parentName = itemParentName;
                    item.name = itemName;
                }
            }
        );

        this.editSubParentItemBlock.nativeElement.classList.remove('grid');
        this.editSubParentItemBlock.nativeElement.classList.add('hidden');
    }
    
    deleteItem(value: number){
        this.items.forEach( (item,index) =>
            {
                if(item.id==value) this.items.splice(index,1);
            }
        );
    }

    drop(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    }
    
    dropChild(event: CdkDragDrop<any[]>, itemParent : any) {
        
        this.items.forEach(item=>{
            if(item.id === itemParent.id){
                moveItemInArray(item.children, event.previousIndex, event.currentIndex);
            }
        });
    }
    
    dropSubChild(event: CdkDragDrop<any[]>, itemParent : any) {
        
        this.items.forEach(item=>{
            if(item.id === itemParent.id){
                
                item.children.forEach(itemChildrenParent=>{
                    moveItemInArray(itemChildrenParent.children, event.previousIndex, event.currentIndex);
                });
            }
        });
    }

    addSidebarForm(){
        let sidebarName = this._sidebarName.nativeElement.value;
        const body = {
            name: sidebarName,
            items : [ this.items ]
        };

        this.sidebar.addSidebar(body);

        this.router.navigate(['/sidebar/list']);
    }

}
