import { Routes } from '@angular/router';

import { PageComponent } from './component/page/page.component';

import { NotFoundComponent } from './component/not-found/NotFound.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: PageComponent },
    { path: ':route', component: PageComponent },

    { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
