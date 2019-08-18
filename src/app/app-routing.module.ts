import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { MapComponent } from "./components/map/map.component";
import { AddFriendsComponent } from "./components/add-friends/add-friends.component";
import { FriendListComponent } from "./components/friend-list/friend-list.component";
import { PendingRequestsComponent } from "./components/pending-requests/pending-requests.component";

const routes: Routes = [
  { path: "", redirectTo: "map", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "map", component: MapComponent },
  { path: "addFriends", component: AddFriendsComponent },
  { path: "myFriends", component: FriendListComponent },
  { path: "pendingRequests", component: PendingRequestsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
