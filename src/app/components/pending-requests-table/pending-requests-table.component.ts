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
  users: User[];

  displayFriendRequests(): void {
    this.friendService
      .displayPendingFriendRequests()
      .subscribe(users => (this.users = users));
  }

  updateFriendStatus(user: User, friendStatus: String): void {
    this.friendService
      .updateFriendStatus(user._id, friendStatus)
      .subscribe(user => {
        window.alert("Request status successfully updated!");
        this.ngOnInit();
      });
  }

  constructor(private friendService: FriendService) {}

  ngOnInit() {
    this.displayFriendRequests();
  }
}
