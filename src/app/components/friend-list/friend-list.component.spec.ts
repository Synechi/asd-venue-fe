import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FriendListComponent } from "./friend-list.component";
import { NavComponent } from "../nav/nav.component";
import { CurrentFriendsComponent } from "../current-friends/current-friends.component";
import { AddFriendButtonComponent } from "../add-friend-button/add-friend-button.component";
import { LayoutModule } from "@angular/cdk/layout";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("FriendListComponent", () => {
  let fixture: ComponentFixture<FriendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FriendListComponent,
        NavComponent,
        CurrentFriendsComponent,
        AddFriendButtonComponent
      ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendListComponent);
    fixture.detectChanges();
  });

  it("should render title in a h1 tag", async(() => {
    const fixture = TestBed.createComponent(FriendListComponent);
    fixture.detectChanges();
    const complied = fixture.debugElement.nativeElement;
    expect(complied.querySelector("h1").textContent).toContain("My Friends");
  }));
});
