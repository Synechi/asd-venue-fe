import {
  Component,
  OnInit,
  SystemJsNgModuleLoader,
  Output
} from "@angular/core";
import { FriendService } from "../../service/friend.service";
import { User } from "../../user";

@Component({
  selector: "app-current-friends",
  templateUrl: "./current-friends.component.html",
  styleUrls: ["./current-friends.component.css"]
})
export class CurrentFriendsComponent implements OnInit {
  public searchBox: string;
  currentFriends: User[];

  displayCurrentFriends(): void {
    this.friendService
      .displayCurrentFriends()
      .subscribe(users => (this.currentFriends = users));
  }

  // deleteFriend(user: User): void {
  //   this.friendService
  //     .deleteFriend(user._id)
  //     .subscribe(currentFriends => (this.currentFriends = currentFriends));
  // }

  deleteFriend(user: User): void {

    this.friendService
      .deleteFriend(user._id)
      .subscribe(
        friends => {console.log("Ramu!");
          (this.currentFriends = this.currentFriends.filter(
            friend => { console.log("Hello!"); return friend._id != user._id }
          )
          )});
      let hello = JSON.stringify(this.currentFriends);
      let hello1 = JSON.stringify(this.currentFriends["friends"]);
      console.log(hello);
      console.log (hello1);

  }

  constructor(private friendService: FriendService) {}

  ngOnInit() {
    this.displayCurrentFriends();
  }
}
