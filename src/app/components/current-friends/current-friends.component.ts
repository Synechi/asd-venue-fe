import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend.service';
@Component({
  selector: 'app-current-friends',
  templateUrl: './current-friends.component.html',
  styleUrls: ['./current-friends.component.css']
})
export class CurrentFriendsComponent implements OnInit {

  // users = [];
  // getUsers(): void { 

  //   this.friendService.getAllUsers().subscribe(users => this.users = users); 

  // }

  constructor(private friendService: FriendService) { }

  ngOnInit() {
   
  }

}
