import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
//Components for Routing
import { NavComponent } from "./components/nav/nav.component";
import { LoginComponent } from "./components/login/login.component";
import { MapComponent } from "./components/map/map.component";
//Services
import { UserService } from "./service/user.service";
//Angular Design Modules
import { LayoutModule } from "@angular/cdk/layout";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material";
import { MatCardModule } from "@angular/material";
import { MatInputModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NewAccountComponent } from './components/new-account/new-account.component';

@NgModule({
  declarations: [AppComponent, NavComponent, LoginComponent, MapComponent, NewAccountComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    RouterModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
