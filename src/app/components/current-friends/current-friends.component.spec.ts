import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { CurrentFriendsComponent } from "./current-friends.component";
import { DebugElement } from "@angular/core";
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

describe("CurrentFriendsComponent", () => {
  let fixture: ComponentFixture<CurrentFriendsComponent>;
  let component: CurrentFriendsComponent;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentFriendsComponent],
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
    fixture = TestBed.createComponent(CurrentFriendsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
    localStorage.setItem("id", "5d7f21e697d291000476d199");
  });

  it("should create CurrentFriends component", () => {
    expect(component).toBeTruthy();
  });

  it("should remove Friend", () => {
    const friendArr = [
      {
        _id: "1",
        firstname: "b",
        lastname: "c",
        email: "bc@gmail.com",
        password: "ffjj",
        conpassword: "ffjj"
      },
      {
        _id: "2",
        firstname: "d",
        lastname: "e",
        email: "de@gmail.com",
        password: "fskhf",
        conpassword: "fskhf"
      },
      {
        _id: "3",
        firstname: "f",
        lastname: "g",
        email: "fe@gmail.com",
        password: "fskfhj",
        conpassword: "fskfhj"
      }
    ];

    const newArr = [
      {
        _id: "2",
        firstname: "d",
        lastname: "e",
        email: "de@gmail.com",
        password: "fskhf",
        conpassword: "fskhf"
      },
      {
        _id: "3",
        firstname: "f",
        lastname: "g",
        email: "fe@gmail.com",
        password: "fskfhj",
        conpassword: "fskfhj"
      }
    ];
    expect(component.removeFriend(friendArr, "1")).toEqual(newArr);
  });

  // it(' When the remove button is clicked, then method should run', async(() => {

  //   const mockFriends = [
  //     { _id: "1", firstname: "b", lastname: "c", email: "bc@gmail.com", password: "ffjj", conpassword: "ffjj" },
  //     {_id: "2", firstname: "d", lastname: "e", email: "de@gmail.com", password: "fskhf", conpassword: "fskhf"},
  //     {_id: "3", firstname: "f", lastname: "g", email: "fe@gmail.com", password: "fskfhj" , conpassword: "fskfhj" }
  //   ]

  //   component.currentFriends = mockFriends;

  //   spyOn(component, 'deleteFriend');

  //   let button = fixture.debugElement.nativeElement.querySelector('button');
  //   button.click();

  //   fixture.whenStable().then(() => {
  //     expect(component.deleteFriend).toHaveBeenCalled();
  //   });

  // }));
});
