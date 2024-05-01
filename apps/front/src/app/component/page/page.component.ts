import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PageService } from '../../service/page/page.service';

@Component({
    selector: 'omicron-nx-page',
    standalone: true,
    providers: [
        PageService
    ],
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    routePage!: string | null;
    actualPage: any = {};
    content: string | null | undefined;

    constructor(
        private page: PageService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {

        this.routePage = this.route.snapshot.paramMap.get('route');

        if (this.route.snapshot.paramMap.get('route') === null) {
            this.routePage = 'home'
        }

        this.page.getThisPageByRoute(this.routePage)
            .subscribe({
                next: value => {
                    this.actualPage = value;

                    this.content = this.actualPage.content;
                }
            });

        this.router.events.subscribe((ev) => {
            if (ev instanceof NavigationEnd) {
                this.routePage = this.route.snapshot.paramMap.get('route');

                this.page.getThisPageByRoute(this.routePage)
                    .subscribe({
                        next: value => {
                            this.actualPage = value;

                            this.content = this.actualPage.content;
                        },
                    });
            }
        });
    }

}
