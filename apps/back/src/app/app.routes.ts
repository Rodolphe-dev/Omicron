import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './component/dashboard/dashboard.component';

import { AddNavbarComponent } from './component/manage-menu/navbar/add-navbar/add-navbar.component';
import { EditNavbarComponent } from './component/manage-menu/navbar/edit-navbar/edit-navbar.component';
import { ListNavbarComponent } from './component/manage-menu/navbar/list-navbar/list-navbar.component';
import { ViewNavbarComponent } from './component/manage-menu/navbar/view-navbar/view-navbar.component';

import { AddSidebarComponent } from './component/manage-menu/sidebar/add-sidebar/add-sidebar.component';
import { EditSidebarComponent } from './component/manage-menu/sidebar/edit-sidebar/edit-sidebar.component';
import { ListSidebarComponent } from './component/manage-menu/sidebar/list-sidebar/list-sidebar.component';
import { ViewSidebarComponent } from './component/manage-menu/sidebar/view-sidebar/view-sidebar.component';

import { AddFooterComponent } from './component/manage-menu/footer/add-footer/add-footer.component';
import { EditFooterComponent } from './component/manage-menu/footer/edit-footer/edit-footer.component';
import { ListFooterComponent } from './component/manage-menu/footer/list-footer/list-footer.component';
import { ViewFooterComponent } from './component/manage-menu/footer/view-footer/view-footer.component';

import { AddPageComponent } from './component/manage-content/page/add-page/add-page.component';
import { EditPageComponent } from './component/manage-content/page/edit-page/edit-page.component';
import { ListPageComponent } from './component/manage-content/page/list-page/list-page.component';
import { ViewPageComponent } from './component/manage-content/page/view-page/view-page.component';

import { AddThemeComponent } from './component/manage-design/theme/add-theme/add-theme.component';
import { EditThemeComponent } from './component/manage-design/theme/edit-theme/edit-theme.component';
import { ListThemeComponent } from './component/manage-design/theme/list-theme/list-theme.component';
import { ViewThemeComponent } from './component/manage-design/theme/view-theme/view-theme.component';

import { SettingComponent } from './component/system/setting/setting.component';

import { AddAdminComponent } from './component/system/manage-admin/add-admin/add-admin.component';
import { EditAdminComponent } from './component/system/manage-admin/edit-admin/edit-admin.component';
import { ListAdminComponent } from './component/system/manage-admin/list-admin/list-admin.component';
import { ViewAdminComponent } from './component/system/manage-admin/view-admin/view-admin.component';

import { MyProfileComponent } from './component/profile/my-profile/my-profile.component';

import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from "./service/auth/auth.guard";

import { NotFoundComponent } from './component/not-found/NotFound.component';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'navbar/add', component: AddNavbarComponent, canActivate: [AuthGuard] },
    { path: 'navbar/edit/:id', component: EditNavbarComponent, canActivate: [AuthGuard] },
    { path: 'navbar/list', component: ListNavbarComponent, canActivate: [AuthGuard] },
    { path: 'navbar/view/:id', component: ViewNavbarComponent, canActivate: [AuthGuard] },

    { path: 'sidebar/add', component: AddSidebarComponent, canActivate: [AuthGuard] },
    { path: 'sidebar/edit/:id', component: EditSidebarComponent, canActivate: [AuthGuard] },
    { path: 'sidebar/list', component: ListSidebarComponent, canActivate: [AuthGuard] },
    { path: 'sidebar/view/:id', component: ViewSidebarComponent, canActivate: [AuthGuard] },

    { path: 'footer/add', component: AddFooterComponent, canActivate: [AuthGuard] },
    { path: 'footer/edit/:id', component: EditFooterComponent, canActivate: [AuthGuard] },
    { path: 'footer/list', component: ListFooterComponent, canActivate: [AuthGuard] },
    { path: 'footer/view/:id', component: ViewFooterComponent, canActivate: [AuthGuard] },

    { path: 'page/add', component: AddPageComponent, canActivate: [AuthGuard] },
    { path: 'page/edit/:id', component: EditPageComponent, canActivate: [AuthGuard] },
    { path: 'page/list', component: ListPageComponent, canActivate: [AuthGuard] },
    { path: 'page/view/:id', component: ViewPageComponent, canActivate: [AuthGuard] },

    { path: 'theme/add', component: AddThemeComponent, canActivate: [AuthGuard] },
    { path: 'theme/edit/:id', component: EditThemeComponent, canActivate: [AuthGuard] },
    { path: 'theme/list', component: ListThemeComponent, canActivate: [AuthGuard] },
    { path: 'theme/view/:id', component: ViewThemeComponent, canActivate: [AuthGuard] },

    { path: 'system/settings', component: SettingComponent, canActivate: [AuthGuard] },

    { path: 'system/admin/add', component: AddAdminComponent, canActivate: [AuthGuard] },
    { path: 'system/admin/edit/:id', component: EditAdminComponent, canActivate: [AuthGuard] },
    { path: 'system/admin/list', component: ListAdminComponent, canActivate: [AuthGuard] },
    { path: 'system/admin/view/:id', component: ViewAdminComponent, canActivate: [AuthGuard] },

    { path: 'profile/edit/:id', component: MyProfileComponent, canActivate: [AuthGuard] },

    { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }