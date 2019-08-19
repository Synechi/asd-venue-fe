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

const routes: Routes = [
  { path: "", redirectTo: "map", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "map", component: MapComponent },
  { path: "addFriends", component: AddFriendsComponent },
  { path: "myFriends", component: FriendListComponent },
  { path: "pendingRequests", component: PendingRequestsComponent },
  { path: "list", component: ListComponent },
  { path: "venue-list", component: VenueListComponent },
  { path: "venue-list-view", component: VenueListViewComponent },
  { path: "venuedetails", component: VenueDetailsComponent },
  { path: "new-account", component: NewAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
