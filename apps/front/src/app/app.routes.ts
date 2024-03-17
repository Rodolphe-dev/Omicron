import { Routes } from '@angular/router';

import { PageComponent } from './component/page/page.component';

export const routes: Routes = [
    { path: '', component: PageComponent },
    { path: ':route', component: PageComponent },
];
