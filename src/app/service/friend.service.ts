//Created by Bella L

import { Injectable } from "@angular/core";
import { User } from "../user";
import { throwError } from "rxjs";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FriendService {
  url = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  //Bella L: Calls REST API to retrieve 'suggested friends' from the database
  displaySuggestedFriends(searchBox: String): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/suggestedFriends/suggestedFriends/${searchBox}`);
  }

  //Bella: Calls REST API to retrieve the user's pending friend requests from the database
  displayPendingFriendRequests(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/pendingRequests/pendingRequests`);
  }

  //Bella L: Calls REST API to retrieve the user's current friends from the database
  displayCurrentFriends(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/currentFriends/currentFriends`);
  }

  /*Bella L: Calls REST API with friendID as a parameter to update the status of the 'friend' relationship 
between 2 users based on the status in the JSON*/

  updateFriendStatus(friendID: String, friendStatus: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.http.put(
      `${this.url}/friendStatusUpdate/friendStatusUpdate/${friendID}`,
      { friendStatus },
      httpOptions
    );
  }

  //Bella L: Calls REST API with friendID as a parameter to send a friend request
  sendFriendRequest(friendID: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.http
      .post(`${this.url}/friendRequest/friendRequest/${friendID}`, httpOptions)
      .pipe(catchError(this.friendExistsError));
  }

  //Bella L: Calls REST API with friendID as a parameter to delete friend from friend list
  deleteFriend(friendID: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.http.put(`${this.url}/friendRemoval/friendRemoval/${friendID}`, httpOptions);
  }

  friendExistsError(error) {
    let message = "Friend already exists!";

    window.alert(message);
    return throwError(message);
  }
}
