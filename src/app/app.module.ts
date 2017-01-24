// Modules

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AcgListComponent } from './workgroups/acg/acgList.component';
import { CAttrContainer } from './workgroups/customAttributes/caContainer.component';
import { WorkgroupListComponent } from './workgroups/workgroupList.component';
import { CAListComponent } from './workgroups/customAttributes/caList.component';
import { PreloaderComponent } from './shared/preloader.component';
import { UsersWgContainerComponent } from './workgroups/users/usersWgContainer.component'
import { wgUsersListComponent } from './workgroups/users/wgUsersList.component';
import { spWgContainerComponent } from './workgroups/structureParameters/spWgContainer.component';
import { SpWgListComponent } from './workgroups/structureParameters/spWgList.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { WgTabsComponent } from './workgroups/wgTabs/wgTabs.component';
import { UsersContainerComponent } from './settings/users/usersContainer.component';
import { UsersWgListComponent } from './settings/users/usersWgList/usersWgList.component';
import { SpContainerComponent } from './settings/structured-parameters/spContainer.component';
import { ProcessDnisComponent } from './settings/processDnis/processdnis.component';
import { UsersListComponent } from './settings/users/users-list/users-list.component';
import { ProcessListComponent } from './settings/structured-parameters/process-list/processList.component';
import { CreateNewWgComponent } from './workgroups/create/createNewWg.component';

// Services
import { WorkgroupService } from './core/workgroup.service';
import { LoginGuard } from './core/loginGuard.service';


// Pipes
import { orderByPipe } from './workgroups/acg/orderBy.pipe';
// import { FilterWorkgroupPipe } from './workgroups/filterWorkgroup.pipe';
import { SplistComponent } from './settings/structured-parameters/splist/splist.component';
import { SortStrParametersPipe } from './settings/pipes/sortstrparameters.pipe';
import { FilterStrParametersPipe } from './settings/pipes/filterstrparameters.pipe';
import { SortUsersPipe } from './pipes/Users/sort-users.pipe';
import { FilterUsersPipe } from './pipes/Users/filter-users.pipe';
import { FilterAttributesPipe } from './pipes/CAttributes/filterAttributes.pipe';
import { SortattributesPipe } from './pipes/CAttributes/sortattributes.pipe';
import { SortworkgroupsPipe } from './pipes/workgroups/sortworkgroups.pipe';
import { FilterworkgroupsPipe } from './pipes/workgroups/filterworkgroups.pipe';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AcgListComponent,
    orderByPipe,
    CAttrContainer,
    WorkgroupListComponent,
    CAListComponent,
    PreloaderComponent,
    UsersWgContainerComponent,
    wgUsersListComponent,
    spWgContainerComponent,
    SpWgListComponent,
    BreadcrumbsComponent,
    WgTabsComponent,
    SpContainerComponent,
    ProcessDnisComponent,
    UsersContainerComponent,
    UsersListComponent,
    UsersWgListComponent,
    ProcessListComponent,
    SplistComponent,
    SortStrParametersPipe,
    FilterStrParametersPipe,
    CreateNewWgComponent,
    
    // pipes
    SortUsersPipe,
    FilterUsersPipe,
    SortattributesPipe,    
    FilterAttributesPipe,
    SortworkgroupsPipe,
    FilterworkgroupsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: "Home", component: HomeComponent },
      { path: "Create_Workgroup", component: CreateNewWgComponent, canActivate: [LoginGuard] },
      { path: "CustomAttributes", component: CAttrContainer, canActivate: [LoginGuard]},
      { path: "CustomAttributes/:acg/:currentWorkgroup", component: CAttrContainer, canActivate: [LoginGuard] },
      { path: "UsersWg", component: UsersWgContainerComponent, canActivate: [LoginGuard]},
      { path: "UsersWg/:acg/:currentWorkgroup", component: UsersWgContainerComponent, canActivate: [LoginGuard] },
      { path: "ProccessesWg", component: spWgContainerComponent, canActivate: [LoginGuard] },
      { path: "ProccessesWg/:acg/:currentWorkgroup", component: spWgContainerComponent, canActivate: [LoginGuard] },
      { path: "users", component: UsersContainerComponent, canActivate: [LoginGuard]},
      { path: "users/:id", component: UsersContainerComponent, canActivate: [LoginGuard] },
      { path: "structuredParameters", component: SpContainerComponent, canActivate: [LoginGuard] },
      { path: "processDnis", component: ProcessDnisComponent, canActivate: [LoginGuard] },
      { path: '', component: HomeComponent },
      { path: '**', component: HomeComponent }
    ])
  ],
  providers: [WorkgroupService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }