import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BreadcrumbsService } from "../../../../service/breadcrumbs/breadcrumbs.service";
import { FooterService } from "../../../../service/footer/footer.service";
import { Footer } from "../../../../model/footer";

@Component({
    selector: "omicron-nx-list-footer",
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
    providers: [FooterService],
    templateUrl: "./list-footer.component.html",
    styleUrls: ["./list-footer.component.css"],
})
export class ListFooterComponent implements OnInit {
    footers!: Footer[];
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
        private footer: FooterService
    ) {}

    ngOnInit() {
        this.breadcrumbs.setLevel(3);
        this.breadcrumbs.setLevelOneValue("Menus");
        this.breadcrumbs.setLevelTwoValue("Footer");
        this.breadcrumbs.setLevelThreeValue("List Footer");

        this.footer.getFooters().subscribe({
            next: (value) => {
                this.footers = value.listItem;

                this.totalItems = value.totalItems;

                if (value.actual != undefined) {
                    const resultMatchActual = value?.actual?.match(/\d+/g);
                    this.numberActualPage = <number>(
                        (<unknown>resultMatchActual)
                    );
                } else {
                    this.numberFirstPage = 1;
                }

                this.firstPage = value.first;
                if (value.first != undefined) {
                    const resultMatchFirst = value?.first?.match(/\d+/g);
                    this.numberFirstPage = <number>(<unknown>resultMatchFirst);
                } else {
                    this.numberFirstPage = 1;
                }

                this.lastPage = value.last;
                if (value.last != undefined) {
                    const resultMatchLast = value?.last?.match(/\d+/g);
                    this.numberLastPage = <number>(<unknown>resultMatchLast);
                } else {
                    this.numberLastPage = 1;
                }

                this.previousPage = value.previous;
                if (value.previous != undefined) {
                    const resultMatchPrevious = value?.previous?.match(/\d+/g);
                    this.numberPreviousPage = <number>(
                        (<unknown>resultMatchPrevious)
                    );
                } else {
                    this.numberPreviousPage = 1;
                }

                this.nextPage = value.next;
                if (value.next != undefined) {
                    const resultMatchNext = value?.next?.match(/\d+/g);
                    this.numberNextPage = <number>(<unknown>resultMatchNext);
                } else {
                    this.numberNextPage = 1;
                }

                this.offsetMinGetPage = this.numberFirstPage;
                if (this.numberNextPage + 1 > this.numberLastPage) {
                    this.offsetMaxGetPage = this.numberLastPage;
                } else {
                    this.offsetMaxGetPage = this.numberNextPage + 3;
                }
                for (
                    let i = this.offsetMinGetPage;
                    i <= this.offsetMaxGetPage;
                    i++
                ) {
                    this.listNumberPage.push(i);
                }
            },
        });
    }

    switchPage(pageValue: string) {
        this.footer.getFootersByPage(pageValue).subscribe({
            next: (value) => {
                this.footers = value.listItem;

                this.totalItems = value.totalItems;
                const resultMatchActual = value.actual.match(/\d+/g);
                this.numberActualPage = <number>(<unknown>resultMatchActual);

                if (value.first != undefined) {
                    const resultMatchFirst = value.first.match(/\d+/g);
                    this.numberFirstPage = <number>(<unknown>resultMatchFirst);
                } else {
                    this.numberFirstPage = 1;
                }

                this.lastPage = value.last;
                if (value.last != undefined) {
                    const resultMatchLast = value.last.match(/\d+/g);
                    this.numberLastPage = <number>(<unknown>resultMatchLast);
                } else {
                    this.numberLastPage = 1;
                }

                this.previousPage = value.previous;
                if (value.previous != undefined) {
                    const resultMatchPrevious = value.previous.match(/\d+/g);
                    this.numberPreviousPage = <number>(
                        (<unknown>resultMatchPrevious)
                    );
                } else {
                    this.numberPreviousPage = 1;
                }

                this.nextPage = value.next;
                if (value.next != undefined) {
                    const resultMatchNext = value.next.match(/\d+/g);
                    this.numberNextPage = <number>(<unknown>resultMatchNext);
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
                for (
                    let i = this.offsetMinSwitchPage;
                    i <= this.offsetMaxSwitchPage;
                    i++
                ) {
                    this.listNumberPage.push(i);
                }
            },
        });
    }

    deleteFooter(id: number) {
        this.footer.deleteFooter(id);

        this.footers.forEach((item, index) => {
            if (item.id == id) this.footers.splice(index, 1);
        });
    }

    toggleCheckbox() {
        if (this.checked === false) {
            this.checked = true;
            this.footers.forEach((item) => {
                this.checkedList.push(item.id);
            });
        } else {
            this.checked = false;
            this.checkedList = [];
        }
    }

    onCheckboxChange(event: Event) {
        const dataCheckedList = <number>(
            (<unknown>(event.target as HTMLInputElement).value)
        );
        if ((event.target as HTMLInputElement).checked) {
            this.checkedList.push(dataCheckedList);
        } else {
            this.checkedList.forEach((item, index) => {
                if (item == dataCheckedList) this.checkedList.splice(index, 1);
            });
        }
    }

    deleteSelectionFooter() {
        this.checkedList.forEach((checkedItem) => {
            this.footer.deleteFooter(Number(checkedItem));
        });
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
