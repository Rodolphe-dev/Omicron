import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { SidebarService } from '../../../../service/sidebar/sidebar.service';
import { ISidebar } from '../../../../model/sidebar';

@Component({
    selector: 'app-list-sidebar',
    standalone: true,
	imports: [
        CommonModule, 
        RouterLink, 
        RouterLinkActive,
        FormsModule
    ],
    providers: [SidebarService],
    templateUrl: './list-sidebar.component.html',
    styleUrls: ['./list-sidebar.component.css']
})
export class ListSidebarComponent implements OnInit {
    sidebars!: ISidebar[];
    totalItems!: number;
    actualPage!: string;
    numberActualPage!: number;
    firstPage!: string;
    numberFirstPage!: number;
    lastPage!: string;
    numberLastPage!: number;
    previousPage: string | undefined;
    numberPreviousPage!: number;
    nextPage: string | undefined;
    numberNextPage!: number;

    listNumberPage : number[]= [];

    checked: boolean = false;
    checkedList : any[] = [];

    constructor(
        private breadcrumbs : BreadcrumbsService,
        public router : Router,
        private sidebar : SidebarService
        ) {}

    ngOnInit()
    {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue('Menus');
        this.breadcrumbs.setLevelTwoValue('Sidebar');
        this.breadcrumbs.setLevelThreeValue('List Sidebar');

        this.sidebar.getSidebars()
            .subscribe({
                next: value => {
                    this.sidebars = value.listItem;

                    this.totalItems = value.totalItems;
                    
                    if(value.actual != undefined){
                        this.numberActualPage = value.actual.match(/\d+/g).at(0);
                    }else{
                        this.numberFirstPage = 1;
                    }

                    this.firstPage = value.first;
                    if(value.first != undefined){
                        this.numberFirstPage = value.first.match((/\d+/g)).at(0);
                    }else{
                        this.numberFirstPage = 1;
                    }
                    
                    this.lastPage = value.last;
                    if(value.last != undefined){
                        this.numberLastPage = value.last.match(/\d+/g).at(0);
                    }else{
                        this.numberLastPage = 1;
                    }

                    this.previousPage = value.previous;
                    if(value.previous != undefined){
                        this.numberPreviousPage = value.previous.match(/\d+/g).at(0);
                    }else{
                        this.numberPreviousPage = 1;
                    }
                    
                    this.nextPage = value.next;
                    if(value.next != undefined){
                        this.numberNextPage = value.next.match(/\d+/g).at(0);
                    }else{
                        this.numberNextPage = 1;
                    }

                    let offsetMin = this.numberFirstPage;
                    if(Number(this.numberNextPage)+1 > Number(this.numberLastPage)){
                        var offsetMax = Number(this.numberLastPage);
                    }else{
                        var offsetMax = Number(this.numberNextPage)+3;
                    }
                    for (let i = offsetMin; i <= offsetMax; i++) {
                        this.listNumberPage.push(i);
                    }
                },
                error: () => {},
                complete: () => {}
        });
    }

    switchPage(pageValue: string)
    {
        this.sidebar.getSidebarsByPage(pageValue)
            .subscribe({
                next: value => {
                    this.sidebars = value.listItem;

                    this.totalItems = value.totalItems;
                    this.numberActualPage = value.actual.match(/\d+/g).at(0);

                    if(value.first != undefined){
                        this.numberFirstPage = value.first.match((/\d+/g)).at(0);
                    }else{
                        this.numberFirstPage = 1;
                    }
                    
                    this.lastPage = value.last;
                    if(value.last != undefined){
                        this.numberLastPage = value.last.match(/\d+/g).at(0);
                    }else{
                        this.numberLastPage = 1;
                    }

                    this.previousPage = value.previous;
                    if(value.previous != undefined){
                        this.numberPreviousPage = value.previous.match(/\d+/g).at(0);
                    }else{
                        this.numberPreviousPage = 1;
                    }
                    
                    this.nextPage = value.next;
                    if(value.next != undefined){
                        this.numberNextPage = value.next.match(/\d+/g).at(0);
                    }else{
                        this.numberNextPage = 1;
                    }

                    this.listNumberPage.splice(0);
                    
                    if(Number(this.numberPreviousPage)-1 < Number(this.numberFirstPage)){
                        var offsetMin = Number(this.numberFirstPage);
                    }else{
                        var offsetMin = Number(this.numberPreviousPage)-1;
                    }
                    if(Number(this.numberNextPage)+1 > Number(this.numberLastPage)){
                        var offsetMax = Number(this.numberLastPage);
                    }else{
                        var offsetMax = Number(this.numberNextPage)+1;
                    }
                    for (let i = offsetMin; i <= offsetMax; i++) {
                        this.listNumberPage.push(i);
                    }
                },
                error: () => {},
                complete: () => {}
        });
    }

    deleteSidebar(id : number)
    {
        this.sidebar.deleteSidebar(id);

        this.sidebars.forEach((item,index)=>{
            if(item.id==id) this.sidebars.splice(index,1);
        });
    }

    toggleCheckbox() {
        if(this.checked === false) {
            this.checked = true;
            this.sidebars.forEach(item=>{
                this.checkedList.push(item.id);
            });
        }else{
            this.checked = false;
            this.checkedList = [];
        }
    }

    onCheckboxChange(event : any) {
        if (event.target.checked) {
            this.checkedList.push(event.target.value);
        }else{
            this.checkedList.forEach((item,index)=>{
                if(item==event.target.value) this.checkedList.splice(index,1);
            });
        }
    }

    deleteSelectionSidebar(){
        this.checkedList.forEach(checkedItem=>{
            this.sidebar.deleteSidebar(Number(checkedItem));
        });
    }

}
