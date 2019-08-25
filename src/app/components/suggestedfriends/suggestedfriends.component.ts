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

  public isViewable: boolean;

  displayUsers(): void { 

    this.friendService.displayUsers().subscribe(users => this.users = users); 

  }

  constructor(private friendService: FriendService) { }

  show(): void { this.isViewable = !this.isViewable; }

  ngOnInit() {
    this.displayUsers(); 
      }

}
