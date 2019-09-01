import { Injectable } from '@angular/core';
import { User} from '../user';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { Observable } from 'rxjs'; 
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FriendService {

  url = "http://localhost:4000";
  
constructor(private http: HttpClient){

}

displayUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.url}/displayUsers`);
}

displayPendingFriendRequests(): Observable<User[]> { 

  return this.http.get<User[]>(`${this.url}/pendingRequests`);
}

//Calls REST API with friendID as parameter to update the friend status based on status parameter
updateFriendStatus(friendID: String, friendStatus: String): Observable<User[]> {

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  return this.http.put<User[]>(`${this.url}/friendStatusUpdate/${friendID}`, {friendStatus}, httpOptions);
}

sendFriendRequest(friendID: String): Observable<User[]> { 

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  
  return this.http.post<User[]>(`${this.url}/friendRequest/${friendID}`, httpOptions).pipe(catchError(this.friendExistsError));
}

friendExistsError(error) {

  let message = "Friend already exists!"

  window.alert(message);
  return throwError(message);
}

}
