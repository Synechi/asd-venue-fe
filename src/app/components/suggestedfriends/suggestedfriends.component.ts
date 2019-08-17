import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-suggestedfriends',
  templateUrl: './suggestedfriends.component.html',
  styleUrls: ['./suggestedfriends.component.css']
})
export class SuggestedfriendsComponent implements OnInit {

  users = []; 

  getUsers(): void { 

    this.friendService.getAllUsers().subscribe(users => this.users = users); 

  }

  constructor(private friendService: FriendService) { }


  ngOnInit() {
    this.getUsers(); 
  }

}
