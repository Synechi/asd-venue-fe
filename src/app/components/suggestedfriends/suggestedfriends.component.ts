import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend.service';
import { User } from '../../user';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS } from '@angular/material';
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

  displayUsers(): void { 

    this.friendService.displayUsers().subscribe(users => this.users = users);

  }

  constructor(private friendService: FriendService) { }

  show(user: User) : void { 
    console.log(user._id);
    this.friendService.sendFriendRequest(user._id).subscribe(user => window.alert("Friend Reqeust has been sent!"));
    // this.selectedUser = user; 
    // this.isViewable = !this.isViewable; 
  }

  ngOnInit() {
    this.displayUsers(); 
      }

}
