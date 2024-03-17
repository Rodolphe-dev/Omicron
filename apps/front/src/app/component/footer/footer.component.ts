import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterService } from '../../service/footer/footer.service';
import { INavbar } from '../../model/navbar';

@Component({
    selector: 'app-footer',
	standalone: true,
	imports: [
        CommonModule,
        FontAwesomeModule
    ],
    providers: [
        FooterService
    ],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    content!: string;

    constructor(
        private footer : FooterService
        ) { }

    ngOnInit() {
        this.footer.getFooters()
            .subscribe({
                next: value => {
                    let stringValue = JSON.stringify(value);
                    let parseValue = JSON.parse(stringValue);
                    let fisrtFooter = parseValue[0];

                    this.content = fisrtFooter.content;
                },
                error: () => {},
                complete: () => {}
        });
    }

}
