//Created by Bella L

import { Component, OnInit } from "@angular/core";
import { FriendService } from "../../service/friend.service";
import { User } from "../../user";
@Component({
  selector: "app-pending-requests-table",
  templateUrl: "./pending-requests-table.component.html",
  styleUrls: ["./pending-requests-table.component.css"]
})
export class PendingRequestsTableComponent implements OnInit {
  pendingRequests: User[];

  constructor(private friendService: FriendService) {}

  ngOnInit() {
    this.displayPendingFriendRequests();
  }

  //Bella L: Updates the component variable to display pending friend requests
  displayPendingFriendRequests(): void {
    this.friendService
      .displayPendingFriendRequests()
      .subscribe(pendingRequests => (this.pendingRequests = pendingRequests));
  }

  removePendingRequest(arr: User[], id: String): any {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]["_id"] == id) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  //Bella L: Passes the user id and 'accepted' or 'declined' status to the Friend Service and updates the display
  updateFriendStatus(user: User, friendStatus: String): void {
    let newArr = this.removePendingRequest(this.pendingRequests, user._id);
    
    this.friendService
      .updateFriendStatus(user._id, friendStatus)
      .subscribe(() => (this.pendingRequests = newArr));
      
  }
}
