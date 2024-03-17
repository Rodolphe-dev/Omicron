import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsService } from '../../service/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
	imports: [CommonModule],
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

    numberLevel: number = 1;
    LevelOneValue: string | undefined;
    LevelTwoValue: string | undefined;
    LevelThreeValue: string | undefined;

    constructor(private breadcrumbs : BreadcrumbsService) { 
    }

    ngOnInit() {
        this.breadcrumbs.numberLevel.subscribe(numberLevel => {
            this.numberLevel = numberLevel;
        });
        
        this.breadcrumbs.LevelOneValue.subscribe(LevelOneValue => {
            this.LevelOneValue = LevelOneValue;
        });
        this.breadcrumbs.LevelTwoValue.subscribe(LevelTwoValue => {
            this.LevelTwoValue = LevelTwoValue;
        });
        this.breadcrumbs.LevelThreeValue.subscribe(LevelThreeValue => {
            this.LevelThreeValue = LevelThreeValue;
        });
    }

}
