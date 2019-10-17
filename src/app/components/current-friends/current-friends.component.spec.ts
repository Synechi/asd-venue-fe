import {
  async,
  ComponentFixture,
  TestBed,
  inject,
  fakeAsync
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
import { FriendService } from "src/app/service/friend.service";
import { User } from "src/app/user";
import { FriendServiceStub } from "./FriendServiceStub";
import { testFriendData } from "src/app/friendtest";
import { of } from "rxjs";

describe("CurrentFriendsComponent", () => {
  let fixture: ComponentFixture<CurrentFriendsComponent>;
  let component: CurrentFriendsComponent;
  let de: DebugElement;
  let friendServiceStub: FriendServiceStub;

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
      ],
      providers: [{ provide: FriendService, useClass: FriendServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFriendsComponent);
    component = fixture.componentInstance;
    friendServiceStub = fixture.debugElement.injector.get(FriendService);
    fixture.detectChanges();
    // localStorage.setItem("id", "5d7f21e697d291000476d199");
  });

  it("should create CurrentFriends component", () => {
    expect(component).toBeTruthy();
  });

  //Bella L: Stubbing the FriendService to test displayCurrentFriends function
  it("should display test friends", fakeAsync(() => {
    const spy = spyOn(
      friendServiceStub,
      "displayCurrentFriends"
    ).and.returnValue(of(testFriendData));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.currentFriends).toEqual(testFriendData);
    expect(spy.calls.any()).toEqual(true);
  }));

  //Bella L: Testing if Remove button calls the correct function
  it("should call deleteFriend function", async(() => {
    spyOn(component, "deleteFriend");

    let button = fixture.debugElement.nativeElement.querySelector(
      "body > table > tbody > tr:nth-child(1) > td:nth-child(3) > button:nth-child(2)"
    );
    button.click();

    fixture.whenStable().then(() => {
      expect(component.deleteFriend).toHaveBeenCalled();
    });
  }));

  //Bella L - Unit Test of removeFriend() function
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
});
