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
import { FriendService } from "src/app/service/friend.service";

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
      // providers: [ {provide: FriendService, useValue: friendServiceStub}]
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

  //Bella L: Mocking the friendRemoval Service
  let friendRemovalMockService = {
    //Mocking findByID function used in the Backend API
    userFindByID(userCollection, id): any[] {
      for (var i = 0; i < userCollection.length; i++) {
        if ((userCollection[i]["_id"] = id)) {
          return userCollection[i]["friends"];
        }
      }
    },

    deleteFriend(friendArr, friendID): any {
      var status = "0";

      for (var i = 0; i < friendArr.length; i++) {
        if (friendArr[i]["friendID"] == friendID) {
          friendArr.splice(i, 1);
          status = "204";
        } else {
          status = "500";
        }
      }

      return status;
    }
  };

  //Mocking the removalFriendService to ensure functions work as expected
  it("should removalFriendService works", () => {
    const testUserCollection = [
      {
        _id: "2",
        firstname: "d",
        lastname: "e",
        email: "de@gmail.com",
        password: "fskhf",
        conpassword: "fskhf",
        friends: [
          {
            friendID: "1",
            friendStatus: "A"
          },
          {
            friendID: "3",
            friendStatus: "A"
          },
          {
            friendID: "4",
            friendStatus: "A"
          }
        ]
      },
      {
        _id: "3",
        firstname: "f",
        lastname: "g",
        email: "fe@gmail.com",
        password: "fskfhj",
        conpassword: "fskfhj",
        friends: [
          {
            friendID: "2",
            friendStatus: "A"
          }
        ]
      },
      {
        _id: "4",
        firstname: "E",
        lastname: "b",
        email: "Eb@gmail.com",
        password: "fakdf",
        conpassword: "fakdf",
        friends: [
          {
            friendID: "2",
            friendStatus: "A"
          }
        ]
      }
    ];

    const testFriendArr = [
      {
        friendID: "1",
        friendStatus: "A"
      },
      {
        friendID: "3",
        friendStatus: "A"
      },
      {
        friendID: "4",
        friendStatus: "A"
      }
    ];

    //Bella L: Expecting the friends array of the id specified
    expect(
      friendRemovalMockService.userFindByID(testUserCollection, 2)
    ).toEqual(testFriendArr);

    //Bella L: If friend removal success, return status code 204, if friend removal failure return status code 500
    expect(friendRemovalMockService.deleteFriend(testFriendArr, 4)).toEqual(
      "204"
    );

    expect(friendRemovalMockService.deleteFriend(testFriendArr, 5)).toEqual(
      "500"
    );
  });
});
