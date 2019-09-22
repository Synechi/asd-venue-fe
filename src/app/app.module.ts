import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule, GoogleMapsAPIWrapper } from "@agm/core";
//Components for Routing
import { NavComponent } from "./components/nav/nav.component";
import { LoginComponent } from "./components/login/login.component";
import { MapComponent } from "./components/map/map.component";
import { ListComponent } from "./components/list/list.component";
import { VenueListComponent } from "./components/venue-list/venue-list.component";
import { VenueListViewComponent } from "./components/venue-list-view/venue-list-view.component";
import { VenueDetailsComponent } from "./components/venue-details/venue-details.component";
import { NewAccountComponent } from "./components/new-account/new-account.component";
import { CreateAccountComponent } from './components/create-account/create-account.component';

//Services
import { UserService } from "./service/user.service";
//Angular Design Modules
import { LayoutModule } from "@angular/cdk/layout";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule, MatDialogModule } from "@angular/material";
import { MatTableModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FriendListComponent } from "./components/friend-list/friend-list.component";
import { PendingRequestsComponent } from "./components/pending-requests/pending-requests.component";
import { AddFriendsComponent } from "./components/add-friends/add-friends.component";
import { SuggestedfriendsComponent } from "./components/suggestedfriends/suggestedfriends.component";
import { AddFriendButtonComponent } from "./components/add-friend-button/add-friend-button.component";
import { CurrentFriendsComponent } from "./components/current-friends/current-friends.component";
import { PendingRequestsTableComponent } from "./components/pending-requests-table/pending-requests-table.component";
import { MatInputModule } from "@angular/material";
import { MatCardModule } from "@angular/material";
import { CreateReviewComponent } from './components/create-review/create-review.component';
import { AuthUserGuard } from './auth-user.guard';
import { UserGuardService } from './service/user-guard.service';
import { ListListComponent } from "./components/list-list/list-list.component";
import { VenueRecommendComponent } from "./components/venue-recommend/venue-recommend.component";
import { CompareValidatorDirective } from "./components/create-account/compare-validator.directive";
//import { FilterPipe } from "./filterPipe";
import { AddListDialogComponent } from "./components/add-list-dialog/add-list-dialog.component";
import { AddVenueDialogComponent } from "./components/add-venue-dialog/add-venue-dialog.component";
import { ListListItemComponent } from "./components/list-list-item/list-list-item.component";


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    MapComponent,
    FriendListComponent,
    AddFriendsComponent,
    PendingRequestsComponent,
    SuggestedfriendsComponent,
    AddFriendButtonComponent,
    CurrentFriendsComponent,
    PendingRequestsTableComponent,
    VenueDetailsComponent,
    VenueListComponent,
    VenueListViewComponent,
    ListComponent,
    NewAccountComponent,
    ListListComponent,
    VenueRecommendComponent,
    CompareValidatorDirective,
    CreateAccountComponent,
    CreateReviewComponent,
    AddListDialogComponent,
    AddVenueDialogComponent,
    ListListItemComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyARpeZgOM28DWy69OEewkRMgUfrfxASKLY",
      libraries: ["places"]
    }),
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [UserService, AuthUserGuard],
  bootstrap: [AppComponent],
  entryComponents: [AddListDialogComponent]
})
export class AppModule { }
