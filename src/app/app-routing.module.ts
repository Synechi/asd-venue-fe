import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { MapComponent } from "./components/map/map.component";
import {ListComponent}  from './components/list/list.component';
import { VenueListComponent } from "./components/venue-list/venue-list.component";
import { VenueListViewComponent } from "./components/venue-list-view/venue-list-view.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "map", component: MapComponent },
  { path: 'list', component: ListComponent},
  { path: "venue-list", component: VenueListComponent },
  { path: "venue-list-view", component: VenueListViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
