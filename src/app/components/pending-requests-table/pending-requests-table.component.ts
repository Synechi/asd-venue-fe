import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-pending-requests-table',
  templateUrl: './pending-requests-table.component.html',
  styleUrls: ['./pending-requests-table.component.css']
})
export class PendingRequestsTableComponent implements OnInit {

  users = [];

  // getUsers(): void { 

  //   this.friendService.getAllUsers().subscribe(users => this.users = users); 

  // }


  constructor(private friendService : FriendService) { }

  ngOnInit() {
  }

}
