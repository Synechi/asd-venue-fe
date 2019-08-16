import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { NewAccountComponent } from './components/new-account/new-account.component';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'map', component: MapComponent},
  { path: 'new-account', component: NewAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
