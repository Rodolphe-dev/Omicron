import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsService } from '../../../../service/breadcrumbs/breadcrumbs.service';
import { PageService } from '../../../../service/page/page.service';
import { IPage } from '../../../../model/page';


@Component({
    selector: 'omicron-nx-list-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        FormsModule
    ],
    providers: [PageService],
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
    pages!: IPage[];
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
    listNumberPage: number[] = [];
    checked = false;
    checkedList: number[] = [];
    offsetMinGetPage!: number;
    offsetMaxGetPage!: number;
    offsetMinSwitchPage!: number;
    offsetMaxSwitchPage!: number;

    constructor(
        private breadcrumbs: BreadcrumbsService,
        public router: Router,
        private page: PageService
    ) { }

    ngOnInit() {
        this.breadcrumbs.setLevel(2);
        this.breadcrumbs.setLevelOneValue('Content');
        this.breadcrumbs.setLevelTwoValue('List Pages');
        this.breadcrumbs.setLevelThreeValue('');

        this.page.getPages()
            .subscribe({
                next: value => {
                    this.pages = value.listItem;

                    this.totalItems = value.totalItems;

                    if (value.actual != undefined) {
                        this.numberActualPage = value.actual.match(/\d+/g).at(0);
                    } else {
                        this.numberFirstPage = 1;
                    }

                    this.firstPage = value.first;
                    if (value.first != undefined) {
                        this.numberFirstPage = value.first.match((/\d+/g)).at(0);
                    } else {
                        this.numberFirstPage = 1;
                    }

                    this.lastPage = value.last;
                    if (value.last != undefined) {
                        this.numberLastPage = value.last.match(/\d+/g).at(0);
                    } else {
                        this.numberLastPage = 1;
                    }

                    this.previousPage = value.previous;
                    if (value.previous != undefined) {
                        this.numberPreviousPage = value.previous.match(/\d+/g).at(0);
                    } else {
                        this.numberPreviousPage = 1;
                    }

                    this.nextPage = value.next;
                    if (value.next != undefined) {
                        this.numberNextPage = value.next.match(/\d+/g).at(0);
                    } else {
                        this.numberNextPage = 1;
                    }

                    this.offsetMinGetPage = this.numberFirstPage;
                    if (this.numberNextPage + 1 > this.numberLastPage) {
                        this.offsetMaxGetPage = this.numberLastPage;
                    } else {
                        this.offsetMaxGetPage = this.numberNextPage + 3;
                    }
                    for (let i = this.offsetMinGetPage; i <= this.offsetMaxGetPage; i++) {
                        this.listNumberPage.push(i);
                    }
                }
            });
    }

    switchPage(pageValue: string) {
        this.page.getPagesByPage(pageValue)
            .subscribe({
                next: value => {
                    this.pages = value.listItem;

                    this.totalItems = value.totalItems;
                    this.numberActualPage = value.actual.match(/\d+/g).at(0);

                    if (value.first != undefined) {
                        this.numberFirstPage = value.first.match((/\d+/g)).at(0);
                    } else {
                        this.numberFirstPage = 1;
                    }

                    this.lastPage = value.last;
                    if (value.last != undefined) {
                        this.numberLastPage = value.last.match(/\d+/g).at(0);
                    } else {
                        this.numberLastPage = 1;
                    }

                    this.previousPage = value.previous;
                    if (value.previous != undefined) {
                        this.numberPreviousPage = value.previous.match(/\d+/g).at(0);
                    } else {
                        this.numberPreviousPage = 1;
                    }

                    this.nextPage = value.next;
                    if (value.next != undefined) {
                        this.numberNextPage = value.next.match(/\d+/g).at(0);
                    } else {
                        this.numberNextPage = 1;
                    }

                    this.listNumberPage.splice(0);

                    if (this.numberPreviousPage - 1 < this.numberFirstPage) {
                        this.offsetMinSwitchPage = this.numberFirstPage;
                    } else {
                        this.offsetMinSwitchPage = this.numberPreviousPage - 1;
                    }
                    if (this.numberNextPage + 1 > this.numberLastPage) {
                        this.offsetMaxSwitchPage = this.numberLastPage;
                    } else {
                        this.offsetMaxSwitchPage = this.numberNextPage + 1;
                    }
                    for (let i = this.offsetMinSwitchPage; i <= this.offsetMaxSwitchPage; i++) {
                        this.listNumberPage.push(i);
                    }
                }
            });
    }

    deletePage(id: number) {
        this.page.deletePage(id);

        this.pages.forEach((item, index) => {
            if (item.id == id) this.pages.splice(index, 1);
        });
    }

    toggleCheckbox() {
        if (this.checked === false) {
            this.checked = true;
            this.pages.forEach(item => {
                this.checkedList.push(item.id);
            });
        } else {
            this.checked = false;
            this.checkedList = [];
        }
    }

    onCheckboxChange(event: Event) {
        const dataCheckedList = <number><unknown>(event.target as HTMLInputElement).value;
        if ((event.target as HTMLInputElement).checked) {
            this.checkedList.push(dataCheckedList);
        } else {
            this.checkedList.forEach((item, index) => {
                if (item == dataCheckedList) this.checkedList.splice(index, 1);
            });
        }
    }

    deleteSelectionPage() {
        this.checkedList.forEach(checkedItem => {
            this.page.deletePage(Number(checkedItem));
        });
    }

}
