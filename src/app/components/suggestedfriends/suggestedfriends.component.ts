//Created by Bella L

import { Component, OnInit } from "@angular/core";
import { FriendService } from "../../service/friend.service";
import { User } from "../../user";

@Component({
  selector: "app-suggestedfriends",
  templateUrl: "./suggestedfriends.component.html",
  styleUrls: ["./suggestedfriends.component.css"]
})
export class SuggestedfriendsComponent implements OnInit {
  public searchBox: string;
  suggestedFriends: User[];

  constructor(private friendService: FriendService) {}

  ngOnInit() {
    this.displaySuggestedFriends();
  }

  //Bella L: Updates the component variable to display suggested friends
  displaySuggestedFriends(): void {
    this.friendService
      .displaySuggestedFriends()
      .subscribe(
        suggestedFriends => (this.suggestedFriends = suggestedFriends)
      );
  }

  removeSuggestedFriend(arr: User[], id: String): any {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]["_id"] == id) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  //Bella L: Passes the user id to the Friend Service to send the friend request and updates the display
  sendRequest(user: User): void {
    let newArr = this.removeSuggestedFriend(this.suggestedFriends, user._id);

    this.friendService
      .sendFriendRequest(user._id)
      .subscribe(() => (this.suggestedFriends = newArr));
  }
}
