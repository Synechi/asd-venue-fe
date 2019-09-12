import { Injectable } from '@angular/core';
import { User} from '../user';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs'; 
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FriendService {

  url = "http://localhost:4000";
  
constructor(private http: HttpClient){

}

//Calls REST API to retrieve 'suggested friends' from the database
displaySuggestedFriends(): Observable<User[]> {
  return this.http.get<User[]>(`${this.url}/suggestedFriends`);
}

//Calls REST API to retrieve the user's pending friend requests from the database
displayPendingFriendRequests(): Observable<User[]> { 

  return this.http.get<User[]>(`${this.url}/pendingRequests`);
}

//Calls REST API to retrieve the user's current friends from the database
displayCurrentFriends(): Observable<User[]> { 

  return this.http.get<User[]>(`${this.url}/currentFriends`);
}

/*Calls REST API with friendID as a parameter to update the status of the 'friend' relationship 
between 2 users based on the status in the JSON*/

updateFriendStatus(friendID: String, friendStatus: String) {

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  return this.http.put(`${this.url}/friendStatusUpdate/${friendID}`, {friendStatus}, httpOptions);
}

//Calls REST API with friendID as a parameter to send a friend request
sendFriendRequest(friendID: String) { 

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  
  return this.http.post(`${this.url}/friendRequest/${friendID}`, httpOptions).pipe(catchError(this.friendExistsError));
}

deleteFriend(friendID: String) {

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  return this.http.put(`${this.url}/friendRemoval/${friendID}`, httpOptions); 

}

//Displays error message when the user already has the selected user as a friend
friendExistsError(error) {

  let message = "Friend already exists!"

  window.alert(message);
  return throwError(message);
}

}
