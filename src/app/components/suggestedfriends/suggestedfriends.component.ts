import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend.service';
import { User } from '../../user';

@Component({
  selector: 'app-suggestedfriends',
  templateUrl: './suggestedfriends.component.html',
  styleUrls: ['./suggestedfriends.component.css']
})
export class SuggestedfriendsComponent implements OnInit {

  public searchBox: string;
  users: User[]; 
  selectedUser: User; 
  

  public isViewable: boolean;

  displaySuggestedFriends(): void { 

    this.friendService.displaySuggestedFriends().subscribe(users => this.users = users);

  }

  constructor(private friendService: FriendService) { }

  sendRequest(user: User) : void { 
    this.friendService.sendFriendRequest(user._id).subscribe(user => window.alert("Friend Reqeust has been sent!"));
  }

  ngOnInit() {
    this.displaySuggestedFriends(); 
      }

}
