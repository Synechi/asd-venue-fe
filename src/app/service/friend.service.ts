import { Injectable } from '@angular/core';

import { User} from '../user';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs'; 
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  uri = "http://localhost:4000";


  
constructor(private http: HttpClient){

}
displayUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.uri}/displayUsers`);
}


}
