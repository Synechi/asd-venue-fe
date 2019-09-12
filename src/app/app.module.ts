import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
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
//Services
import { UserService } from "./service/user.service";
//Angular Design Modules
import { LayoutModule } from "@angular/cdk/layout";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material";
import { MatTableModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FriendListComponent } from "./components/friend-list/friend-list.component";
import { PendingRequestsComponent } from "./components/pending-requests/pending-requests.component";
import { AddFriendsComponent } from "./components/add-friends/add-friends.component";
import { SuggestedfriendsComponent } from "./components/suggestedfriends/suggestedfriends.component";
import { AddFriendButtonComponent } from "./components/add-friend-button/add-friend-button.component";
import { CurrentFriendsComponent } from "./components/current-friends/current-friends.component";
import { PendingRequestsTableComponent } from "./components/pending-requests-table/pending-requests-table.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { RequestConfirmationComponent } from "./components/request-confirmation/request-confirmation.component";
import { MatInputModule } from "@angular/material";
import { MatCardModule } from "@angular/material";
import { ListListComponent } from './components/list-list/list-list.component';
import { VenueRecommendComponent } from './components/venue-recommend/venue-recommend.component';

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
    SearchBarComponent,
    RequestConfirmationComponent,
    VenueDetailsComponent,
    VenueListComponent,
    VenueListViewComponent,
    ListComponent,
    NewAccountComponent,
    ListListComponent,
    VenueRecommendComponent
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
    MatIconModule,
    MatListModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyARpeZgOM28DWy69OEewkRMgUfrfxASKLY",
      libraries: ["places"]
    }),
    MatCardModule,
    MatInputModule,
    FormsModule,
    RouterModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
