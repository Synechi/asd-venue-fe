//Created by Bella L

import { Component, OnInit } from "@angular/core";
import { FriendService } from "../../service/friend.service";
import { User } from "../../user";

@Component({
  selector: "app-current-friends",
  templateUrl: "./current-friends.component.html",
  styleUrls: ["./current-friends.component.css"]
})
export class CurrentFriendsComponent implements OnInit {
  currentFriends: User[];
  status: boolean;
  statusMessage: string;

  constructor(private friendService: FriendService) {}

  ngOnInit() {
    this.displayCurrentFriends();
  }

  //Bella L: Updates the component variable to display current friend list
  
  displayCurrentFriends(): void {
   
    this.friendService
      .displayCurrentFriends(localStorage.getItem("id"))
      .subscribe(users => (this.currentFriends = users));
    
  }

  removeFriend(arr: User[], id: String): any {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]["_id"] == id) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  //Bella L: Passes the user id to the Friend Service to delete a friend and updates the display
  deleteFriend(user: User): void {
    let newArr = this.removeFriend(this.currentFriends, user._id);

    this.friendService
      .deleteFriend(user._id, localStorage.getItem("id"))
      .subscribe(() => (this.currentFriends = newArr));

    this.status = true;
    this.statusMessage = "Success! Friend has been removed.";
  }
}
