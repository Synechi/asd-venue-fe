import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { MapComponent } from "./components/map/map.component";
import { AddFriendsComponent } from "./components/add-friends/add-friends.component";
import { FriendListComponent } from "./components/friend-list/friend-list.component";
import { PendingRequestsComponent } from "./components/pending-requests/pending-requests.component";
import { ListComponent } from "./components/list/list.component";
import { VenueListComponent } from "./components/venue-list/venue-list.component";
import { VenueListViewComponent } from "./components/venue-list-view/venue-list-view.component";
import { VenueDetailsComponent } from "./components/venue-details/venue-details.component";
import { NewAccountComponent } from "./components/new-account/new-account.component";
import { CreateAccountComponent } from "./components/create-account/create-account.component";
import { CreateReviewComponent } from "./components/create-review/create-review.component";
import { AuthUserGuard } from "./auth-user.guard";
import { VenueRecommendComponent } from "./components/venue-recommend/venue-recommend.component";
import { AddListDialogComponent } from "./components/add-list-dialog/add-list-dialog.component";
import { AddVenueDialogComponent } from "./components/add-venue-dialog/add-venue-dialog.component";
import { ViewReviewComponent } from "./components/view-review/view-review.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "map", component: MapComponent, canActivate: [AuthUserGuard] },
  { path: "addFriends", component: AddFriendsComponent },
  {
    path: "myFriends",
    component: FriendListComponent,
    canActivate: [AuthUserGuard]
  },
  {
    path: "pendingRequests",
    component: PendingRequestsComponent,
    canActivate: [AuthUserGuard]
  },
  { path: "list", component: ListComponent, canActivate: [AuthUserGuard] },
  {
    path: "venue-list",
    component: VenueListComponent,
    canActivate: [AuthUserGuard]
  },
  { path: "venue-list-view", component: VenueListViewComponent },
  {
    path: "venuedetails",
    component: VenueDetailsComponent,
    canActivate: [AuthUserGuard]
  },
  { path: "create-account", component: CreateAccountComponent },
  { path: "create-review", component: CreateReviewComponent },
  { path: "venuedetails", component: VenueDetailsComponent },
  { path: "new-account", component: NewAccountComponent },
  { path: "venue-list-view/:id", component: VenueListViewComponent },
  { path: "venue-list-view/:id/:friendID", component: VenueListViewComponent },
  { path: "venue-list/:friendID/:firstname", component: VenueListComponent },
  { path: "recommendation", component: VenueRecommendComponent },
  { path: "rec", component: VenueRecommendComponent },
  { path: "add-list-dialog", component: AddListDialogComponent },
  { path: "add-venue-dialog", component: AddVenueDialogComponent },
  { path: "viewreview/:id", component: ViewReviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
