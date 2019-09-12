import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent implements OnInit {

  results = [];

  /* searchUser(name) {
    
    this.results.push((this.friendService.searchUser(name)));
    return this.results;
    

  } */

  constructor(private friendService: FriendService) {  }

  ngOnInit() {
  }

}
