import { Component, OnInit } from "@angular/core";
import { FriendService } from "../../service/friend.service";
import { User } from "../../user";
@Component({
  selector: "app-pending-requests-table",
  templateUrl: "./pending-requests-table.component.html",
  styleUrls: ["./pending-requests-table.component.css"]
})
export class PendingRequestsTableComponent implements OnInit {
  public searchBox: string;
  pendingRequests: User[];

  displayPendingFriendRequests(): void {
    this.friendService
      .displayPendingFriendRequests()
      .subscribe(pendingRequests => (this.pendingRequests = pendingRequests));
  }

  // findFriend(id: String, array: User[]): any {
  //   for (var i = 0; i < array.length; i++) {
  //     if (array["friends"][i]["_id"] == id) {
  //       return i;
  //     }
  //   }
  // }

  updateFriendStatus(user: User, friendStatus: String): void {

    this.friendService
      .updateFriendStatus(user._id, friendStatus)
      .subscribe(pendingRequests => (this.pendingRequests.filter(function(element){
           return 
      })));
      
  }

  constructor(private friendService: FriendService) {}

  ngOnInit() {
    this.displayPendingFriendRequests();
  }
}
