import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreadcrumbsService } from "../../service/breadcrumbs/breadcrumbs.service";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: "omicron-nx-breadcrumbs",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./breadcrumbs.component.html",
    styleUrls: ["./breadcrumbs.component.css"],
})
export class BreadcrumbsComponent implements OnInit {
    numberLevel = 1;
    LevelOneValue: string | undefined;
    LevelTwoValue: string | undefined;
    LevelThreeValue: string | undefined;

    onDestroy$: Subject<boolean> = new Subject();

    constructor(private breadcrumbs: BreadcrumbsService) {}

    ngOnInit() {
        this.breadcrumbs.numberLevel
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((numberLevel) => {
                this.numberLevel = numberLevel;
            });

        this.breadcrumbs.LevelOneValue.pipe(
            takeUntil(this.onDestroy$)
        ).subscribe((LevelOneValue) => {
            this.LevelOneValue = LevelOneValue;
        });

        this.breadcrumbs.LevelTwoValue.pipe(
            takeUntil(this.onDestroy$)
        ).subscribe((LevelTwoValue) => {
            this.LevelTwoValue = LevelTwoValue;
        });

        this.breadcrumbs.LevelThreeValue.pipe(
            takeUntil(this.onDestroy$)
        ).subscribe((LevelThreeValue) => {
            this.LevelThreeValue = LevelThreeValue;
        });
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.unsubscribe();
    }
}
