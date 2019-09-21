//Created by Bella L

import { Injectable } from "@angular/core";
import { User } from "../user";
import { throwError } from "rxjs";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { $ } from 'protractor';

@Injectable({
  providedIn: "root"
})
export class FriendService {
  url = "http://localhost:4000";
  //https://asd-venue-be.herokuapp.com
  constructor(private http: HttpClient) {}

  //Bella L: Calls REST API with user id and search input as parameters to retrieve 'suggested friends' from the database
  displaySuggestedFriends(searchBox: String, id: String): Observable<User[]> {

    return this.http.get<User[]>(
      `${this.url}/suggestedFriends/suggestedFriends/${searchBox}/${id}`
    );
  }

  //Bella: Calls REST API with user id as a parameter to retrieve the user's pending friend requests from the database
  displayPendingFriendRequests(id: String): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/pendingRequests/pendingRequests/${id}`);
  }

  //Bella L: Calls REST API with user id as a parameter to retrieve the user's current friends from the database
  displayCurrentFriends(id: String): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/currentFriends/currentFriends/${id}`);
  }

  /*Bella L: Calls REST API with friendID and user id as parameters to update the status of the 'friend' relationship 
between 2 users based on the status in the JSON*/

  updateFriendStatus(friendID: String, id: String, friendStatus: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.http.put(
      `${this.url}/friendStatusUpdate/friendStatusUpdate/${friendID}/${id}/${friendStatus}`,
      httpOptions
    );
  }

  //Bella L: Calls REST API with friendID and user id as parameters to send a friend request
  sendFriendRequest(friendID: String, id: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.http.post(
      `${this.url}/friendRequest/friendRequest/${friendID}/${id}`,
      httpOptions
    );
  }

  //Bella L: Calls REST API with friendID and user id as parameters to delete friend from friend list
  deleteFriend(friendID: String, id: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.http.put(
      `${this.url}/friendRemoval/friendRemoval/${friendID}/${id}`,
      httpOptions
    );
  }
}
