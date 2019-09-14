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
  suggestedFriends: User[];
  status: boolean;
  statusMessage: string;

  constructor(private friendService: FriendService) {}

  ngOnInit() {}

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.status = true;
    this.statusMessage = "Internal Server Error, please refresh your browser.";
  }


  //Bella L: Displays 'suggested friends' based on input from user search
  displaySuggestedFriends(searchBox: String): void {
    this.friendService
      .displaySuggestedFriends(searchBox)
      .subscribe(
        suggestedFriends => (this.suggestedFriends = suggestedFriends)
      );
  }

  removeSuggestedFriend(suggestedFriends: User[], id: String): User[] {
    for (var i = 0; i < suggestedFriends.length; i++) {
      if (suggestedFriends[i]["_id"] == id) {
        suggestedFriends.splice(i, 1);
      }
    }
    return suggestedFriends;
  }

  //Bella L: Passes the user id to the Friend Service to send the friend request and updates the display
  sendFriendRequest(user: User): void {
    this.friendService;
    let suggestedFriends = this.removeSuggestedFriend(
      this.suggestedFriends,
      user._id
    );

    this.friendService.sendFriendRequest(user._id).subscribe(() => {
      this.suggestedFriends = suggestedFriends;
     
    });
    
    this.status = true;
    this.statusMessage = "Success! Friend Request has been sent."
  }
}
