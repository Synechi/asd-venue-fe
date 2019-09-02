import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend.service';
import { User } from '../../user';

@Component({
  selector: 'app-current-friends',
  templateUrl: './current-friends.component.html',
  styleUrls: ['./current-friends.component.css']
})
export class CurrentFriendsComponent implements OnInit {

  public searchBox: string;
  users: User[]; 

  displayCurrentFriends(): void {
    this.friendService
      .displayCurrentFriends()
      .subscribe(users => (this.users = users));
  }

  constructor(private friendService: FriendService) { }

  ngOnInit() {
   this.displayCurrentFriends();
  }

}
